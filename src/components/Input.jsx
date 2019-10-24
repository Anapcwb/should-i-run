import React from 'react';
import Button from './Button';
import CloseWindowButton from './CloseWindowButton';

function Input(props) {
  return (
    <div>
      <CloseWindowButton handleClick={props.onClearSession} />
      <h1>Enter session data</h1>

      <Button text="Start" handleClick={() => props.onStartSession()} />
    </div>
  );
}

export default Input;
