import React from 'react';
import '../styles/App.css';

function Button(props) {
  return (
    <div>
      <button onClick={props.handleClick} className="btn btn-primary">
        {props.text}
      </button>
    </div>
  );
}

export default Button;
