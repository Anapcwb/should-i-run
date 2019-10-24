import React from 'react';

function CloseWindowButton(props) {
  return (
    <div>
      <i onClick={props.handleClick} className="fas fa-window-close"></i>
    </div>
  );
}

export default CloseWindowButton;
