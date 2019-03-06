const keys = require('./keys.js');

// express app set up
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// postgress client set up
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys. pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost Postgres connection'));

try {
  pgClient.query('CREATE TABLE IF NOT EXISTS' + 
                    ' values (number INT)');
} catch (err) {
  console.log('An error occurred', err);
}

// redis client set up
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// express route handlers

app.get('/', (req, res) =>  res.status(200).json({ message: 'Hello, world!' }));

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values'); 
  return res.status(200).json({
    message: 'Successfully retrieved values seen so far',
    values: values.rows
  });
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.status(200).json({
      message: 'Successfully retrieved current values',
      values
    });
  });
});

app.post('/values', async (req, res) => {
  const index = parseInt(req.body.index);
  if (index > 40) {
    return res.status(422).json({ message: 'Index chosen is too large' })
  }
  redisClient.hset('values', index, 'Nothing yet');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values ( number ) VALUES ( $1 )', [ index ]);
  res.status(201).json({ message: `Computing the value for ${index}` });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));




