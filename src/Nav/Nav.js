import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./Nav.css";
import TokenService from "../services/token-service";

export default class Nav extends React.Component {
  static contextType = Context;

  handleLogOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    this.context.setUser({});
  };

  renderLogout = () => {
    return (
      <Link to="/" onClick={() => this.handleLogOut()}>
        Logout
      </Link>
    );
  };

  renderLogin = () => {
    return <Link to="/login">Login</Link>;
  };

  render() {
    return (
      <div id="ham-nav">
        <label htmlFor="hamburger">&#9776;</label>
        <input type="checkbox" id="hamburger" />

        <div id="ham-items">
          <Link to="/">20k Leagues</Link>
          <Link to="/animal-finder">Animal Finder</Link>
          <Link to="/log">Log</Link>
          <Link to="/profile">Profile</Link>
          {TokenService.hasAuthToken()
            ? this.renderLogout()
            : this.renderLogin()}
        </div>
      </div>
    );
  }
}
