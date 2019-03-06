import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (     
    <div>
      Im some page 
      <Link to="/">Go Back Home</Link> 
    </div>
  );
}
