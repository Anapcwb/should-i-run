import React, { Component } from "react";
import CloseWindowButton from "./CloseWindowButton";
import "../styles/Message.css";

//this component displays messages
class Message extends Component {
  render() {
    return (
      <div className="styleMessageContainer">
        {/*this line means "including" Button component, taking Button's props (text and handleClick) and passing msgButton property in handleClick*/}

        <div className="styleMessage">
          <CloseWindowButton handleClick={this.props.msgButton} />
          <p>{this.props.msg}</p>
        </div>
      </div>
    );
  }
}

export default Message;
