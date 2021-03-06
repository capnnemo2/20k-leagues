import React from "react";
import "./AddCert.css";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";

export default class AddCert extends React.Component {
  static contextType = Context;

  state = {
    agency: "",
    isOtherSelected: true,
    cert_level: "",
    cert_num: "",
    cert_date: "",
    error: null,
  };

  // agency handlers
  updateAgency(e) {
    this.setState({
      agency: e.target.value,
    });
  }

  setOtherSelected = (e) => {
    this.setState({
      isOtherSelected: false,
      agency: e.target.nextElementSibling.value,
    });
  };

  // cert handlers
  updateCertLevel(e) {
    this.setState({
      cert_level: e.target.value,
    });
  }

  updateCertNum(num) {
    this.setState({
      cert_num: num,
    });
  }

  updateCertDate(date) {
    let dateFormatted = date.split("-");
    if (dateFormatted[1] === "01") {
      dateFormatted = "January " + dateFormatted[0];
    }
    if (dateFormatted[1] === "02") {
      dateFormatted = "February " + dateFormatted[0];
    }
    if (dateFormatted[1] === "03") {
      dateFormatted = "March " + dateFormatted[0];
    }
    if (dateFormatted[1] === "04") {
      dateFormatted = "April " + dateFormatted[0];
    }
    if (dateFormatted[1] === "05") {
      dateFormatted = "May " + dateFormatted[0];
    }
    if (dateFormatted[1] === "06") {
      dateFormatted = "June " + dateFormatted[0];
    }
    if (dateFormatted[1] === "07") {
      dateFormatted = "July " + dateFormatted[0];
    }
    if (dateFormatted[1] === "08") {
      dateFormatted = "August " + dateFormatted[0];
    }
    if (dateFormatted[1] === "09") {
      dateFormatted = "September " + dateFormatted[0];
    }
    if (dateFormatted[1] === "10") {
      dateFormatted = "October " + dateFormatted[0];
    }
    if (dateFormatted[1] === "11") {
      dateFormatted = "November " + dateFormatted[0];
    }
    if (dateFormatted[1] === "12") {
      dateFormatted = "December " + dateFormatted[0];
    }
    this.setState({
      cert_date: dateFormatted,
    });
  }

  handleSubmit = () => {
    let { agency, cert_level, cert_num, cert_date } = this.state;
    let user_id = this.context.user.id;
    let newCert = { user_id, agency, cert_level, cert_num, cert_date };
    NonGetApiService.addCert(newCert)
      .then(this.context.addCert)
      .catch((err) => console.log(err));
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="AddCert">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-add-cert"
        >
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend className="section-title">Select an agency</legend>
              <div className="add-flex">
                <label>
                  <input
                    type="radio"
                    name="agency"
                    value="PADI"
                    required
                    onChange={(e) => {
                      this.updateAgency(e);
                    }}
                  />
                  PADI
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="agency"
                    value="SSI"
                    required
                    onChange={(e) => {
                      this.updateAgency(e);
                    }}
                  />
                  SSI
                </label>
                <br />
                <label htmlFor="other">
                  <input
                    type="radio"
                    name="agency"
                    value={this.state.otherAgency}
                    onChange={(e) => this.setOtherSelected(e)}
                    required
                  />
                  Other:{" "}
                  <input
                    type="text"
                    name="other"
                    id="other"
                    disabled={this.state.isOtherSelected}
                    onChange={(e) => {
                      this.updateAgency(e);
                    }}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset
              className="sign-up-input"
              onChange={(e) => {
                this.updateCertLevel(e);
              }}
            >
              <legend className="section-title">Certification Level</legend>
              <div className="signup-column-1">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Scuba Diver"
                      required
                    />
                    Scuba Diver
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Open Water Diver"
                      required
                    />
                    Open Water Diver
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Advanced Open Water Diver"
                      required
                    />
                    Advanced Open Water Diver
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Rescue Diver"
                      required
                    />
                    Rescue Diver
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Divemaster"
                      required
                    />
                    Divemaster
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Assistant Instructor"
                      required
                    />
                    Assistant Instructor
                  </label>
                  <br />
                </div>

                <div>
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Open Water Scuba Instructor"
                      required
                    />
                    Open Water Scuba Instructor
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Master Scuba Diver Trainer"
                      required
                    />
                    Master Scuba Diver Trainer
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="IDC Staff Instructor"
                      required
                    />
                    IDC Staff Instructor
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Master Scuba Instructor"
                      required
                    />
                    Master Scuba Instructor
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="cert"
                      value="Course Director"
                      required
                    />
                    Course Director
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend className="section-title">The Numbers</legend>
              <div className="signup-section">
                <label htmlFor="cert-num">Certification Number: </label>
                <input
                  type="text"
                  name="cert-num"
                  id="cert-num"
                  onChange={(e) => this.updateCertNum(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="cert-date">Date certified: </label>
                <input
                  type="month"
                  name="cert-date"
                  id="cert-date"
                  onChange={(e) => this.updateCertDate(e.target.value)}
                  required
                />
              </div>
            </fieldset>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-submit">
              Submit
            </button>{" "}
            <button
              type="button"
              onClick={this.handleClickCancel}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
