import React, { Component } from "react";
//import Button from "./Button";
//import Session from "./Session";
import { addTimeToUnix } from "../utilities/math";
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
    //if the time is less than 5 mins past midnight

    //change time to 00:05 else

    var parts = event.target.value.split(":");

    var unixExp = addTimeToUnix(parts[0], parts[1]);

    this.setState({ expiration: event.target.value });
    this.props.setTime(unixExp);
  };

  future() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(hours, minutes);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

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

export default Expiration;
