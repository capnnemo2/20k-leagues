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

        <section>
          This app is also maybe somehow an animal finder. Or at least a way to
          keep track of your animal wishlist.
        </section>

        <section>Scroll down here to see a sample dashboard.</section>
      </div>
    );
  }
}
