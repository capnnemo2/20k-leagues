import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section>
          <p>This is a digital dive log.</p>
        </section>

        <section>
          <p>
            Have an account?<Link to="/login"> Login</Link>
          </p>
          <p>
            Don't have an account yet?
            <Link to="/sign-up"> Sign up</Link>
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

        <section></section>
      </div>
    );
  }
}
