import React, { Component } from "react";
import Button from "./Button";
import "../styles/App.css";

class Duration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: "00:00"
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
        <label htmlFor="startTime">Set Duration: </label>
        <input
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
