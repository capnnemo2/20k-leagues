import React from "react";
import "./Profile.css";
import { Link, Redirect } from "react-router-dom";
import Context from "../Context";

export default class Profile extends React.Component {
  static contextType = Context;
  render() {
    const user = this.context.user;
    const userId = user.id;
    const certs = this.context.certs.filter(
      (c) => Number(c.user_id) === Number(userId)
    );

    return user && this.context.loggedIn === true ? (
      <div className="Profile">
        <section>
          <h2>{user.first_name}'s Profile</h2>
          <p>My email: {user.email}</p>
        </section>
        <fieldset>
          <legend>Certifications</legend>
          <Link to="/add-cert">Add cert</Link>
          <ul className="certifications">
            {certs.map((cert) => (
              <li key={cert.certNum}>
                <ul>
                  <li>Agency: {cert.agency}</li>
                  <li>{cert.certLevel}</li>
                  <li>{cert.certDate}</li>
                  <li>Diver number: {cert.certNum}</li>
                </ul>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Diver Specialties</legend>
          <Link to="/add-specialty">Add specialties</Link>
          <ul>
            {user.specialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          {/* if we get fancy, only render this next section if the diver has a pro cert */}
          <legend>Instructor Specialties</legend>
          <Link to="/add-specialty">Add specialties</Link>
          <ul>
            {user.instructorSpecialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Animal Wishlist</legend>
          <p>
            Here are some of the big deal creatures. Which ones would you like
            to see? Which ones have you already seen?
          </p>
          <p>
            You can customize which animals appear on your wishlist in your log.
            Here is where you select which animals appear there. Maybe animals
            not on your personal list are faded, shaded, dark. Animals on your
            list are normal colors. Animals on your list that you have seen have
            a sweet check mark (or something more fun).{" "}
          </p>

          <ul>
            {user.wishlist.map((animal) => (
              <li key={animal}>{animal}</li>
            ))}
          </ul>
          <Link to="/edit-wishlist">Edit Wishlist</Link>
        </fieldset>
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
