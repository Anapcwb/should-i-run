import React from "react";
import Button from "./Button";
import "../styles/Controls.css";

class Session extends React.Component {
  // initialise component state
  state = {
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  };

  // initialize the intervalID (this is used to clear the interval)
  intervalID = 0;

  // calculate and format the countdown timer, and set as state
  calcTimer(expiryTime) {
    let remainingTime, currentTime, hours, minutes, seconds;
    this.intervalID = setInterval(() => {
      currentTime = Date.now();
      // get the time remaining in milliseconds
      remainingTime = expiryTime - currentTime;

      // stop the timer when time runs out
      if (expiryTime <= currentTime) {
        clearInterval(this.intervalID);
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

  componentDidMount() {
    this.calcTimer(this.props.expiryTime);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // TODO: dispatch messages when conditions are met

  render() {
    const { hours, minutes, seconds } = this.state.timer;
    return (
      <div className="controls">
        <div className="timer">{`${hours}:${minutes}:${seconds}`}</div>
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
