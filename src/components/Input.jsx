import React, { Component } from "react";
import Duration from "./Duration";
import Expiration from "./Expiration";
import CloseWindowButton from "./CloseWindowButton";
import Button from "./Button";
import "../styles/App.css";
import "../styles/Ana.css";

class Input extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      textDisplay: false
    };
  }*/

  state = {
    isDuration: true, //false means is expiry time
    unixExp: Date.now() + 3600000
  };

  setTime = unixExp => {
    this.setState({ unixExp });
    console.log(unixExp); //
  };

  ToggleButton = () => {
    this.setState({ isDuration: !this.state.isDuration });
  };

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
              <input type="checkbox" onClick={() => this.ToggleButton()} />
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

  renderInput() {
    if (this.state.isDuration) {
      return <Duration setTime={this.setTime} />;
    } else {
      return <Expiration setTime={this.setTime} />;
    }
  }
}

export default Input;
