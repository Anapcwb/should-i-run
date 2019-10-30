import React from "react";

function CloseWindowButton(props) {
  return (
    <div>
      <i onClick={props.handleClick} className="fas fa-times-circle"></i>
    </div>
  );
}

export default CloseWindowButton;
