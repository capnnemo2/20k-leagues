import React from "react";
import "./AddSpecialty.css";
import Context from "../Context";

export default class AddSpecialty extends React.Component {
  static contextType = Context;

  state = {
    type: "",
    specialties: [
      { id: 1, name: "Altitude Diver", isChecked: false },
      { id: 2, name: "Boat Diver", isChecked: false },
      { id: 3, name: "Cavern Diver", isChecked: false },
      { id: 4, name: "Coral Reef Conservation", isChecked: false },
      { id: 5, name: "Deep Diver", isChecked: false },
      { id: 6, name: "Digital Underwater Photographer", isChecked: false },
      { id: 7, name: "Diver Propulsion Vehicle", isChecked: false },
      { id: 8, name: "Drift Diver", isChecked: false },
      { id: 9, name: "Dry Suit Diver", isChecked: false },
      { id: 10, name: "Emergency Oxygen Provider", isChecked: false },
      { id: 11, name: "Enriched Air Diver", isChecked: false },
      { id: 12, name: "Equipment Specialist", isChecked: false },
      { id: 13, name: "Fish Identification", isChecked: false },
      { id: 14, name: "Ice Diver", isChecked: false },
      { id: 15, name: "Night Diver", isChecked: false },
      { id: 16, name: "Peak Performance Buoyancy", isChecked: false },
      { id: 17, name: "Public Safety Diver", isChecked: false },
      { id: 18, name: "Search and Recovery Diver", isChecked: false },
      { id: 19, name: "Self-Reliant Diver", isChecked: false },
      { id: 20, name: "Sidemount Diver", isChecked: false },
      { id: 21, name: "Underwater Naturalist", isChecked: false },
      { id: 22, name: "Underwater Navigator", isChecked: false },
      { id: 23, name: "Underwater Videographer", isChecked: false },
      { id: 24, name: "Wreck Diver", isChecked: false },
    ],
  };

  renderList = () => {
    return this.state.specialties.map((spec) => (
      <div key={spec.id}>
        <label>
          <input
            type="checkbox"
            name={spec.name}
            value={spec.name}
            checked={spec.isChecked}
            onChange={this.handleChange}
          />
          {spec.name}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    let specName = e.target.name;
    let checked = e.target.checked;
    this.setState((prevState) => {
      let { specialties } = prevState;
      specialties = specialties.map((spec) =>
        spec.name === specName ? { ...spec, isChecked: checked } : spec
      );
      return { specialties };
    });
  };

  updateType = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleSubmit = () => {
    // get all specialties checked
    let specialties = this.state.specialties.filter(
      (spec) => spec.isChecked === true
    );
    // select only the name values of specialties
    specialties = specialties.map((spec) => spec.name);
    // grab any specialties user already has
    const userSpecs = this.context.user.specialties;
    const userInstructorSpecs = this.context.user.instructorSpecialties;
    // make sure submitting diver or instructor specs
    if (this.state.type === "diver") {
      // filter out any new specialties checked that the user already has
      for (let i = 0; i < userSpecs.length; i++) {
        const specList = specialties.filter((spec) => spec !== userSpecs[i]);
        specialties = specList;
      }
      // add specialties
      this.context.addSpecialties(specialties);
    } else if (this.state.type === "instructor") {
      // filter out any new specialties checked that the user already has
      for (let i = 0; i < userInstructorSpecs.length; i++) {
        const specList = specialties.filter(
          (spec) => spec !== userInstructorSpecs[i]
        );
        specialties = specList;
      }
      // add specialties
      this.context.addInstructorSpecialties(specialties);
    }
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="AddSpecialty">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend>Specialty Type</legend>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="diver"
                  onChange={(e) => this.updateType(e)}
                  required
                />
                Diver
              </label>
              <br />
              {/* maybe disable instructor if the diver hasn't entered a pro cert? */}
              <label>
                <input
                  type="radio"
                  name="type"
                  value="instructor"
                  onChange={(e) => this.updateType(e)}
                  required
                />
                Instructor
              </label>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Specialties</legend>
              {this.renderList()}
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
