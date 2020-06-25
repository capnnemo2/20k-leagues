import React from "react";
import Context from "../Context";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  static contextType = Context;

  state = {
    wishlist: [],
    usersSet: false,
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
            checked={
              this.state.wishlist && this.state.wishlist.includes(animal.id)
            }
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

  componentDidUpdate() {
    if (!this.state.usersSet && this.context.user.wishlist) {
      this.setState({
        wishlist: this.context.user.wishlist,
        usersSet: true,
      });
    }
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
    return user.id && this.state.wishlist ? (
      <div className="EditWishlist">
        <header>
          <h2>Animal Wishlist</h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-wishlist"
        >
          <div className="input-fields">
            <fieldset className="sing-up-input">
              <legend className="section-title">Select animals</legend>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="checkAll"
                    checked={
                      this.state.wishlist &&
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
      <h2>Herding the animals...</h2>
    );
  }
}
