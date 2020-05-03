import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <section>
          You should be able to access your account profile:
          <Link to="/profile"> My Profile</Link>
        </section>
        <section>Maybe you will be able to filter the dives listed?</section>

        <section>
          Your dives will be listed here, perhaps as cards, maybe just a plain
          list? They will only display some basic info here: dive #,
          location/country, date, site. If you click, it will take you to see
          more details.
          <Link to="/dive-details"> Example</Link>
        </section>

        <section>
          This section will just have simple statistics: total # of dives,
          deepest dive, longest dive, etc.
        </section>

        <section>
          Thinking about an animal wishlist that you can select when you
          register a new account. I guess there should be a way to edit your
          animal wishlist afterward too.
        </section>
      </div>
    );
  }
}
