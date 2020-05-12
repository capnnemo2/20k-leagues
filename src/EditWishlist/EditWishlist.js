import React from "react";
import Context from "../Context";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  static contextType = Context;

  state = {
    allChecked: false,
    list: [
      { id: 1, name: "Whale Shark", isChecked: false },
      { id: 2, name: "Mola Mola", isChecked: false },
      { id: 3, name: "Thresher Shark", isChecked: false },
      { id: 4, name: "Hammerhead Shark", isChecked: false },
      { id: 5, name: "Great White Shark", isChecked: false },
      { id: 6, name: "Tiger Shark", isChecked: false },
      { id: 7, name: "Manatee", isChecked: false },
      { id: 8, name: "Seahorse", isChecked: false },
      { id: 9, name: "Dragon Moray", isChecked: false },
      { id: 10, name: "Ribbon Eel", isChecked: false },
      { id: 11, name: "Mandarin Fish", isChecked: false },
      { id: 12, name: "Frog Fish", isChecked: false },
      { id: 13, name: "Mimic Octopus", isChecked: false },
      { id: 14, name: "Pygmy Seahorse", isChecked: false },
      { id: 15, name: "Leafy Seadragon", isChecked: false },
      { id: 16, name: "Blue-Ringed Octopus", isChecked: false },
      { id: 17, name: "Flamboyant Cuttlefish", isChecked: false },
      { id: 18, name: "Harlequin Shrimp", isChecked: false },
      { id: 19, name: "Orangutan Crab", isChecked: false },
      { id: 20, name: "Ornate Ghost Pipefish", isChecked: false },
      { id: 21, name: "Leaf Scorpionfish", isChecked: false },
    ],
  };

  renderList = () => {
    return this.state.list.map((animal) => (
      <div key={animal.id}>
        <label>
          <input
            type="checkbox"
            name={animal.name}
            value={animal.name}
            checked={animal.isChecked}
            onChange={this.handleChange}
          />
          {animal.name}
        </label>
      </div>
    ));
  };

  handleChange = (e) => {
    let animalName = e.target.name;
    let checked = e.target.checked;
    this.setState((prevState) => {
      let { list, allChecked } = prevState;
      if (animalName === "checkAll") {
        allChecked = checked;
        list = list.map((animal) => ({ ...animal, isChecked: checked }));
      } else {
        list = list.map((animal) =>
          animal.name === animalName
            ? { ...animal, isChecked: checked }
            : animal
        );
        allChecked = list.every((animal) => animal.isChecked);
      }
      return { list, allChecked };
    });
  };

  // Using this to pre-check boxes for the animals the user already has on their wishlist. this way they are editing their list rather than recreating it
  componentDidMount() {
    // will need to get the user from context, but currently does not work
    let user = this.context.user;

    let prefillList = user.wishlist;
    let animals = this.state.list;
    let names = animals.map((animal) => animal.name);

    for (let i = 0; i < prefillList.length; i++) {
      for (let j = 0; j < names.length; j++) {
        if (names[j] === prefillList[i]) {
          // set state
          this.setState((prevState) => {
            let { list } = prevState;
            list = list.map((animal) =>
              animal.name === names[j] ? { ...animal, isChecked: true } : animal
            );
            return { list };
          });
        }
      }
    }
  }

  handleSubmit = () => {
    // grab all checked animals
    let wishlist = this.state.list.filter(
      (animal) => animal.isChecked === true
    );
    // extract only the animal names
    wishlist = wishlist.map((animal) => animal.name);
    this.context.updateWishlist(wishlist);
    this.props.history.push("/profile");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
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
            <fieldset className="sing-up-input" onChange={this.updateWishlist}>
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
    );
  }
}
