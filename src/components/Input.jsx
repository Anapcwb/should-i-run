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
    isDuration: true //false means is expiry time
  };

  ToggleButton = () => {
    this.setState({ isDuration: !this.state.isDuration });
  };

  render() {
    return (
      <div className="backgroundPosition">

          <CloseWindowButton handleClick={this.props.onClearSession} />
          {this.getTimer()}
       
        <div className="container">
          <div>
            <label className="aroundToogleButton">Set Duration</label>
          </div>
          <div>
            <label className="switch">
              <input type="checkbox" onClick={() => this.ToggleButton()} />
              <span class="slider round"></span>
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
          handleClick={() => this.props.onStartSession()}
        />
      </div>
    );
  }

  getTimer() {
    if (this.state.isDuration) {
      return <Duration onSetExpiry={this.props.onSetExpiry} />;
    } else {
      return <Expiration onSetExpiry={this.props.onSetExpiry} />;
    }
  }
}

export default Input;
