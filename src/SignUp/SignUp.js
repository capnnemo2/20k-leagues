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
    allChecked: false,
    list: [
      { id: 1, name: "Whale Shark", isChecked: false },
      { id: 2, name: "Mola Mola", isChecked: false },
      { id: 3, name: "Thresher Shark", isChecked: false },
      { id: 4, name: "Hammerhead Shark", isChecked: false },
      { id: 5, name: "Great White Shark", isChecked: false },
      { id: 6, name: "Tiger Shark", isChecked: false },
      { id: 7, name: "Manatee", isChecked: false },
      { id: 8, name: "Seahorse", isChecked: false },
      { id: 9, name: "Dragon Moray", isChecked: false },
      { id: 10, name: "Ribbon Eel", isChecked: false },
      { id: 11, name: "Mandarin Fish", isChecked: false },
      { id: 12, name: "Frog Fish", isChecked: false },
      { id: 13, name: "Mimic Octopus", isChecked: false },
      { id: 14, name: "Pygmy Seahorse", isChecked: false },
      { id: 15, name: "Leafy Seadragon", isChecked: false },
      { id: 16, name: "Blue-Ringed Octopus", isChecked: false },
      { id: 17, name: "Flamboyant Cuttlefish", isChecked: false },
      { id: 18, name: "Harlequin Shrimp", isChecked: false },
      { id: 19, name: "Orangutan Crab", isChecked: false },
      { id: 20, name: "Ornate Ghost Pipefish", isChecked: false },
      { id: 21, name: "Leaf Scorpionfish", isChecked: false },
    ],
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

  renderList = () => {
    return this.state.list.map((animal) => (
      <div key={animal.id}>
        <label>
          <input
            type="checkbox"
            name={animal.name}
            value={animal.name}
            checked={animal.isChecked}
            onChange={this.handleChange}
          />
          {animal.name}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    let animalName = e.target.name;
    let checked = e.target.checked;
    this.setState((prevState) => {
      let { list, allChecked } = prevState;
      if (animalName === "checkAll") {
        allChecked = checked;
        list = list.map((animal) => ({ ...animal, isChecked: checked }));
      } else {
        list = list.map((animal) =>
          animal.name === animalName
            ? { ...animal, isChecked: checked }
            : animal
        );
        allChecked = list.every((animal) => animal.isChecked);
      }
      return { list, allChecked };
    });
  };

  // should need to use this
  // updateWishlist(e) {
  //   this.setState({
  //     wishlist: [...this.state.wishlist, e.target.value],
  //   });
  // }

  createNewUserCert = (newUserCert) => {
    newUserCert.id = this.context.certs.length + 1;
    return newUserCert;
  };

  handleSubmit = () => {
    let wishlist = this.state.list.filter(
      (animal) => animal.isChecked === true
    );
    wishlist = wishlist.map((animal) => animal.name);

    let {
      first_name,
      email,
      password,
      agency,
      certLevel,
      certNum,
      certDate,
    } = this.state;

    let id = this.context.users.length + 1;
    let specialties = [];
    let instructorSpecialties = [];
    let wishlistFulfilled = [];
    let newUser = {
      id,
      first_name,
      email,
      password,
      wishlist,
      specialties,
      instructorSpecialties,
      wishlistFulfilled,
    };

    let user_id = id;
    let newUserCert = {
      user_id,
      agency,
      certLevel,
      certNum,
      certDate,
    };
    this.createNewUserCert(newUserCert);
    this.setState({ error: null });

    const emailCheck = this.context.users.find(
      (user) => user.email === newUser.email
    );
    if (emailCheck === undefined) {
      this.context.createNewUser(newUser);
      this.context.addCert(newUserCert);
      this.props.history.push("/login");
    } else {
      this.setState({ error: "An account already exists for that email" });
    }
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
            <fieldset className="sign-up-input">
              <legend>Select animals</legend>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="checkAll"
                    checked={this.state.allChecked}
                    onChange={this.handleChange}
                  />
                  Check All
                </label>
              </div>
              {this.renderList()}
            </fieldset>
          </div>
          <div className="error">{error && <p>{error}</p>}</div>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
