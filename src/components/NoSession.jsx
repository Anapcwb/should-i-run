import React from 'react';
import Button from './Button';

function NoSession(props) {
  return (
    <div>
      <h1>Start new Session</h1>
      <Button handleClick={props.onSetTimer} text="New Session" />
    </div>
  );
}

export default NoSession;
