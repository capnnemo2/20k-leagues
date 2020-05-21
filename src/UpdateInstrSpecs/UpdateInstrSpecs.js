import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import "./UpdateInstrSpecs.css";

export default class UpdateInstrSpecs extends React.Component {
  static contextType = Context;

  state = {
    instructorSpecialties: [],
  };

  componentDidMount() {
    this.setState({
      instructorSpecialties: this.context.user.instructorSpecialties,
    });
  }

  renderList = () => {
    return this.context.specialties.map((spec) => (
      <div key={spec.id}>
        <label>
          <input
            type="checkbox"
            name={spec.name}
            id={spec.id}
            value={spec.name}
            checked={this.state.instructorSpecialties.includes(spec.id)}
            onChange={this.handleChange}
          />
          {spec.name}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    if (e.target.checked) {
      this.setState({
        instructorSpecialties: [
          ...this.state.instructorSpecialties,
          parseInt(e.target.getAttribute("id")),
        ],
      });
    } else {
      this.setState({
        instructorSpecialties: this.state.instructorSpecialties.filter(
          (spec) => spec !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  handleSubmit = () => {
    this.context.updateInstrSpecs(this.state.instructorSpecialties);
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
