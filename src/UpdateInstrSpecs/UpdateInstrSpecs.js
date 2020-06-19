import React from "react";
import Context from "../Context";
import "./UpdateInstrSpecs.css";

export default class UpdateInstrSpecs extends React.Component {
  static contextType = Context;

  state = {
    instructor_specialties: [],
    usersSet: false,
  };

  componentDidMount() {
    let instructor_specialties = this.context.user.instructor_specialties
      ? this.context.user.instructor_specialties
      : [];

    this.setState({
      instructor_specialties,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.context.user.instructor_specialties &&
      this.state.instructor_specialties.length !==
        this.context.user.instructor_specialties.length &&
      !this.state.usersSet
    ) {
      let instructor_specialties = this.context.user.instructor_specialties
        ? this.context.user.instructor_specialties
        : [];

      this.setState({
        instructor_specialties,
        usersSet: true,
      });
    }
  }

  renderList = () => {
    return this.context.specialties.map((spec) => (
      <div key={spec.id}>
        <label>
          <input
            type="checkbox"
            name={spec.spec_name}
            id={spec.id}
            value={spec.spec_name}
            checked={
              this.state.instructor_specialties &&
              this.state.instructor_specialties.includes(spec.id)
            }
            onChange={this.handleChange}
          />
          {spec.spec_name}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    if (e.target.checked) {
      this.setState({
        instructor_specialties: [
          ...this.state.instructor_specialties,
          parseInt(e.target.getAttribute("id")),
        ],
      });
    } else {
      this.setState({
        instructor_specialties: this.state.instructor_specialties.filter(
          (spec) => spec !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  handleSubmit = () => {
    this.context.updateInstrSpecs(this.state.instructor_specialties);
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.context;
    return user.id && this.state.instructor_specialties ? (
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
      <h2>Loading specialties...</h2>
    );
  }
}
