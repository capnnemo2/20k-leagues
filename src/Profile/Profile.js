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
    const userCerts = certs.map((cert) => cert.certLevel);

    console.log("user wishlist: ", user.wishlist);

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
          <Link to="/update-specialties">Update</Link>
          <ul>
            {this.context.specialties
              .filter((spec) => user.specialties.includes(spec.id))
              .map((spec, i) => (
                <li key={i}>{spec.name}</li>
              ))}
            {/* {user.specialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))} */}
          </ul>
        </fieldset>
        <fieldset>
          {/* if we get fancy, only render this next section if the diver has a pro cert */}
          <legend>Instructor Specialties</legend>
          {userCerts.includes("Divemaster") ||
          userCerts.includes("Assistant Instructor") ||
          userCerts.includes("Open Water Scuba Instructor") ||
          userCerts.includes("Master Scuba Diver Trainer") ||
          userCerts.includes("IDC Staff Instructor") ||
          userCerts.includes("Master Scuba Instructor") ||
          userCerts.includes("Course Director") ? (
            <Link to="/update-instr-specs">Update</Link>
          ) : (
            ""
          )}

          <ul>
            {user.instructorSpecialties.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Animal Wishlist</legend>
          <ul>
            {this.context.allAnimals
              .filter((a) => user.wishlist.includes(a.id))
              .map((a, i) => (
                <li key={i}>{a.animal}</li>
              ))}
            {/* {user.wishlist.map((animal) => (
              <li key={animal}>{animal}</li>
            ))} */}
          </ul>
          <Link to="/edit-wishlist">Edit Wishlist</Link>
        </fieldset>
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
