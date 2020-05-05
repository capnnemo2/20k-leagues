import React from "react";
import "./EditWishlist.css";

export default class EditWishlist extends React.Component {
  state = {
    wishlist: [],
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
            <fieldset className="sing-up-input">
              <legend>Select animals</legend>
              <label>
                <input type="checkbox" name="whale-shark" />
                Whale Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="mola-mola" />
                Mola Mola
              </label>
              <br />
              <label>
                <input type="checkbox" name="thresher" />
                Thresher Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="hammer" />
                Hammerhead Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="white" />
                Great White Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="tiger" />
                Tiger Shark
              </label>
              <br />
              <label>
                <input type="checkbox" name="manatee" />
                Manatee
              </label>
              <br />
              <label>
                <input type="checkbox" name="manta" />
                Manta Ray
              </label>
              <br />
              <label>
                <input type="checkbox" name="seahorse" />
                Seahorse
              </label>
              <br />
              <label>
                <input type="checkbox" name="dragon" />
                Dragon Moray
              </label>
              <br />
              <label>
                <input type="checkbox" name="ribbon" />
                Ribbon Eel
              </label>
              <br />
              <label>
                <input type="checkbox" name="mandarin" />
                Mandarin Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="frog" />
                Frog Fish
              </label>
              <br />
              <label>
                <input type="checkbox" name="mimic" />
                Mimic Octopus
              </label>
              <br />
              <label>
                <input type="checkbox" name="pygmy" />
                Pygmy Seahorse
              </label>
              <br />
              <label>
                <input type="checkbox" name="seadragon" />
                Leafy Seadragon
              </label>
              <br />
              <label>
                <input type="checkbox" name="blue-ring" />
                Blue-Ringed Octopus
              </label>
              <br />
              <label>
                <input type="checkbox" name="flamboyant" />
                Flamboyant Cuttlefish
              </label>
              <br />
              <label>
                <input type="checkbox" name="harlequin" />
                Harlequin Shrimp
              </label>
              <br />
              <label>
                <input type="checkbox" name="orangutan" />
                Orangutan Crab
              </label>
              <br />
              <label>
                <input type="checkbox" name="pipefish" />
                Ornate Ghost Pipefish
              </label>
              <br />
              <label>
                <input type="checkbox" name="leaf" />
                Leaf Scorpionfish
              </label>
            </fieldset>
          </div>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
