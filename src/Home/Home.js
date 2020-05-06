import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section>
          This is a digital dive log with an animal wishlist tracker.
        </section>

        <section>
          <p>
            <Link to="/login">Login</Link> to an existing account. Or
            <Link to="/sign-up"> create</Link> a new account. Check out the{" "}
            <Link to="/log">demo</Link>.
          </p>
        </section>

        <section>Scroll down to see a sample log.</section>

        <section></section>
      </div>
    );
  }
}
