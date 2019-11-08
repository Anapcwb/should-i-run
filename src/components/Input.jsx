import React, { Component } from "react";
import Duration from "./Duration";
import Expiration from "./Expiration";
import CloseWindowButton from "./CloseWindowButton";
import Button from "./Button";
import "../styles/App.css";
import "../styles/Input.css";

//input is the parent component for the collection of expiration or duration from the user
class Input extends Component {
  state = {
    isDuration: true, //false means is expiry time
    unixExp: Date.now() + 3600000 //set a default expiry time
  };

  //callback function to updates expiry Unix time
  setTime = unixExp => {
    this.setState({ unixExp });
  };

  //this is function that toggles the duration and expiration
  toggleButton = () => {
    this.setState({ isDuration: !this.state.isDuration });
  };

  //conditionaly render duration or expiration based on the state
  renderInput() {
    if (this.state.isDuration) {
      return <Duration setTime={this.setTime} />;
    } else {
      return <Expiration setTime={this.setTime} />;
    }
  }

  render() {
    return (
      <div className="backgroundPosition">
        <div className="closeBtn">
          <CloseWindowButton handleClick={this.props.onClearSession} />
        </div>

        {this.renderInput()}

        <div className="container">
          <div>
            <label className="aroundToogleButton">Set Duration</label>
          </div>
          <div>
            <label className="switch">
              <input type="checkbox" onClick={() => this.toggleButton()} />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <label className="aroundToogleButton">Set Expiry</label>
          </div>
        </div>
        <Button
          className="btn btn-primary"
          text="START"
          color="blue"
          handleClick={() => this.props.onStartSession(this.state.unixExp)}
        />
      </div>
    );
  }
}

export default Input;
