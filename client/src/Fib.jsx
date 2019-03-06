import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {}, 
    index: ''
  };

  componentDidMount () {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues () {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data.values  || {} });
  }

  async fetchIndexes () {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data.values || [] });
  }

  handleSubmitIndex = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', { index: this.state.index });
    this.setState({index: ''})
  }

  renderSeenIndexes () {
    return this.state.seenIndexes.map((num) => num.number).join(', ');
  }

  renderValues () {
    const entries = Object.keys(this.state.values).map((key) => (
      <div key = { key }>
        For index { key }, the Fib value is {this.state.values[key]};
      </div>
    ));
    return entries;
  }

  handleUpdateIndex =  (event) => {
    const { target: { value:index } } = event;
    this.setState({ index });
  }

  render () {
    return (
      <div>
       <form onSubmit={ this.handleSubmitIndex }>
          <label>Input your index</label>
          <input
            name='index'
            value={ this.state.index }
            onChange={ this.handleUpdateIndex }
          />
          <button>Submit</button>
        </form>
        <div>
          <h3>Seen Indexes</h3>
          { this.renderSeenIndexes() }
        </div>
        <div>
          <h3>Calculated values:</h3>
          { this.renderValues() }
        </div>
      </div>
    );
  }
}

export default Fib;

