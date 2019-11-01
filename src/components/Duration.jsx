import React, { Component } from "react";
//import Button from "./Button";
import "../styles/App.css";
import "../styles/Ana.css";
import { parkingDuration } from "../utilities/math";

class Duration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: "01:00"
    };
  }

  handleInput = event => {
    var evt = event.target.value;

    var parts = evt.split(":");

    if (parts[0] === "00" && parts[1] < 10) {
      parts[1] = "10";
      evt = "00:10";
    }

    var unixExp = parkingDuration(parts[0], parts[1]);

    this.setState({ expiration: evt });
    this.props.setTime(unixExp);
  };

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
