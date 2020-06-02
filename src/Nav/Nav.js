import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./Nav.css";
import TokenService from "../services/token-service";

export default class Nav extends React.Component {
  static contextType = Context;

  handleLogOut = () => {
    this.context.setUser({});
    this.context.logOut();
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

        {/* this is great, but setting auth tokens hasn't been implemented yet... */}
        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
        {/* <Link to="/" onClick={() => this.handleLogOut()}>
          Logout
        </Link> */}
      </div>
    );
  }
}
