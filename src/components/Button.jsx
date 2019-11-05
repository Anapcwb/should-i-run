import React from "react";
import "../styles/Button.css";

/*  
The button component takes three props: handleClick, color and text.
handleClick: a callback function to the  Map component
color: options are blue or red. 
text: the text of the button 
*/
function Button(props) {
  return (
    <div id="buttonDiv">
      <button onClick={props.handleClick} className={`btn ${props.color}`}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
