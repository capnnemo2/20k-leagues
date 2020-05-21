import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import "./UpdateSpecialties.css";

export default class UpdateSpecialties extends React.Component {
  static contextType = Context;

  state = {
    specialties: [],
  };

  componentDidMount() {
    this.setState({
      specialties: this.context.user.specialties,
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
            checked={this.state.specialties.includes(spec.id)}
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
        specialties: [
          ...this.state.specialties,
          parseInt(e.target.getAttribute("id")),
        ],
      });
    } else {
      this.setState({
        specialties: this.state.specialties.filter(
          (spec) => spec !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  handleSubmit = () => {
    this.context.updateSpecialties(this.state.specialties);
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
