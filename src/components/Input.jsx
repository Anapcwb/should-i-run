import React, { Component } from 'react';
import Duration from './Duration';
import Expiration from './Expiration';
import CloseWindowButton from './CloseWindowButton';
import Button from './Button';
import '../styles/App.css';
import '../styles/Controls.css';

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
      <div className="controls">
        <CloseWindowButton handleClick={this.props.onClearSession} />
        {this.getTimer()}
        <label class="switch">
          <input type="checkbox" onClick={() => this.ToggleButton()} />
          <span class="slider round"></span>
        </label>
        <Button text="START" handleClick={() => this.props.onStartSession()} />
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
