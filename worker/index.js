const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,//if a connection is stopped retry once every 1000s
})

const sub = redisClient.duplicate();

function fib(index) {
  /**
   * we could include memoization but let's leave it as slow to need worker
   */
  if (index < 2) { return 1; }
  return fib(index - 2) + fib(index - 1);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
})
sub.subscribe('insert');
