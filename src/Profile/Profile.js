import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <section>
          <h2>My Profile</h2>
          <p>My email: bob@gmail.com</p>
        </section>
        <section>
          <h2>Certifications</h2>
          <Link to="/add-cert">Add cert</Link>
          <ul className="certifications">
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Rescue Diver</li>
                <li>Date: May 2020</li>
                <li>Diver number: 98765</li>
              </ul>
            </li>
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Advanced Open Water Diver</li>
                <li>Date: June 2019</li>
                <li>Diver number: 45678</li>
              </ul>
            </li>
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Open Water Diver</li>
                <li>Date: May 2019</li>
                <li>Diver number: 12345</li>
              </ul>
            </li>
          </ul>
          <h3>Diver Specialities</h3>
          <Link to="/add-specialty">Add specialities</Link>
          <ul>
            <li>Boat Diver</li>
            <li>Emergency Oxygen Provider</li>
            <li>Peak Performance Buoyancy</li>
            <li>Navigation</li>
          </ul>
          {/* if we get fancy, only render this next section if the diver has a pro cert */}
          <h3>Instructor Specialities</h3>
          <Link to="/add-specialty">Add specialities</Link>
          <ul>
            <li>Boat Diver</li>
            <li>Emergency Oxygen Provider</li>
            <li>Peak Performance Buoyancy</li>
            <li>Navigation</li>
          </ul>
        </section>
        <section>
          <h2>Animal Wishlist</h2>
          <p>
            Here are some of the big deal creatures. Which ones would you like
            to see? Which ones have you already seen?
          </p>
          <p>
            Maybe animals not on your personal list are faded, shaded, dark.
            Animals on your list are normal colors. Animals on your list that
            you have seen have a sweet check mark (or something more fun).{" "}
          </p>

          <ul>
            <li>Whale Shark</li>
            <li>Mola Mola</li>
            <li>Thresher Shark</li>
            <li>Hammerhead Shark</li>
            <li>Great White Shark</li>
            <li>Tiger Shark</li>
            <li>Manatee</li>
            <li>Manta Ray</li>
            <li>Seahorse</li>
          </ul>
        </section>
      </div>
    );
  }
}
