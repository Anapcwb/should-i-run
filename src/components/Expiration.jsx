import React, { Component } from "react";
import { addTimeToUnix } from "../utilities/math";
import "../styles/App.css";
import "../styles/Input.css";

//collect the expire time from the user
class Expiration extends Component {
  constructor(props) {
    //we are using the constructor so we can set the expiration prior to the render method
    super(props);
    this.state = {
      expiration: this.getDefaultExpiration() //sets the expiration to a point in the future
    };
  }

  //handle onchange of the input time
  handleInput = event => {
    var parts = event.target.value.split(":"); //convert the string in time to hours and minutes parts
    var unixExp = addTimeToUnix(parts[0], parts[1]); //convert the parts in unix time

    this.setState({ expiration: event.target.value });
    this.props.setTime(unixExp);
  };

  //get some expiration time in the future
  getDefaultExpiration() {
    let date = new Date();
    date.setHours(date.getHours() + 1); //set the hours based on getting hour plus one
    let hours = date.getHours();
    let minutes = date.getMinutes();

    //format the hours in minutes to make sure the browser receives the correct format
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
