import React from "react";
import "./AddDive.css";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";

export default class AddDive extends React.Component {
  static contextType = Context;
  state = {
    dive_date: "",
    dive_site: "",
    country: "",
    region: "",

    max_depth: "",
    duration: "",
    water_temp: "",

    dive_shop: "",
    guide: "",
    buddy: "",

    viz: "",

    dive_type: "",
    drift_dive: false,
    night_dive: false,

    description: "",
    animals_spotted: [],

    rating: "",
  };

  updateDate(e) {
    this.setState({
      dive_date: e.target.value,
    });
  }
  updateDiveSite(e) {
    this.setState({
      dive_site: e.target.value,
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
      max_depth: e.target.value,
    });
  }

  updateDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  updateWaterTemp(e) {
    this.setState({
      water_temp: e.target.value,
    });
  }

  updateDiveShop(e) {
    this.setState({
      dive_shop: e.target.value,
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
      dive_type: e.target.value,
    });
  }

  handleDriftDiveChange = (e) => {
    this.setState((prevState) => {
      let { drift_dive } = prevState;
      if (drift_dive === false) {
        drift_dive = true;
      } else if (drift_dive === true) {
        drift_dive = false;
      }
      return { drift_dive };
    });
  };

  handleNightDiveChange = (e) => {
    this.setState((prevState) => {
      let { night_dive } = prevState;
      if (night_dive === false) {
        night_dive = true;
      } else if (night_dive === true) {
        night_dive = false;
      }
      return { night_dive };
    });
  };

  updateDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleAnimalChange = (e) => {
    if (e.target.checked) {
      this.setState({
        animals_spotted: [
          ...this.state.animals_spotted,
          parseInt(e.target.getAttribute("id")),
        ],
      });
    } else {
      this.setState({
        animals_spotted: this.state.animals_spotted.filter(
          (animal) => animal !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  updateRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  handleSubmit = () => {
    let newDive = this.state;
    newDive.user_id = this.context.user.id;

    NonGetApiService.addDive(newDive)
      .then(this.context.addDive)
      .catch((err) => console.log(err));

    this.context.addToWishlistFulfilled(newDive.animals_spotted);

    let newAnimalsTracked = newDive.animals_spotted.map((animal) => {
      let newAnimalTracked = {};
      newAnimalTracked.animal = this.context.allAnimals.find(
        (a) => a.id === animal
      ).animal;
      newAnimalTracked.country = newDive.country;
      newAnimalTracked.region = newDive.region;
      return newAnimalTracked;
    });

    this.context.updateAnimalTracker(newAnimalsTracked);

    this.props.history.push("/log");
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.context;
    const countries = this.context.countries;
    const regions =
      this.state.country !== ""
        ? countries.find(
            (country) => country.country_name === this.state.country
          ).regions
        : [];
    const animalList = this.context.allAnimals;
    return user.id ? (
      <div className="AddDive">
        <header>
          <h2>Log a New Dive</h2>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-add-dive"
        >
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend className="section-title">Essentials</legend>
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
              <legend className="section-title">Dive Stats</legend>
              <div>
                <label htmlFor="depth">Max depth (ft): </label>
                <input
                  type="number"
                  name="depth"
                  id="depth"
                  min="0"
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
                  min="0"
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
              <legend className="section-title">People</legend>
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
              <legend className="section-title">Visibility</legend>
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
              <legend className="section-title">Dive Type</legend>
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

              <fieldset className="sign-up-input">
                <legend className="section-title">Animals Spotted</legend>
                {animalList.map((animal) => (
                  <div key={animal.id}>
                    <label>
                      <input
                        type="checkbox"
                        name={animal.animal}
                        id={animal.id}
                        value={animal.animal}
                        checked={this.state.animals_spotted.includes(animal.id)}
                        onChange={this.handleAnimalChange}
                      />
                      {animal.animal}
                    </label>
                  </div>
                ))}
              </fieldset>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Rating</legend>
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
          <div className="btn-container">
            <button type="submit" className="btn-submit">
              Log dive
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
      <h2>Loading form...</h2>
    );
  }
}
