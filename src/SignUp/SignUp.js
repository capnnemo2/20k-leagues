import React from "react";
import Context from "../Context";
import "./SignUp.css";

export default class SignUp extends React.Component {
  static contextType = Context;

  state = {
    first_name: "",
    email: "",
    password: "",
    agency: "",
    isOtherSelected: true,
    certLevel: "",
    certNum: "",
    certDate: "",
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

  updateWishlist(e) {
    this.setState({
      wishlist: [...this.state.wishlist, e.target.value],
    });
  }

  handleSignUpSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleSubmit = () => {
    let newUser = this.state;
    newUser = { ...newUser, id: this.context.users.length + 1 };
    this.setState({ error: null });
    this.context.createNewUser(newUser);
    this.props.history.push("/log");
  };

  render() {
    const { error } = this.state;
    return (
      <div className="SignUp">
        <header>
          <h2>Sign Up</h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="error">{error && <p>{error}</p>}</div>
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend>Account information</legend>
              <div>
                <label htmlFor="first_name">First Name: </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  aria-label="Enter your first name"
                  aria-required="true"
                  placeholder="Barbara"
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
                  placeholder="barb@email.com"
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
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Current Certification Level</legend>
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
              <fieldset onChange={(e) => this.updateCertLevel(e)}>
                <legend>Certification</legend>
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
              <fieldset>
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
            </fieldset>
            <fieldset
              className="sign-up-input"
              onChange={(e) => this.updateWishlist(e)}
            >
              <legend>Animal Wishlist</legend>
              Select the animals that you wish to see!
              <br />
              <label>
                <input type="checkbox" name="whale-shark" value="Whale Shark" />
                Whale Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="mola-mola" value="Mola Mola" />
                Mola Mola
              </label>
              <br />
              <label>
                <input type="checkbox" name="thresher" value="Thresher Shark" />
                Thresher Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="hammer" value="Hammerhead Shark" />
                Hammerhead Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="white" value="Great White Shark" />
                Great White Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="tiger" value="Tiger Shark" />
                Tiger Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="manatee" value="Manatee" />
                Manatee
              </label>
              <br />
              <label>
                <input type="checkbox" name="manta" value="Manta Ray" />
                Manta Ray
              </label>
              <br />
              <label>
                <input type="checkbox" name="seahorse" value="Seahorse" />
                Seahorse
              </label>
              <br />
              <label>
                <input type="checkbox" name="dragon" value="Dragon Moray" />
                Dragon Moray
              </label>
              <br />
              <label>
                <input type="checkbox" name="ribbon" value="Ribbon Eel" />
                Ribbon Eel
              </label>
              <br />
              <label>
                <input type="checkbox" name="mandarin" value="Mandarin Fish" />
                Mandarin Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="frog" value="Frog Fish" />
                Frog Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="mimic" value="Mimic Octopus" />
                Mimic Octopus
              </label>
              <br />
              <label>
                <input type="checkbox" name="pygmy" value="Pygmy Seahorse" />
                Pygmy Seahorse
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="seadragon"
                  value="Leafy Seadragon"
                />
                Leafy Seadragon
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="blue-ring"
                  value="Blue-Ringed Octopus"
                />
                Blue-Ringed Octopus
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="flamboyant"
                  value="Flamboyant Cuttlefish"
                />
                Flamboyant Cuttlefish
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="harlequin"
                  value="Harlequin Shrimp"
                />
                Harlequin Shrimp
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="orangutan"
                  value="Orangutan Crab"
                />
                Orangutan Crab
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="pipefish"
                  value="Ornate Ghost Pipefish"
                />
                Ornate Ghost Pipefish
              </label>
              <br />
              <label>
                <input type="checkbox" name="leaf" value="Leaf Scorpionfish" />
                Leaf Scorpionfish
              </label>
            </fieldset>
          </div>

          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
