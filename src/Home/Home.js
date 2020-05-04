import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section>
          <p>This is the home/landing page.</p>
          <p>
            <Link to="/login">Login</Link> to an existing account. Or
            <Link to="/sign-up"> create</Link> a new account.
          </p>
        </section>

        <section>This app is a dive log.</section>

        <section>This app is also maybe somehow an animal finder.</section>

        <section>
          Although the animals you can find might be severely limited.
        </section>
      </div>
    );
  }
}
