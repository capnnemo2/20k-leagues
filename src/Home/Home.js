import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section>
          <p>A digital dive log for divers who love marine life.</p>

          <p>
            <Link className="btn-login" to="/login">
              Login
            </Link>{" "}
            <Link className="btn-signup" to="/sign-up">
              Sign up
            </Link>
          </p>
        </section>
        <section>
          <p>
            Not only can you log your dives, but you can keep track of your
            sightings from a custom wishlist of awesome sea creatures. You can
            even search the database of dives to see where your wishlist beasts
            have been spotted.
          </p>
          <p>Examples/screenshots coming soon!</p>
        </section>
      </div>
    );
  }
}
