import React, { Component } from "react";

class Message extends Component {
  render() {
    return <h1>{this.props.msg}</h1>;
  }
}

export default Message;
