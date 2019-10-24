import React from 'react';
import Button from './Button';

class Session extends React.Component {
  state = {
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  };

  intervalID = 0;

  calcTimer() {
    let expiryTime = Date.now() + 1;
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
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
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
    this.calcTimer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { hours, minutes, seconds } = this.state.timer;
    return (
      <div>
        <h1>Session Active</h1>
        <h2>{`${hours}:${minutes}:${seconds}`}</h2>
        <Button handleClick={this.props.onClearSession} text="Dismiss" />
      </div>
    );
  }
}

export default Session;
