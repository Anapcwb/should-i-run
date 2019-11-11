import React, { Component } from "react";
import loadingLogo from "../styles/loadingLogo.svg";
import "../styles/App.css";

//this component displays the loading screen of the app
class Loading extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="loading">
        <div className="loadingTitle">
          <h1>Should I Run?</h1>
        </div>
        <div className="loadingLogo">
          <img src={loadingLogo} className="stylingLoadingLogo" alt="logo" />
        </div>
        {this.props.message && (
          <div className="loadingMessage">{this.props.message}</div>
        )}
        <div className="loadingCopyright">
          <p>&copy; Wild Devs London 2019</p>
        </div>
      </div>
    );
  }
}

export default Loading;
