import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import dummyStore from "../dummyStore";
import "./UpdateSpecialties.css";

export default class UpdateSpecialties extends React.Component {
  static contextType = Context;

  state = {
    specialties: [],
  };

  setSpecsState() {
    const specialties = dummyStore.specialties;
    this.setState({
      specialties: specialties,
    });
  }

  async componentDidMount() {
    await this.setSpecsState();

    let prefillList = this.context.user.specialties;
    this.setState((prevState) => {
      let { specialties } = prevState;
      specialties = specialties.map((spec) =>
        prefillList.includes(spec.name) ? { ...spec, isChecked: true } : spec
      );
      return { specialties };
    });
  }

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
  handleSubmit = () => {
    // get all specialties checked
    let specialties = this.state.specialties.filter(
      (spec) => spec.isChecked === true
    );
    // select only the name values of specialties
    specialties = specialties.map((spec) => spec.name);
    this.context.updateSpecialties(specialties);
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
    ) : (
      <Redirect to="/login" />
    );
  }
}
