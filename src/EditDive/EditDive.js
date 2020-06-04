import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context";
import "./EditDive.css";

export default class EditDive extends React.Component {
  static contextType = Context;

  state = {
    initialFieldsSet: false,
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

  componentDidMount() {
    const diveId = Number(this.props.match.params.dive_id);
    const dive = this.context.dives.find((dive) => dive.id === diveId);

    if (!this.state.initialFieldsSet && dive != null) {
      this.setFieldsInState(dive);
    }
  }

  setFieldsInState = (dive) => {
    let diveDate = dive.dive_date.split("");
    diveDate.splice(4, 0, "-");
    diveDate.splice(7, 0, "-");
    diveDate = diveDate.join("");

    this.setState({
      initialFieldsSet: true,
      dive_date: diveDate,
      dive_site: dive.dive_site,
      country: dive.country,
      region: dive.region,
      max_depth: dive.max_depth,
      duration: dive.duration,
      water_temp: dive.water_temp,
      dive_shop: dive.dive_shop,
      guide: dive.guide,
      buddy: dive.buddy,
      viz: dive.viz,
      dive_type: dive.dive_type,
      drift_dive: dive.drift_dive,
      night_dive: dive.night_dive,
      description: dive.description,
      animals_spotted: dive.animals_spotted,
      rating: dive.rating,
    });
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
          (a) => a !== parseInt(e.target.getAttribute("id"))
        ),
      });
    }
  };

  updateRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  // need to update this fn
  handleSubmit = () => {
    let newDive = this.state;
    newDive.id = Number(this.props.match.params.dive_id);
    newDive.user_id = this.context.user.id;

    this.context.updateDive(newDive, newDive.id);
    this.context.updateWishlistFulfilled(newDive.animals_spotted);

    let newAnimalsTracked = newDive.animals_spotted.map((animal, i) => {
      let newAnimalTracked = {};
      newAnimalTracked.animal = animal;
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
      <div className="EditDive">
        <header>
          <h2>Edit Dive</h2>
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
                  value={this.state.dive_date}
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
                  value={this.state.dive_site}
                  onChange={(e) => this.updateDiveSite(e)}
                  required
                />
              </div>
              <div>
                <label htmlFor="country">Country: </label>
                <select
                  id="country"
                  value={this.state.country}
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
                  value={this.state.region}
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
                  min="0"
                  aria-label="Enter the maximum depth"
                  value={this.state.max_depth}
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
                  value={this.state.duration}
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
                  value={this.state.water_temp}
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
                  value={this.state.dive_shop}
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
                  value={this.state.guide}
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
                  value={this.state.buddy}
                  onChange={(e) => this.updateBuddy(e)}
                />
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend>Visibility</legend>
              <label>
                <input
                  type="radio"
                  //   name="viz"
                  value="1"
                  checked={Number(this.state.viz) === 1}
                  onChange={(e) => this.updateViz(e)}
                />
                I couldn't see my own fins
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  //   name="viz"
                  value="2"
                  checked={Number(this.state.viz) === 2}
                  onChange={(e) => this.updateViz(e)}
                />
                My dive buddy was a vague shadow
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  //   name="viz"
                  value="3"
                  checked={Number(this.state.viz) === 3}
                  onChange={(e) => this.updateViz(e)}
                />
                Anything beyond twenty feet was a theory
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  //   name="viz"
                  value="4"
                  checked={Number(this.state.viz) === 4}
                  onChange={(e) => this.updateViz(e)}
                />
                I could see just fine
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  //   name="viz"
                  value="5"
                  checked={Number(this.state.viz) === 5}
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
                  //   name="dive-type"
                  value="Shore"
                  checked={this.state.diveType === "Shore"}
                  onChange={(e) => this.updateDiveType(e)}
                />
                Shore dive
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  //   name="dive-type"
                  value="Boat"
                  checked={this.state.dive_type === "Boat"}
                  onChange={(e) => this.updateDiveType(e)}
                />
                Boat dive
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="drift"
                  checked={this.state.drift_dive}
                  onChange={this.handleDriftDiveChange}
                />
                Drift dive
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="night"
                  checked={this.state.night_dive}
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
                  value={this.state.description}
                  onChange={(e) => this.updateDescription(e)}
                />
              </div>

              <fieldset className="sign-up-input">
                <legend>Animals Spotted</legend>
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
              <legend>Rating</legend>
              <label>
                <input
                  type="radio"
                  //   name="rating"
                  value="1"
                  checked={Number(this.state.rating) === 1}
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                One seastar
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  //   name="rating"
                  value="2"
                  checked={Number(this.state.rating) === 2}
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Two seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  //   name="rating"
                  value="3"
                  checked={Number(this.state.rating) === 3}
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Three seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  //   name="rating"
                  value="4"
                  checked={Number(this.state.rating) === 4}
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Four seastars
              </label>
              {"  "}
              <label>
                <input
                  type="radio"
                  //   name="rating"
                  value="5"
                  checked={Number(this.state.rating) === 5}
                  onChange={(e) => this.updateRating(e)}
                  required
                />
                Five seastars
              </label>
            </fieldset>
          </div>
          <button type="submit">Update</button>
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
