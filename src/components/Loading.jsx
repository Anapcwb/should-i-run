import React, { Component } from "react";
import loadingLogo from "../styles/loadingLogo.svg";
import "../styles/App.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <h1>Should I Run?</h1>
        <div className="loadingLogo">
          <img src={loadingLogo} alt="logo" />
        </div>
        <p>&copy; Wild Devs London 2019</p>
      </div>
    );
  }
}

export default Loading;
