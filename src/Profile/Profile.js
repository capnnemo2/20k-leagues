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
          <div className="profile-certs">
            <h3 className="section-title">Certifications</h3>
            <div className="btn-container">
              <Link to="/add-cert" className="btn-submit">
                Add
              </Link>
            </div>

            <ul className="certifications">
              {certs.map((cert) => (
                <li key={cert.id} className="profile-cert">
                  <ul>
                    <li>{cert.agency}</li>
                    <li>{cert.cert_level}</li>
                    <li>{cert.cert_date}</li>
                    <li>Diver # {cert.cert_num}</li>
                    <li>
                      <div className="btn-container">
                        <button
                          type="button"
                          onClick={(e) => this.handleDelete(cert.id)}
                          className="btn-cancel"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="profile-all-specs">
            <div className="profile-specs">
              <h3 className="section-title">Diver Specialties</h3>
              <div className="btn-container">
                <Link to="/update-specialties" className="btn-submit">
                  Update
                </Link>
              </div>

              <ul>
                {this.context.specialties
                  .filter((spec) => user.specialties.includes(spec.id))
                  .map((spec, i) => (
                    <li key={i}>{spec.spec_name}</li>
                  ))}
              </ul>
            </div>

            {userCerts.includes("Divemaster") ||
            userCerts.includes("Assistant Instructor") ||
            userCerts.includes("Open Water Scuba Instructor") ||
            userCerts.includes("Master Scuba Diver Trainer") ||
            userCerts.includes("IDC Staff Instructor") ||
            userCerts.includes("Master Scuba Instructor") ||
            userCerts.includes("Course Director") ? (
              <div className="profile-instr-specs">
                <h3 className="section-title">Instructor Specialties</h3>

                <div className="btn-container">
                  <Link to="/update-instr-specs" className="btn-submit">
                    Update
                  </Link>
                </div>
                <ul>
                  {user.instructor_specialties !== null
                    ? this.context.specialties
                        .filter((spec) =>
                          user.instructor_specialties.includes(spec.id)
                        )
                        .map((spec, i) => <li key={i}>{spec.spec_name}</li>)
                    : ""}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profile-wishlist">
            <h3 className="section-title">Animal Wishlist</h3>
            <div className="btn-container">
              <Link to="/edit-wishlist" className="btn-submit">
                Edit
              </Link>
            </div>
            <ul>
              {this.context.allAnimals
                .filter((a) => user.wishlist.includes(a.id))
                .map((a, i) => (
                  <li key={i}>{a.animal}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <h2>Loading Profile...</h2>
    );
  }
}
