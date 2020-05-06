import React from "react";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  state = {
    wishlist: [],
  };

  updateWishlist(e) {
    this.setState({
      wishlist: [...this.state.wishlist, e.target.value],
    });
  }

  handleSubmit = () => {
    console.log(`handleSubmit ran`);
    // let { wishlist } = this.state;
    // let newWishlist = { wishlist };
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
        <form>
          <div className="input-fields">
            <h2>Animal Wishlist</h2>
            <fieldset
              className="sing-up-input"
              onChange={(e) => this.updateWishlist(e)}
            >
              <legend>Select animals</legend>
              <label>
                <input type="checkbox" name="whale-shark" value="Whale Shark" />
                Whale Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="mola-mola" value="Mola Mola" />
                Mola Mola
              </label>
              <br />
              <label>
                <input type="checkbox" name="thresher" value="Thresher Shark" />
                Thresher Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="hammer" value="Hammerhead Shark" />
                Hammerhead Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="white" value="Great White Shark" />
                Great White Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="tiger" value="Tiger Shark" />
                Tiger Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="manatee" value="Manatee" />
                Manatee
              </label>
              <br />
              <label>
                <input type="checkbox" name="manta" value="Manta Ray" />
                Manta Ray
              </label>
              <br />
              <label>
                <input type="checkbox" name="seahorse" value="Seahorse" />
                Seahorse
              </label>
              <br />
              <label>
                <input type="checkbox" name="dragon" value="Dragon Moray" />
                Dragon Moray
              </label>
              <br />
              <label>
                <input type="checkbox" name="ribbon" value="Ribbon Eel" />
                Ribbon Eel
              </label>
              <br />
              <label>
                <input type="checkbox" name="mandarin" value="Mandarin Fish" />
                Mandarin Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="frog" value="Frog Fish" />
                Frog Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="mimic" value="Mimic Octopus" />
                Mimic Octopus
              </label>
              <br />
              <label>
                <input type="checkbox" name="pygmy" value="Pygmy Seahorse" />
                Pygmy Seahorse
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="seadragon"
                  value="Leafy Seadragon"
                />
                Leafy Seadragon
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="blue-ring"
                  value="Blue-Ringed Octopus"
                />
                Blue-Ringed Octopus
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="flamboyant"
                  value="Flamboyant Cuttlefish"
                />
                Flamboyant Cuttlefish
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="harlequin"
                  value="Harlequin Shrimp"
                />
                Harlequin Shrimp
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="orangutan"
                  value="Orangutan Crab"
                />
                Orangutan Crab
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="pipefish"
                  value="Ornate Ghost Pipefish"
                />
                Ornate Ghost Pipefish
              </label>
              <br />
              <label>
                <input type="checkbox" name="leaf" value="Leaf Scorpionfish" />
                Leaf Scorpionfish
              </label>
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
