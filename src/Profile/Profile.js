import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";

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

    return user.hasOwnProperty("id") ? (
      <div className="Profile">
        <header>
          <h2>{user.first_name}'s Profile</h2>
        </header>

        <div className="profile-body">
          <fieldset className="profile-certs">
            <legend className="section-title">Certifications</legend>
            <Link to="/add-cert" className="btn-submit">
              Add cert
            </Link>
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
                        className="btn-cancel"
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
          <div className="profile-all-specs">
            <fieldset className="profile-specs">
              <legend className="section-title">Diver Specialties</legend>
              <Link to="/update-specialties" className="btn-submit">
                Update
              </Link>
              <ul>
                {this.context.specialties
                  .filter((spec) => user.specialties.includes(spec.id))
                  .map((spec, i) => (
                    <li key={i}>{spec.spec_name}</li>
                  ))}
              </ul>
            </fieldset>
            <fieldset className="profile-instr-specs">
              <legend className="section-title">Instructor Specialties</legend>
              {userCerts.includes("Divemaster") ||
              userCerts.includes("Assistant Instructor") ||
              userCerts.includes("Open Water Scuba Instructor") ||
              userCerts.includes("Master Scuba Diver Trainer") ||
              userCerts.includes("IDC Staff Instructor") ||
              userCerts.includes("Master Scuba Instructor") ||
              userCerts.includes("Course Director") ? (
                <Link to="/update-instr-specs" className="btn-submit">
                  Update
                </Link>
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
          </div>
          <fieldset className="profile-wishlist">
            <legend className="section-title">Animal Wishlist</legend>
            <ul>
              {this.context.allAnimals
                .filter((a) => user.wishlist.includes(a.id))
                .map((a, i) => (
                  <li key={i}>{a.animal}</li>
                ))}
            </ul>
            <Link to="/edit-wishlist" className="btn-submit">
              Edit Wishlist
            </Link>
          </fieldset>
        </div>
      </div>
    ) : (
      <h2>Loading Profile...</h2>
    );
  }
}
