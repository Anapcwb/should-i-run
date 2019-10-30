import React, { Component } from "react";
//import Button from "./Button";
import "../styles/App.css";
import "../styles/Ana.css";

class Duration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: "01:00"
    };
  }

  handleInput = event => {
    this.setState({ expiration: event.target.value });
    this.props.onSetExpiry(event.target.value);
  };

  state = {};

  render() {
    return (
      <div className="timer">
        <input
          className="inputButtonBox"
          type="time"
          id="startTime"
          value={this.state.expiration}
          onChange={this.handleInput}
        ></input>
      </div>
    );
  }
}

export default Duration;
