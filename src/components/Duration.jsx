import React, { Component } from "react";
import { durationToExpiry } from "../utilities/math";
import "../styles/App.css";
import "../styles/Input.css";

//collects the duration from the user
class Duration extends Component {
  constructor(props) {
    //we are using the constructor so we can set the duration prior to the render method
    super(props);
    this.state = {
      duration: "01:00"
    };
  }

  //handle the input on change
  handleInput = event => {
    var duration = event.target.value;
    var parts = duration.split(":"); //spliting into minutes and hours

    //input should be not less than 10 minutes
    if (parts[0] === "00" && parts[1] < 10) {
      parts[1] = "10";
      duration = "00:10";
    }

    var unixExp = durationToExpiry(parts[0], parts[1]);

    this.setState({ duration });
    this.props.setTime(unixExp);
  };

  render() {
    return (
      <div className="timer">
        <input
          className="inputButtonBox"
          type="time"
          id="startTime"
          value={this.state.duration}
          onChange={this.handleInput}
        ></input>
      </div>
    );
  }
}

export default Duration;
