import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <Link to="/">20k Leagues</Link>
      </div>
    );
  }
}
