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
      <Link className="navlink" to="/" onClick={() => this.handleLogOut()}>
        Logout
      </Link>
    );
  };

  renderLogin = () => {
    return (
      <Link className="navlink" to="/login">
        Login
      </Link>
    );
  };

  render() {
    return (
      <div className="nav-container">
        <Link className="navlink" to="/">
          20k Leagues
        </Link>
        <Link className="navlink" to="/animal-finder">
          Animal Finder
        </Link>
        <Link className="navlink" to="/log">
          Log
        </Link>
        <Link className="navlink" to="/profile">
          Profile
        </Link>
        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
      </div>
    );
  }
}
