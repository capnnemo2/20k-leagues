import React from "react";
import "./Profile.css";
import { Link, Redirect } from "react-router-dom";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";
// import TokenService from "../services/token-service";

export default class Profile extends React.Component {
  static contextType = Context;

  handleDelete = (certId) => {
    NonGetApiService.deleteCert(certId)
      .then(this.context.deleteCert(certId))
      .catch((err) => console.log(err));
  };

  render() {
    const user = this.context.user;
    const userId = user.id;
    const certs = this.context.certs.filter(
      (c) => Number(c.user_id) === Number(userId)
    );
    const userCerts = certs.map((cert) => cert.cert_level);

    return user ? (
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
                  <li>{cert.cert_level}</li>
                  <li>{cert.cert_date}</li>
                  <li>Diver number: {cert.cert_num}</li>
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
                <li key={i}>{spec.spec_name}</li>
              ))}
          </ul>
        </fieldset>
        <fieldset>
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
            {user.instructor_specialties !== null
              ? this.context.specialties
                  .filter((spec) =>
                    user.instructor_specialties.includes(spec.id)
                  )
                  .map((spec, i) => <li key={i}>{spec.spec_name}</li>)
              : ""}
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
          </ul>
          <Link to="/edit-wishlist">Edit Wishlist</Link>
        </fieldset>
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
