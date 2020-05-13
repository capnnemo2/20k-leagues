import React from "react";
import "./AddDive.css";
import dummyStore from "../dummyStore";
import Context from "../Context";

export default class AddDive extends React.Component {
  static contextType = Context;
  state = {
    date: "",
    diveSite: "",
    country: "",
    region: "",

    maxDepth: "",
    duration: "",
    waterTemp: "",

    diveShop: "",
    guide: "",
    buddy: "",

    viz: "",

    diveType: "",
    driftDive: false,
    nightDive: false,

    description: "",
    animalsSpotted: [],

    rating: "",
  };

  componentDidMount() {
    const userWishlist = this.context.user.wishlist;
    let animals = [];
    for (let i = 0; i < userWishlist.length; i++) {
      let newAnimal = {
        name: userWishlist[i],
        isChecked: false,
      };
      animals.push(newAnimal);
    }
    this.setState({
      animalsSpotted: animals,
    });
  }

  updateDate(e) {
    this.setState({
      date: e.target.value,
    });
  }
  updateDiveSite(e) {
    this.setState({
      diveSite: e.target.value,
    });
  }

  updateCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }
  updateRegion(e) {
    this.setState({
      region: e.target.value,
    });
  }

  updateMaxDepth(e) {
    this.setState({
      maxDepth: e.target.value,
    });
  }

  updateDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  updateWaterTemp(e) {
    this.setState({
      waterTemp: e.target.value,
    });
  }

  updateDiveShop(e) {
    this.setState({
      diveShop: e.target.value,
    });
  }

  updateGuide(e) {
    this.setState({
      guide: e.target.value,
    });
  }

  updateBuddy(e) {
    this.setState({
      buddy: e.target.value,
    });
  }

  updateViz(e) {
    this.setState({
      viz: e.target.value,
    });
  }

  updateDiveType(e) {
    this.setState({
      diveType: e.target.value,
    });
  }

  handleDriftDiveChange = (e) => {
    this.setState((prevState) => {
      let { driftDive } = prevState;
      if (driftDive === false) {
        driftDive = true;
      } else if (driftDive === true) {
        driftDive = false;
      }
      return { driftDive };
    });
  };

  handleNightDiveChange = (e) => {
    this.setState((prevState) => {
      let { nightDive } = prevState;
      if (nightDive === false) {
        nightDive = true;
      } else if (nightDive === true) {
        nightDive = false;
      }
      return { nightDive };
    });
  };

  updateDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleAnimalsChange = (e) => {
    let animalName = e.target.name;
    let checked = e.target.checked;

    this.setState((prevState) => {
      let { animalsSpotted } = prevState;
      animalsSpotted = animalsSpotted.map((animal) =>
        animal.name === animalName ? { ...animal, isChecked: checked } : animal
      );
      return { animalsSpotted };
    });
  };

  updateRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  handleSubmit = () => {
    let newDive = this.state;
    newDive.id = this.context.dives.length + 1;
    newDive.user_id = this.context.user.id;
    let wishlistFulfilled = newDive.animalsSpotted.filter(
      (animal) => animal.isChecked === true
    );
    newDive.animalsSpotted = wishlistFulfilled.map((animal) => animal.name);
    this.context.addDive(newDive);
    this.context.updateWishlistFulfilled(newDive.animalsSpotted);

    for (let i = 0; i < newDive.animalsSpotted.length; i++) {
      let newAnimalTracked = {};
      // create the correct id
      newAnimalTracked.id = this.context.animalTracker.length + 1 + i;
      newAnimalTracked.animal = newDive.animalsSpotted[i];
      newAnimalTracked.country = newDive.country;
      newAnimalTracked.region = newDive.region;

      this.context.updateAnimalTracker(newAnimalTracked);
    }

    this.props.history.push("/log");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const user = this.context.user;
    const countries = dummyStore.countries;
    const regions =
      this.state.country !== ""
        ? countries.find(
            (country) => country.country_name === this.state.country
          ).regions
        : [];
    return user ? (
      <div className="AddDive">
        <header>
          <h2>Log a New Dive</h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
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
                  onChange={(e) => this.updateDate(e)}
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
                  onChange={(e) => this.updateDiveSite(e)}
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
                <select
                  id="region"
                  onChange={(e) => this.updateRegion(e)}
                  required
                >
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
                  onChange={(e) => this.updateMaxDepth(e)}
                />
              </div>
              <div>
                <label htmlFor="dive-time">Duration (min): </label>
                <input
                  type="number"
                  name="dive-time"
                  id="dive-time"
                  aria-label="Enter the dive duration"
                  onChange={(e) => this.updateDuration(e)}
                />
              </div>
              <div>
                <label htmlFor="temp">Water Temperature (F): </label>
                <input
                  type="number"
                  name="temp"
                  id="temp"
                  aria-label="Enter the water temperature"
                  onChange={(e) => this.updateWaterTemp(e)}
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
                  onChange={(e) => this.updateDiveShop(e)}
                />
              </div>
              <div>
                <label htmlFor="guide">Divemaster/Guide: </label>
                <input
                  type="text"
                  name="guide"
                  id="guide"
                  aria-label="Enter your dive guide"
                  onChange={(e) => this.updateGuide(e)}
                />
              </div>
              <div>
                <label htmlFor="buddy">Buddy: </label>
                <input
                  type="text"
                  name="buddy"
                  id="buddy"
                  aria-label="Enter your dive buddy"
                  onChange={(e) => this.updateBuddy(e)}
                />
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Visibility</legend>
              <label>
                <input
                  type="radio"
                  name="viz"
                  value="1"
                  onChange={(e) => this.updateViz(e)}
                />
                I couldn't see my own fins
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="viz"
                  value="2"
                  onChange={(e) => this.updateViz(e)}
                />
                My dive buddy was a vague shadow
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="viz"
                  value="3"
                  onChange={(e) => this.updateViz(e)}
                />
                Anything beyond twenty feet was a theory
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="viz"
                  value="4"
                  onChange={(e) => this.updateViz(e)}
                />
                I could see just fine
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="viz"
                  value="5"
                  onChange={(e) => this.updateViz(e)}
                />
                I could see two days into the future
              </label>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Dive Type</legend>
              <label>
                <input
                  type="radio"
                  name="dive-type"
                  value="Shore"
                  onChange={(e) => this.updateDiveType(e)}
                />
                Shore dive
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="dive-type"
                  value="Boat"
                  onChange={(e) => this.updateDiveType(e)}
                />
                Boat dive
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="drift"
                  onChange={this.handleDriftDiveChange}
                />
                Drift dive
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="night"
                  onChange={this.handleNightDiveChange}
                />
                Night dive
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
                  onChange={(e) => this.updateDescription(e)}
                />
              </div>

              {/* upon submit for any checked animal this will add the animal to wishlist fulfilled */}
              <fieldset className="sign-up-input">
                <legend>Animals Spotted</legend>
                {user.wishlist.map((animal) => (
                  <div key={animal}>
                    <label>
                      <input
                        type="checkbox"
                        name={animal}
                        value={animal}
                        onChange={this.handleAnimalsChange}
                      />
                      {animal}
                    </label>
                  </div>
                ))}
              </fieldset>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Rating</legend>
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                One seastar
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Two seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Three seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Four seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  onChange={(e) => this.updateRating(e)}
                  required
                />
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
    ) : (
      "Loading..."
    );
  }
}
