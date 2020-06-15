import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  static contextType = Context;

  state = {
    wishlist: [],
  };

  renderList = () => {
    return this.context.allAnimals.map((animal) => (
      <div key={animal.id}>
        <label>
          <input
            type="checkbox"
            name={animal.animal}
            id={animal.id}
            value={animal.animal}
            checked={this.state.wishlist.includes(animal.id)}
            onChange={this.handleChange}
          />
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

  componentDidMount() {
    this.setState({
      wishlist: this.context.user.wishlist,
    });
  }

  handleSubmit = () => {
    const { wishlist } = this.state;
    this.context.updateWishlist(wishlist);
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.context;
    return user.id ? (
      <div className="EditWishlist">
        <section>
          You initially choose your wishlist when you sign up, but here you can
          re-select which animals appear on your wishlist.
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="input-fields">
            <h2>Animal Wishlist</h2>
            <fieldset className="sing-up-input">
              <legend>Select animals</legend>
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
                  Check All
                </label>
              </div>
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
      <Redirect to="/profile" />
    );
  }
}
