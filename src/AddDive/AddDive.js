import React from "react";
import "./AddDive.css";
import dummyStore from "../dummyStore";

export default class AddDive extends React.Component {
  state = {
    country: "",
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  updateCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // somewhere in here is the logic to add an animal seen to user.wishlistfulfilled
  };

  render() {
    const user = dummyStore.users[0];
    const countries = dummyStore.countries;
    const regions =
      this.state.country !== ""
        ? countries.find(
            (country) => country.country_name === this.state.country
          ).regions
        : [];
    return (
      <div className="AddDive">
        <header>
          <h2>Log a New Dive</h2>
        </header>
        <form onSubmit={this.handleSubmit}>
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend>Essentials</legend>
              <div>
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  aria-label="Enter the date of the dive"
                  aria-required="true"
                  onChange={(e) => console.log(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="site">Dive site: </label>
                <input
                  type="text"
                  name="site"
                  id="site"
                  aria-label="Enter the name of the dive site"
                  aria-required="true"
                  required
                />
              </div>
              <div>
                <label htmlFor="country">Country: </label>
                <select
                  id="country"
                  onChange={(e) => this.updateCountry(e)}
                  required
                >
                  <option value="">Select...</option>
                  {countries.map((country) => (
                    <option
                      value={country.country_name}
                      key={country.country_name}
                    >
                      {country.country_name}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="region">Region: </label>
                <select id="region" required>
                  <option value="">Select...</option>
                  {regions.map((region) => (
                    <option value={region} key={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Dive Stats</legend>
              <div>
                <label htmlFor="depth">Max depth (ft): </label>
                <input
                  type="number"
                  name="depth"
                  id="depth"
                  aria-label="Enter the maximum depth"
                />
              </div>
              <div>
                <label htmlFor="dive-time">Duration (min): </label>
                <input
                  type="number"
                  name="dive-time"
                  id="dive-time"
                  aria-label="Enter the dive duration"
                />
              </div>
              <div>
                <label htmlFor="temp">Water Temperature (F): </label>
                <input
                  type="number"
                  name="temp"
                  id="temp"
                  aria-label="Enter the water temperature"
                />
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>People</legend>
              <div>
                <label htmlFor="shop">Dive shop: </label>
                <input
                  type="text"
                  name="shop"
                  id="shop"
                  aria-label="Enter the dive shop"
                />
              </div>
              <div>
                <label htmlFor="guide">Divemaster/Guide: </label>
                <input
                  type="text"
                  name="guide"
                  id="guide"
                  aria-label="Enter your dive guide"
                />
              </div>
              <div>
                <label htmlFor="buddy">Buddy: </label>
                <input
                  type="text"
                  name="buddy"
                  id="buddy"
                  aria-label="Enter your dive buddy"
                />
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Visibility</legend>
              <label>
                <input type="radio" name="viz"></input>I couldn't see my own
                fins
              </label>
              <br />
              <label>
                <input type="radio" name="viz"></input>
                My dive buddy was a vague shadow
              </label>
              <br />
              <label>
                <input type="radio" name="viz"></input>
                Anything beyond twenty feet was a theory
              </label>
              <br />
              <label>
                <input type="radio" name="viz"></input>I could see just fine
              </label>
              <br />
              <label>
                <input type="radio" name="viz"></input>I could see two days into
                the future
              </label>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Dive Type</legend>
              <label>
                <input type="radio" name="dive-type" />
                Shore dive
              </label>
              <br />
              <label>
                <input type="radio" name="dive-type" />
                Boat dive
              </label>
              <br />
              <label>
                <input type="checkbox" name="drift" />
                Drift dive
              </label>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Sights</legend>
              <div>
                <label htmlFor="description">Description: </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  cols="50"
                  aria-label="Describe your dive"
                />
              </div>

              {/* ideally, upon submit for any checked animal this will (1) remove the animal from the wihslist, and (2) add the animal to wishlist fulfilled */}
              <fieldset className="sign-up-input">
                <legend>Animals Spotted</legend>
                {user.wishlist.map((animal) => (
                  <div key={animal}>
                    <label>
                      <input type="checkbox" name={animal} value={animal} />
                      {animal}
                    </label>
                  </div>
                ))}
              </fieldset>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Rating</legend>
              <label>
                <input type="radio" name="rating" />
                One seastar
              </label>
              {"  "}
              <label>
                <input type="radio" name="rating" />
                Two seastars
              </label>
              {"  "}
              <label>
                <input type="radio" name="rating" />
                Three seastars
              </label>
              {"  "}
              <label>
                <input type="radio" name="rating" />
                Four seastars
              </label>
              {"  "}
              <label>
                <input type="radio" name="rating" />
                Five seastars
              </label>
            </fieldset>
          </div>
          <button type="submit">Log dive</button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
