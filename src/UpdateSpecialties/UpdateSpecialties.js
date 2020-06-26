import React from "react";
import Context from "../Context";
import "./UpdateSpecialties.css";

export default class UpdateSpecialties extends React.Component {
  static contextType = Context;

  state = {
    specialties: [],
    usersSet: false,
  };

  componentDidMount() {
    let specialties = this.context.user.specialties
      ? this.context.user.specialties
      : this.context.specialties
      ? this.context.specialties
      : [];

    this.setState({
      specialties,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.context.user.specialties &&
      this.state.specialties.length !== this.context.user.specialties.length &&
      !this.state.usersSet
    ) {
      let specialties = this.context.user.specialties
        ? this.context.user.specialties
        : this.context.specialties
        ? this.context.specialties
        : [];

      this.setState({
        specialties,
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
              this.state.specialties.length &&
              this.state.specialties.includes(spec.id)
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
    return user.id && this.state.specialties ? (
      <div className="AddSpecialty">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-specs"
        >
          <div>
            <fieldset className="sign-up-input">
              <legend className="section-title">Specialties</legend>
              <div className="wishlist-columns">{this.renderList()}</div>
            </fieldset>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-submit">
              Submit
            </button>
            {"  "}
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
      <h2>Loading specialties...</h2>
    );
  }
}
