import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  static contextType = Context;

  state = {
    allChecked: false,
    list: [],
  };

  renderList = () => {
    return this.state.list.map((animal) => (
      <div key={animal.id}>
        <label>
          <input
            type="checkbox"
            name={animal.animal}
            value={animal.animal}
            checked={animal.isChecked}
            onChange={this.handleChange}
          />
          {animal.animal}
        </label>
      </div>
    ));
  };

  // handleChange = (e) => {
  //   let animalName = e.target.name;
  //   let checked = e.target.checked;
  //   this.setState((prevState) => {
  //     let { list, allChecked } = prevState;
  //     if (animalName === "checkAll") {
  //       allChecked = checked;
  //       list = list.map((animal) => ({ ...animal, isChecked: checked }));
  //     } else {
  //       list = list.map((animal) =>
  //         animal.animal === animalName
  //           ? { ...animal, isChecked: checked }
  //           : animal
  //       );
  //       allChecked = list.every((animal) => animal.isChecked);
  //     }
  //     return { list, allChecked };
  //   });
  // };

  handleChange = (e) => {
    let animalName = e.target.name;
    let checked = e.target.checked;
    let { allChecked, list } = this.state;
    if (animalName === "checkAll") {
      allChecked = checked;
      list = list.map((animal) => ({ ...animal, isChecked: checked }));
      this.setState({ list, allChecked });
    } else {
      list = list.map((animal) =>
        animal.animal === animalName
          ? { ...animal, isChecked: checked }
          : animal
      );
      allChecked = list.every((animal) => animal.isChecked);
      this.setState({ list, allChecked });
    }
  };

  setListState() {
    this.setState({
      list: this.context.allAnimals,
    });
  }

  async componentDidMount() {
    await this.setListState();

    // this doesn't work
    if (this.context.user.wishlist) {
      let prefillList = this.context.user.wishlist;
      let animals = this.state.list;
      let names = animals.map((animal) => animal.animal);

      for (let i = 0; i < prefillList.length; i++) {
        for (let j = 0; j < names.length; j++) {
          if (names[j] === prefillList[i]) {
            this.setState((prevState) => {
              let { list } = prevState;
              list = list.map((animal) =>
                animal.animal === names[j]
                  ? { ...animal, isChecked: true }
                  : animal
              );
              return { list };
            });
          }
        }
      }
    }
  }

  // Using this to pre-check boxes for the animals the user already has on their wishlist. this way they are editing their list rather than recreating it
  // componentDidMount() {
  //   if (this.context.user.wishlist) {
  //     let prefillList = this.context.user.wishlist;
  //     let animals = this.state.list;
  //     let names = animals.map((animal) => animal.name);

  //     for (let i = 0; i < prefillList.length; i++) {
  //       for (let j = 0; j < names.length; j++) {
  //         if (names[j] === prefillList[i]) {
  //           // set state
  //           this.setState((prevState) => {
  //             let { list } = prevState;
  //             list = list.map((animal) =>
  //               animal.name === names[j]
  //                 ? { ...animal, isChecked: true }
  //                 : animal
  //             );
  //             return { list };
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

  handleSubmit = () => {
    // grab all checked animals
    let wishlist = this.state.list.filter(
      (animal) => animal.isChecked === true
    );
    // extract only the animal names
    wishlist = wishlist.map((animal) => animal.animal);
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
                    checked={this.state.allChecked}
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
      <Redirect to="/login" />
    );
  }
}
