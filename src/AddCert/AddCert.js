import React from "react";
import "./AddCert.css";
// import dummyStore from "../dummyStore";

export default class AddCert extends React.Component {
  state = {
    agency: "",
    isOtherSelected: true,
    certLevel: "",
    certNum: "",
    certDate: "",
    error: null,
  };

  // agency handlers
  updateAgency(e) {
    this.setState({
      agency: e.target.value,
    });
  }

  setOtherSelected = () => {
    this.setState({
      isOtherSelected: false,
    });
  };

  // cert handlers
  updateCertLevel(e) {
    this.setState({
      certLevel: e.target.value,
    });
  }

  updateCertNum(num) {
    this.setState({
      certNum: num,
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
      certDate: dateFormatted,
    });
  }

  // users[0] should select only the user who is logged in
  handleSubmit = () => {
    console.log("something happened");
    // let { agency, certLevel, certNum, certDate } = this.state;
    // let newCert = { agency, certLevel, certNum, certDate };
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="AddCert">
        <section>
          Do you need to be able to update your email address? This would affect
          your login. Do I have the ability to change that?
        </section>
        <section>There should be a section for specialities.</section>
        <section>Your animal wishlist should auto-update.</section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="input-fields">
            <h2>Add a certification</h2>
            <fieldset
              className="sign-up-input"
              onChange={(e) => {
                this.updateAgency(e);
              }}
            >
              <legend>Select an agency</legend>
              <label>
                <input type="radio" name="agency" value="PADI" required />
                PADI
              </label>
              <br />
              <label>
                <input type="radio" name="agency" value="SSI" required />
                SSI
              </label>
              <br />

              {/* is there a better way to write-in for other? */}
              {/* this doesn't work if you choose other, type something in, choose padi or ssi, then switch back to other.  */}
              <label htmlFor="other">
                <input
                  type="radio"
                  name="agency"
                  value={this.state.otherAgency}
                  onChange={this.setOtherSelected}
                  required
                />
                Other:{" "}
                <input
                  type="text"
                  name="other"
                  id="other"
                  disabled={this.state.isOtherSelected}
                />
              </label>
            </fieldset>
            <fieldset
              className="sign-up-input"
              onChange={(e) => {
                this.updateCertLevel(e);
              }}
            >
              <legend>Certification Level</legend>
              <label>
                <input type="radio" name="cert" value="Scuba Diver" required />
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
                <input type="radio" name="cert" value="Rescue Diver" required />
                Rescue Diver
              </label>
              <br />
              <label>
                <input type="radio" name="cert" value="Divemaster" required />
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
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>The Numbers</legend>
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
            </fieldset>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
