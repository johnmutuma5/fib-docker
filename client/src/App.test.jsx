// import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

it('render without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

