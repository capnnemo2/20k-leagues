import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import dummyStore from "../dummyStore";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <section>
          <h2>User_name's Dive Log</h2>
          <p>
            Access your account profile:
            <Link to="/profile"> My Profile</Link>
          </p>
        </section>
        <section>
          <p>filter the dive list</p>
          <Link to="/add-dive">Add new dive</Link>{" "}
          <ul>
            <li>
              <ul>
                {/* need a function to reverse the order so that most recent dive is listed first */}
                <li>Dive #{dummyStore.dives[1].id}</li>
                <li>Date: {dummyStore.dives[1].date}</li>
                <li>Country: {dummyStore.dives[1].country}</li>
                <li>Site: {dummyStore.dives[1].diveSite}</li>
                <li>Rating: {dummyStore.dives[1].rating} seastars</li>
                <li>
                  <Link to={`/dive-details/${dummyStore.dives[1].id}`}>
                    Details
                  </Link>{" "}
                </li>
              </ul>
            </li>
            <br />
            <li>
              <ul>
                <li>Dive #{dummyStore.dives[0].id}</li>
                <li>Date: {dummyStore.dives[0].date}</li>
                <li>Country: {dummyStore.dives[0].country}</li>
                <li>Site: {dummyStore.dives[0].diveSite}</li>
                <li>Rating: {dummyStore.dives[0].rating} seastars</li>
                <li>
                  <Link to={`/dive-details/${dummyStore.dives[0].id}`}>
                    Details
                  </Link>{" "}
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          Your dives will be listed here, perhaps as cards, maybe just a plain
          list? They will only display some basic info here: dive #,
          location/country, date, site. If you click, it will take you to see
          more details.
          <Link to="/dive-details"> Example</Link>
        </section>

        <section>
          This section will just have simple statistics: total # of dives, total
          time under water deepest dive, longest dive, etc.
          <h2>Dive Stats</h2>
          <ul>
            <li>Total Dives: </li>
            <li>
              <ul>
                <li>Deepest Dive:</li>
                <li>Avg Dive Depth:</li>
                <li>Shallowest Dive:</li>
              </ul>
            </li>
            <br />
            <li>
              <ul>
                <li>Longest Dive:</li>
                <li>Avg Dive Time:</li>
                <li>Shortest Dive:</li>
                <li>Total Time Spent Underwater:</li>
              </ul>
            </li>
          </ul>
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
