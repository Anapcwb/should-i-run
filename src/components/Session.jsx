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
    //let expiryTime = Date.now() + 1;
    this.intervalID = setInterval(() => {
      let currentTime = Date.now();
      if (currentTime <= expiryTime) {
        clearInterval(this.intervalID);
      }


      let millisecs = expiryTime - currentTime;
      let date = new Date(millisecs);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

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
