import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default class Nav extends React.Component {
  render() {
    return (
      <div className="nav-container">
        <Link to="/">20k Leagues</Link>
        <Link to="/dashboard">Log</Link>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}
