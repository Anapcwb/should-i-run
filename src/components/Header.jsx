import React, { Component } from "react";
import appLogo from "../styles/appLogo.svg";
import "../styles/App.css";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header">
          <div className="headerTitle">
            <h1>Should I Run?</h1>
          </div>
          <div className="headerLogo">
            <img src={appLogo} className="stylingLogo" alt="logo" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
