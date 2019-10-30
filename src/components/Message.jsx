import React, { Component } from "react";
import CloseWindowButton from "./CloseWindowButton";

class Message extends Component {
  render() {
    return (
      <div className="styleMessageContainer">
        {/*this line means "including" Button component, taking Button's props (text and handleClick) and passing msgButton property in handleClick*/}
        {/*<Button text="X" handleClick={this.props.msgButton} />*/}

        <div className="styleMessage">
          <CloseWindowButton handleClick={this.props.msgButton} />
          <p>{this.props.msg}</p>
        </div>
      </div>
    );
  }
}

export default Message;
