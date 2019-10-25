import React, { Component } from "react";
import Button from "./Button";

class Message extends Component {
  render() {
    return (
      <div>
        {/*this line means "including" Button component, taking Button's props (text and handleClick) and passing msgButton property in handleClick*/}
        <Button text="X" handleClick={this.props.msgButton} />

        <h1>{this.props.msg}</h1>
      </div>
    );
  }
}

export default Message;
