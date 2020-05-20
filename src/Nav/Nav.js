import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./Nav.css";

export default class Nav extends React.Component {
  static contextType = Context;

  handleLogOut = () => {
    console.log("log out ran");
    this.context.setUser({});
    this.context.logOut();
  };

  render() {
    return (
      <div className="nav-container">
        <Link to="/">20k Leagues</Link>
        <Link to="/animal-finder">Animal Finder</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/log">Log</Link>
        <Link to="/" onClick={() => this.handleLogOut()}>
          Logout
        </Link>
      </div>
    );
  }
}
