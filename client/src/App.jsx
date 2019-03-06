import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </header>
          <div>
            <Route exact path="/" component={ Fib } />
            <Route exact path="/otherpage" component={ OtherPage } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
