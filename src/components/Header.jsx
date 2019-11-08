import React, { Component } from "react";
import headerLogo from "../styles/headerLogo.svg";
import "../styles/App.css";

//this component is a header
class Header extends Component {
  render() {
    return (
      <header>
        <div className="header">
          <div className="headerTitle">
            <h1>Should I Run?</h1>
          </div>
          <div className="headerLogo">
            <img src={headerLogo} className="stylingHeaderLogo" alt="logo" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
