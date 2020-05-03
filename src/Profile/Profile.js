import React from "react";
import "./Profile.css";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <section>
          <h2>My Profile</h2>
        </section>
        <section>My email: bob@gmail.com</section>
        <section>
          <h2>Certifications</h2>
          <ul className="certifications">
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Rescue Diver</li>
                <li>Date: May 2020</li>
                <li>Diver number: 1887xcv99</li>
              </ul>
            </li>
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Advanced Open Water Diver</li>
                <li>Date: June 2020</li>
                <li>Diver number: 67547654xc</li>
              </ul>
            </li>
            <li>
              <ul className="cert">
                <li>Agency: PADI</li>
                <li>Open Water Diver</li>
                <li>Date: May 2020</li>
                <li>Diver number: 2345nmb435</li>
              </ul>
            </li>
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
            <li>
              <span>have seen, check </span>
              Whale Shark<span> Add to my list (+)</span>
            </li>
            <li>
              <span>have not seen, no check </span>
              Thresher Shark<span> Add to my list (+)</span>
            </li>
            <li>
              Mola Mola<span> Add to my list (+)</span>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}
