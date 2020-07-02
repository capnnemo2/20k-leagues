import React from "react";
import Context from "../Context";
import "./EditDive.css";
import NonGetApiService from "../services/non-get-api-service";

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
    prev_animals_spotted: [],

    rating: "",
  };

  componentDidMount() {
    const diveId = Number(this.props.match.params.dive_id);
    const dive = this.context.dives.find((dive) => dive.id === diveId);

    if (!this.state.initialFieldsSet && dive != null) {
      // maybe insert the date format function here
      this.setFieldsInState(dive);
    }
  }

  componentDidUpdate() {
    const diveId = Number(this.props.match.params.dive_id);
    const dive = this.context.dives.find((dive) => dive.id === diveId);

    if (!this.state.initialFieldsSet && dive != null) {
      console.log("update: ", dive.dive_date);
      // which would mean that there would have to be a different date format function here
      this.setFieldsInState(dive);
    }
  }

  setFieldsInState = (dive) => {
    console.log("1: ", dive.dive_date);

    let dive_date = dive.dive_date.split("");

    console.log("2: ", dive_date);

    dive_date.splice(4, 0, "-");
    dive_date.splice(7, 0, "-");
    dive_date = dive_date.join("");
    dive_date = dive_date.slice(0, 10);

    console.log("3: ", dive_date);

    if (dive.max_depth === null) {
      dive.max_depth = "";
    }
    if (dive.duration === null) {
      dive.duration = "";
    }
    if (dive.water_temp === null) {
      dive.water_temp = "";
    }
    if (dive.viz === null) {
      dive.viz = "";
    }

    this.setState({
      initialFieldsSet: true,
      dive_date: dive_date,
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
      prev_animals_spotted: dive.animals_spotted,
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

  // TODO
  // edit dive currently has issues with the animal tracker. if you edit a dive and submit, it adds whatever animals are checked as spotted, even if there was no change. removing an animal spotted does not remove it from animal tracker.
  // (1) so handle submit needs to be able to assess if animals spotted was edited. if not: no change to animal tracker.

  // (1) create a new property in state: prev_animals_spotted
  // (1) this would be set in setFieldsInState and would not have an onChange handler but would just be there for reference during handleSubmit
  // (1) if animals_spotted === prev_animals_spotted do NOT update user.wishlist and do NOT update animal tracker
  // (1) if animals_spotted.length === prev_animals_spotted.length && animals_spotted includes prev_animals_spotted

  // (2) if there was an animals spotted change: that needs to be reflected in the animal tracker
  // possible change scenarios:
  //    - (A) an animal spotted was removed
  //    - (B) an additional animal was spotted
  //    - (C) combo of those two, or multiple instances of those two

  // (2)(A) if(animals_spotted.length !== prev_animals_spotted.length && animals_spotted does NOT include prev_animals_spotted)
  // (2)(A) then remove prev_animals_spotted AND add any new animals_spotted
  // (2)(A) then we need to update animal tracker AND update user.wishlist

  // (2)(B) if(animals_spotted.length !== prev_animals_spotted.length && animals_spotted includes prev_animals_spotted)
  // (2)(B) then add any new animals_spotted
  // (2)(B) then update animal tracker without adding repeats AND update user.wishlist with any new animals_spotted

  // (2)(C) if(animals_spotted.length === prev_animals_spotted.length && animals_spotted does NOT include prev_animals_spotted)
  // (2)(C) ...and more...

  handleSubmit = () => {
    let {
      dive_date,
      dive_site,
      country,
      region,
      max_depth,
      duration,
      water_temp,
      dive_shop,
      guide,
      buddy,
      viz,
      dive_type,
      drift_dive,
      night_dive,
      description,
      animals_spotted,
      prev_animals_spotted,
      rating,
    } = this.state;
    let newDive = {
      dive_date,
      dive_site,
      country,
      region,
      max_depth,
      duration,
      water_temp,
      dive_shop,
      guide,
      buddy,
      viz,
      dive_type,
      drift_dive,
      night_dive,
      description,
      animals_spotted,
      rating,
    };
    newDive.id = Number(this.props.match.params.dive_id);
    newDive.user_id = this.context.user.id;

    console.log("updated dive: ", newDive);

    NonGetApiService.updateDive(newDive.id, newDive)
      .then(this.context.updateDive(newDive.id, newDive))
      .catch((err) => console.log(err));

    // BEGIN animal stuff
    const arrays_equal =
      animals_spotted.sort().toString() ===
      prev_animals_spotted.sort().toString();

    const combined_array = [].concat(prev_animals_spotted, animals_spotted);

    const findDupes = (arr) => {
      let sorted_arr = arr.sort();
      let results = [];
      for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
          results.push(sorted_arr[i]);
        }
      }
      return results;
    };

    const dupes = findDupes(combined_array);

    if (arrays_equal) {
      //
      // if the arrays are the same, do NOT update the tracker, do NOT update the wishlist
      // this should probably be the last else statement in this if block, or not mentioned as the neutral option
    } else if (!arrays_equal && dupes.length) {
      // for animal tracker
      const animalsToAddTracker = animals_spotted.filter(
        (a) => !dupes.includes(a)
      );
      const animalsToRemoveTracker = prev_animals_spotted.filter(
        (a) => !dupes.includes(a)
      );

      // for wishlist fulfilled
      const wishlist_fulfilled = this.context.user.wishlist_fulfilled;
      const animalsToAddWishlist = animals_spotted.filter(
        (a) => !wishlist_fulfilled.includes(a)
      );
      const animalsToRemoveWishlist = wishlist_fulfilled.filter(
        (a) => !dupes.includes(a)
      );
      // TODO
      // have to check that animalsToRemoveWishlist aren't included in a different dive first
      const updatedWishlistFulfilled = [].concat(
        wishlist_fulfilled.filter((a) => !animalsToRemoveWishlist.includes(a)),
        animalsToAddWishlist
      );

      this.context.updatedWishlistFulfilled(updatedWishlistFulfilled);
      //
      // if the arrays are not the same, but prev_animals_spotted is included in animals_spotted, remove prev_animals_spotted
      // then update animal tracker with (animals_spotted - dupes)
      // then subtract from animal tracker (prev_animals_spotted - dupes)
      // then update use wishlist if animals_spotted are first time spots for user
    } else if (!arrays_equal && !dupes.length) {
      // if the arrays are not the same AND prev_animals_spotted is NOT included in animals_spotted
      // remove prev_animals_spotted from animal tracker x1 AND check to see if prev_animals_spotted need to be removed from user wishlist fulfilled
      // then add animals_spotted to animal tracker
      // then update user wishlist if animals_spotted are first time spots for the user
    }

    // BEGIN conditional stuff
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
    // END conditional stuff

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          className="form-edit-dive"
        >
          <div>
            <fieldset className="sign-up-input">
              <legend className="section-title">Essentials</legend>
              <div className="add-col-1">
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
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Dive Stats</legend>
              <div className="add-col-1">
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
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">People</legend>
              <div className="add-col-1">
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
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Visibility</legend>
              <div className="add-flex">
                <label>
                  <input
                    type="radio"
                    value="1"
                    checked={Number(this.state.viz) === 1}
                    onChange={(e) => this.updateViz(e)}
                  />
                  Terrible
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="2"
                    checked={Number(this.state.viz) === 2}
                    onChange={(e) => this.updateViz(e)}
                  />
                  Poor
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="3"
                    checked={Number(this.state.viz) === 3}
                    onChange={(e) => this.updateViz(e)}
                  />
                  Fair
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="4"
                    checked={Number(this.state.viz) === 4}
                    onChange={(e) => this.updateViz(e)}
                  />
                  Good
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="5"
                    checked={Number(this.state.viz) === 5}
                    onChange={(e) => this.updateViz(e)}
                  />
                  Excellent
                </label>
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Dive Type</legend>
              <div className="add-col-1">
                <label>
                  <input
                    type="radio"
                    value="Shore"
                    checked={this.state.dive_type === "Shore"}
                    onChange={(e) => this.updateDiveType(e)}
                  />
                  Shore dive
                </label>
                <br />
                <label>
                  <input
                    type="radio"
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
              </div>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Sights</legend>
              <div className="descrip-field">
                <label htmlFor="description">Description: </label>
                <textarea
                  name="description"
                  id="description"
                  aria-label="Describe your dive"
                  value={this.state.description}
                  onChange={(e) => this.updateDescription(e)}
                />
              </div>

              <fieldset>
                <legend className="section-title">Animals Spotted</legend>
                <div className="add-col-1">
                  {animalList.map((animal) => (
                    <div key={animal.id}>
                      <label>
                        <input
                          type="checkbox"
                          name={animal.animal}
                          id={animal.id}
                          value={animal.animal}
                          checked={this.state.animals_spotted.includes(
                            animal.id
                          )}
                          onChange={this.handleAnimalChange}
                        />
                        {animal.animal}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </fieldset>

            <fieldset className="sign-up-input">
              <legend className="section-title">Rating</legend>
              <div className="add-flex-2 add-col-1">
                <label>
                  <input
                    type="radio"
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
                    value="5"
                    checked={Number(this.state.rating) === 5}
                    onChange={(e) => this.updateRating(e)}
                    required
                  />
                  Five seastars
                </label>
              </div>
            </fieldset>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-submit">
              Update
            </button>{" "}
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
      <h1>Loading Dive...</h1>
    );
  }
}
