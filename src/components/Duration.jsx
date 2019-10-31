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
    console.log(event.target.value);
    var parts = event.target.value.split(":");
    console.log(parts[0]);

    var unixDur = parkingDuration(parts[0], parts[1]);
    console.log(unixDur);

    var unixExp = Date.now() + unixDur;

    this.setState({ expiration: event.target.value });
    this.props.setTime(unixExp);
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
