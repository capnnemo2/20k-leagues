import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./Nav.css";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";

export default class Nav extends React.Component {
  static contextType = Context;

  handleLogOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.context.setUser({});

    // don't think I need this anymore
    // this.context.logOut();
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
      <div className="nav-container">
        <Link to="/">20k Leagues</Link>
        <Link to="/animal-finder">Animal Finder</Link>
        <Link to="/log">Log</Link>
        <Link to="/profile">Profile</Link>
        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
      </div>
    );
  }
}
