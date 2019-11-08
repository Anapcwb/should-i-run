import React from "react";
import closeButton from "../styles/Icon-material-cancel.svg";

// this is the X symbol button
// it takes one callback function called handleClick
function CloseWindowButton(props) {
  return (
    <div className="close-button">
      <img src={closeButton} alt="close button" onClick={props.handleClick} />
    </div>
  );
}

export default CloseWindowButton;
