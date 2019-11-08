import React from "react";
import Button from "./Button";
import {
  getEarlyNotificationUnix,
  geoNotificationStatus
} from "../utilities/math";
import { MESSAGES, TIMEEXPIRED, TIMEXPIRY } from "../utilities/config";
import "../styles/Controls.css";

// Session formats and displays the countdown timer
class Session extends React.Component {
  // initialise component state
  state = {
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    messageSeverity: 0
  };

  // initialize the intervalID (this is used to clear the interval)
  intervalID = 0;

  // calculate and format the countdown timer, and set as state
  formatAndDisplayTimer(expiryTime) {
    let remainingTime, currentTime, hours, minutes, seconds;
    // TODO: refactor intervalID declaration
    this.intervalID = setInterval(() => {
      this.dispatchMessages();
      currentTime = Date.now(); // get the current time
      // get the time remaining in milliseconds
      remainingTime = expiryTime - currentTime;

      // stop the timer when time runs out
      if (expiryTime <= currentTime) {
        clearInterval(this.intervalID);
        // format the timer to display 00:00:00
        this.setState({
          time: {
            hours: "00",
            minutes: "00",
            seconds: "00"
          }
        });
        return;
      }

      // get the hours, minutes and seconds from milliseconds
      seconds = Math.floor((remainingTime / 1000) % 60);
      minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

      // format the hours, minutes and seconds for display
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      hours = hours < 10 ? "0" + hours : hours;

      // set the hours, mins and secs in component state
      this.setState({
        timer: {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      });
    }, 200);
  }

  dispatchMessages = () => {
    // check which message should be dispatched
    // returns a severity of 0, 1, 2 or 3
    const result = geoNotificationStatus(
      this.props.expiryTime,
      this.props.currentLocation,
      this.props.storedLocation
    );

    // when the result returned is greater than the severity stored
    // in state, update the the state to the result and send the
    // corresponding message
    if (result > this.state.messageSeverity) {
      // TODO: clear messages?
      this.setState({ messageSeverity: result });
      this.props.addMessage(Date.now(), MESSAGES[result - 1]);
    }
  };

  // when the session starts
  componentDidMount() {
    // start the interval
    // TODO: refactor interval
    this.formatAndDisplayTimer(this.props.expiryTime);

    // queue messages to the message array
    this.props.addMessage(this.props.expiryTime, TIMEEXPIRED);

    this.props.addMessage(
      getEarlyNotificationUnix(this.props.expiryTime),
      TIMEXPIRY
    );
  }

  // when session is cancelled
  componentWillUnmount() {
    // stop the timer
    clearInterval(this.intervalID);

    // clear messages
    this.props.removeMessages();
  }

  render() {
    const { hours, minutes, seconds } = this.state.timer;
    return (
      <div className="controls">
        {/* render the timer */}
        <div className="clock">{`${hours}:${minutes}:${seconds}`}</div>
        <Button
          handleClick={this.props.onClearSession}
          text="DISMISS"
          color="red"
        />
      </div>
    );
  }
}

export default Session;
