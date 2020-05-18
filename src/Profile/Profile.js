import React from "react";
import "./Profile.css";
import { Link, Redirect } from "react-router-dom";
import Context from "../Context";

export default class Profile extends React.Component {
  static contextType = Context;

  handleDelete = (certId) => {
    this.context.deleteCert(certId);
  };

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
              <li key={cert.id}>
                <ul>
                  <li>Agency: {cert.agency}</li>
                  <li>{cert.certLevel}</li>
                  <li>{cert.certDate}</li>
                  <li>Diver number: {cert.certNum}</li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => this.handleDelete(cert.id)}
                    >
                      Delete Cert
                    </button>{" "}
                  </li>
                </ul>
                <br />
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Diver Specialties</legend>
          <Link to="/add-specialty">Update Specialties</Link>
          <ul>
            {user.specialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          {/* if we get fancy, only render this next section if the diver has a pro cert */}
          <legend>Instructor Specialties</legend>
          <Link to="/add-specialty">Update Specialties</Link>
          <ul>
            {user.instructorSpecialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Animal Wishlist</legend>
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
