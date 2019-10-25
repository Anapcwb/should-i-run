import React, { Component } from "react";
//import Button from "./Button";
//import Session from "./Session";
import { parkingDuration } from "../utilities/math";
import "../styles/App.css";
import "../styles/Ana.css";

class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: this.future()
    };
  }

  handleInput = event => {
    console.log(event.target.value);
    var parts = event.target.value.split(":");
    console.log(parts[0]);

    var unixExp = parkingDuration(parts[0], parts[1]);
    console.log(unixExp);

    this.setState({ expiration: event.target.value });
    this.props.onSetExpiry(unixExp);
  };

  future() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(hours, minutes);
    return hours + ":" + minutes;
  }

  render() {
    return (
      <div className="timer">
        <label htmlFor="startTime">Set Expiry: </label>
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

export default Expiration;
