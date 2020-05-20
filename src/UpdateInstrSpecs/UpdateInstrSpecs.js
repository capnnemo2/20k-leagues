import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import dummyStore from "../dummyStore";
import "./UpdateInstrSpecs.css";

export default class UpdateInstrSpecs extends React.Component {
  static contextType = Context;

  state = {
    instructorSpecialties: [],
  };

  setSpecsState() {
    const specialties = dummyStore.specialties;
    this.setState({
      instructorSpecialties: specialties,
    });
  }

  async componentDidMount() {
    await this.setSpecsState();

    let prefillList = this.context.user.instructorSpecialties;

    this.setState((prevState) => {
      let { instructorSpecialties } = prevState;
      instructorSpecialties = instructorSpecialties.map((spec) =>
        prefillList.includes(spec.name) ? { ...spec, isChecked: true } : spec
      );
      return { instructorSpecialties };
    });
  }

  renderList = () => {
    return this.state.instructorSpecialties.map((spec) => (
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
      let { instructorSpecialties } = prevState;
      instructorSpecialties = instructorSpecialties.map((spec) =>
        spec.name === specName ? { ...spec, isChecked: checked } : spec
      );
      return { instructorSpecialties };
    });
  };

  handleSubmit = () => {
    // get all specialties checked
    let instructorSpecialties = this.state.instructorSpecialties.filter(
      (spec) => spec.isChecked === true
    );
    // select only the name values of specialties
    instructorSpecialties = instructorSpecialties.map((spec) => spec.name);
    this.context.updateInstrSpecs(instructorSpecialties);
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.context;
    return user.id ? (
      <div className="AddSpecialty">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend>Instructor Specialties</legend>
              {this.renderList()}
            </fieldset>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}
