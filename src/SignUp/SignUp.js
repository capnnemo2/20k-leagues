import React from "react";
import Context from "../Context";
import "./SignUp.css";
import NonGetApiService from "../services/non-get-api-service";

export default class SignUp extends React.Component {
  static contextType = Context;

  state = {
    initialListSet: false,
    allChecked: false,
    first_name: "",
    email: "",
    password: "",
    agency: "",
    isOtherSelected: true,
    cert_level: "",
    cert_num: "",
    cert_date: "",
    wishlist: [],
    error: null,
  };

  updateFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

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

  renderList = () => {
    return this.context.allAnimals.map((animal) => (
      <div key={animal.id} className="col">
        <label>
          <input
            type="checkbox"
            name={animal.animal}
            id={animal.id}
            value={animal.animal}
            checked={this.state.wishlist.includes(animal.id)}
            onChange={this.handleChange}
          />
          {"  "}
          {animal.animal}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    if (e.target.getAttribute("name") === "checkAll") {
      this.setState({
        wishlist: e.target.checked
          ? this.context.allAnimals.map((a) => a.id)
          : [],
      });
    } else if (e.target.checked) {
      this.setState({
        wishlist: [
          ...this.state.wishlist,
          parseInt(e.target.getAttribute("id")),
        ],
      });
    } else {
      this.setState({
        wishlist: this.state.wishlist.filter(
          (a) => a !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  handleSubmit = () => {
    let {
      first_name,
      email,
      password,
      agency,
      cert_level,
      cert_num,
      cert_date,
      wishlist,
    } = this.state;

    let newUser = {
      first_name,
      email,
      password,
      wishlist,
    };

    let newUserCert = {
      agency,
      cert_level,
      cert_num,
      cert_date,
    };

    NonGetApiService.addUser(newUser)
      .then((data) => {
        newUserCert.user_id = data.id;
        NonGetApiService.addCert(newUserCert).then(this.context.addCert);
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.error.message });
      });
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { error } = this.state;
    const allAnimals = this.context.allAnimals;
    return allAnimals ? (
      <div className="SignUp">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-signup"
        >
          <div className="error">{error && <p>{error}</p>}</div>
          <fieldset className="input-fields">
            <legend>User Information</legend>
            <div className="sign-up-input signup-section">
              <div>
                <label htmlFor="first_name">First Name: </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  aria-label="Enter your first name"
                  aria-required="true"
                  onChange={(e) => this.updateFirstName(e)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  aria-label="Enter your email address"
                  aria-required="true"
                  onChange={(e) => this.updateEmail(e)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-label="Create your password"
                  aria-required="true"
                  onChange={(e) => this.updatePassword(e)}
                  required
                />
              </div>
            </div>
            <div className="pass-info">
              <p className="small">
                Password must be at least 8 characters long and include one
                uppercase letter, one special character, and one number
              </p>
            </div>
          </fieldset>
          <fieldset className="input-fields">
            <legend>Current Certification Level</legend>
            <div className="sign-up-input">
              <fieldset onChange={(e) => this.updateAgency(e)}>
                <legend>Agency</legend>
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
              <fieldset onChange={(e) => this.updateCertLevel(e)}>
                <legend>Certification</legend>
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
              <fieldset>
                <legend>The Numbers</legend>
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
          </fieldset>
          <fieldset className="input-fields">
            <legend>Select Wishlist Animals</legend>
            <div className="sign-up-input">
              <p>
                Your dive log will allow you to keep track of some of the
                amazing sea creatures you encounter. We've collected a list of
                some of the common 'wishlist' animals that people often want to
                see. Choose the ones that interest you!
              </p>
              <div className="wishlist-columns">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="checkAll"
                      checked={
                        this.state.wishlist.length ===
                        this.context.allAnimals.length
                      }
                      onChange={this.handleChange}
                    />
                    {"  "}
                    Check All
                  </label>
                </div>
                {this.renderList()}
              </div>
            </div>
          </fieldset>
          <div className="error">{error && <p>{error}</p>}</div>
          <div className="btn-container">
            <p>This project is being updated, thank you for your patience!</p>
            <button type="submit" className="btn-submit" disabled="true">
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
    ) : (
      "Loading..."
    );
  }
}
