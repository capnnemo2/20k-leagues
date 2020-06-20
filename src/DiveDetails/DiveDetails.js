import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";
import "./DiveDetails.css";
import GetApiService from "../services/get-api-service";

export default class DiveDetails extends React.Component {
  static contextType = Context;

  displayDate = (date) => {
    let formattedDate = "";
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);

    if (month === "01") {
      month = "January";
    }
    if (month === "02") {
      month = "February";
    }
    if (month === "03") {
      month = "March";
    }
    if (month === "04") {
      month = "April";
    }
    if (month === "05") {
      month = "May";
    }
    if (month === "06") {
      month = "June";
    }
    if (month === "07") {
      month = "July";
    }
    if (month === "08") {
      month = "August";
    }
    if (month === "09") {
      month = "September";
    }
    if (month === "10") {
      month = "October";
    }
    if (month === "11") {
      month = "November";
    }
    if (month === "12") {
      month = "December";
    }

    formattedDate = month + " " + day + ", " + year;

    return formattedDate;
  };

  displayViz = (visibility) => {
    let viz = visibility;

    if (Number(viz) === 1) {
      viz = "I couldn't see my own fins";
    }
    if (Number(viz) === 2) {
      viz = "My dive buddy was a vague shadow";
    }
    if (Number(viz) === 3) {
      viz = "Anything beyond twenty feet was a theory";
    }
    if (Number(viz) === 4) {
      viz = "I could see just fine";
    }
    if (Number(viz) === 4) {
      viz = "I could see two days into the future";
    }

    return viz;
  };

  getDiveNumber = (id, thisDive) => {
    const allUserDives = this.context.dives.filter(
      (dive) => Number(id) === Number(dive.user_id)
    );

    allUserDives.map(
      (dive) => (dive.dive_date = dive.dive_date.split("-").join(""))
    );
    allUserDives.sort((a, b) => a.dive_date - b.dive_date);
    return allUserDives.indexOf(thisDive) + 1;
  };

  deleteDive = (dive_id) => {
    NonGetApiService.deleteDive(dive_id)
      .then(this.context.deleteDive(dive_id))
      .then(this.props.history.push("/log"))
      .catch((err) => console.log(err));
  };

  handleDelete = (dive_id) => {
    // first, check if there were any animals spotted
    const dive = this.context.dives.find(
      (d) => Number(d.id) === Number(dive_id)
    );
    const region = dive.region;

    if (dive.animals_spotted.length === 0) {
      console.log("no animals spotted");
      this.deleteDive(dive_id);
    } else if (dive.animals_spotted.length === 1) {
      console.log("one animal was spotted");

      // find the animal
      let animalName = this.context.allAnimals.filter((a) =>
        dive.animals_spotted.includes(a.id)
      );
      // create an id array for later
      const animalId = animalName.map((a) => a.id);
      // reduce to just the name
      animalName = animalName.map((a) => a.animal);
      // use name to get info from tracker
      const animalInTracker = this.context.animalTracker.filter((a) =>
        animalName.includes(a.animal)
      );
      // get animal in region
      let animalInTrackerRegion = animalInTracker.filter(
        (a) => a.region === region
      );
      animalInTrackerRegion.forEach((a) => delete a.country);

      // if only one: remove from tracker AND remove from wishlist fulfilled AND delete dive
      if (animalInTracker.length === 1) {
        console.log("one animal, only sighting");
        NonGetApiService.removeAnimalsTracked(animalInTrackerRegion, () => {
          GetApiService.getAnimalsTracked()
            .then(this.context.setAnimalTracker)
            .catch((err) => console.log(err));
        });

        // remove from user wishlist fulfilled
        const updatedAnimalsSpotted = this.context.user.wishlist_fulfilled.filter(
          (a) => !animalId.includes(a)
        );
        this.context.updateWishlistFulfilled(updatedAnimalsSpotted);

        this.deleteDive(dive_id);
      } else {
        // if more than one: remove from tracker AND delete dive
        console.log("one animal, multiple sightings");

        NonGetApiService.removeAnimalsTracked(animalInTrackerRegion, () => {
          GetApiService.getAnimalsTracked()
            .then((res) => console.log("response: ", res))
            .then(this.context.setAnimalTracker)
            .catch((err) => console.log(err));
        });

        this.deleteDive(dive_id);
      }
    } else {
      // if animals_spotted > 1 same as above, but for each animal spotted
      console.log("multiple animals were spotted");

      let animalNames = this.context.allAnimals.filter((a) =>
        dive.animals_spotted.includes(a.id)
      );

      animalNames.forEach((a) => {
        const animalId = a.id;
        const animalAnimal = a.animal;
        const animalTracked = this.context.animalTracker.filter(
          (animal) => animal.animal === animalAnimal
        );
        const animalInRegion = animalTracked.filter(
          (animal) => animal.region === region
        );

        if (animalTracked.length === 1) {
          NonGetApiService.removeAnimalsTracked(animalInRegion, () => {
            GetApiService.getAnimalsTracked()
              .then(this.context.setAnimalTracker)
              .catch((err) => console.log(err));
          });

          const updateAnimalsSpottedForWishlist = this.context.user.wishlist_fulfilled.filter(
            (a) => a !== animalId
          );
          this.context.updateWishlistFulfilled(updateAnimalsSpottedForWishlist);
        } else {
          NonGetApiService.removeAnimalsTracked(animalInRegion, () => {
            GetApiService.getAnimalsTracked()
              .then(this.context.setAnimalTracker)
              .catch((err) => console.log(err));
          });
        }
      });
      this.deleteDive(dive_id);
    }
  };

  render() {
    const dive_id = this.props.match.params.dive_id;
    const dive = this.context.dives.find(
      (d) => Number(d.id) === Number(dive_id)
    );
    return dive ? (
      <div className="DiveDetails">
        <header>
          <h2>Dive # {this.getDiveNumber(dive.user_id, dive)}</h2>
        </header>

        <div className="dive-container">
          <fieldset className="input-fields sidebar">
            <legend className="section-title">People</legend>
            <ul className="sign-up-input">
              {dive.dive_shop ? (
                <li>
                  Dive Shop <span className="details-li">{dive.dive_shop}</span>
                </li>
              ) : (
                ""
              )}
              {dive.guide !== "" ? (
                <li>
                  Guide <span className="details-li">{dive.guide}</span>{" "}
                </li>
              ) : (
                ""
              )}
              {dive.buddy !== "" ? (
                <li>
                  Buddy <span className="details-li">{dive.buddy}</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </fieldset>

          <div className="dive-inner-container">
            <fieldset className="input-fields">
              <div className="btn-container"></div>
              <legend className="section-title">Date and Location</legend>
              <ul className="sign-up-input">
                <li>
                  Date{" "}
                  <span className="details-li">
                    {this.displayDate(dive.dive_date)}
                  </span>{" "}
                </li>
                <li>
                  Country <span className="details-li">{dive.country}</span>{" "}
                </li>
                <li>
                  Region <span className="details-li">{dive.region}</span>{" "}
                </li>
                <li>
                  Dive Site <span className="details-li">{dive.dive_site}</span>{" "}
                </li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend className="section-title">Description</legend>
              <ul className="sign-up-input">
                {dive.description !== "" ? <li>{dive.description}</li> : ""}
                <li className="details-rating">{dive.rating} seastars</li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend className="section-title">Animals Spotted</legend>
              <ul className="sign-up-input">
                {this.context.allAnimals
                  .filter((animal) => dive.animals_spotted.includes(animal.id))
                  .map((animal, i) => (
                    <li key={i}>{animal.animal}</li>
                  ))}
              </ul>
            </fieldset>
          </div>

          <fieldset className="input-fields sidebar">
            <legend className="section-title">Statistics</legend>
            <ul className="sign-up-input">
              <li>
                Maximum Depth{" "}
                <span className="details-li">{dive.max_depth} ft.</span>{" "}
              </li>
              <li>
                Bottom Time{" "}
                <span className="details-li">{dive.duration} min.</span>{" "}
              </li>
              <li>
                Water Temp{" "}
                <span className="details-li">{dive.water_temp} °F</span>{" "}
              </li>
              {dive.viz !== "" ? (
                <li>
                  Visibility{" "}
                  <span className="details-li">
                    {this.displayViz(dive.viz)}
                  </span>{" "}
                </li>
              ) : (
                ""
              )}
              {dive.diveType === "boat" ? (
                <li>
                  {" "}
                  <span className="details-li">Boat dive</span>{" "}
                </li>
              ) : (
                <li>
                  <span className="details-li">Shore dive</span>
                </li>
              )}
              {dive.drift_dive === true ? (
                <li>
                  <span className="details-li">Drift dive</span>
                </li>
              ) : (
                ""
              )}
              {dive.night_dive === true ? (
                <li>
                  <span className="details-li">Night dive</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </fieldset>
        </div>
        <div className="btn-container btn-details-back">
          <Link to={`/edit-dive/${dive_id}`} className="btn-submit">
            Edit Dive
          </Link>{" "}
          <Link to="/log" className="btn-cancel">
            Back to Log
          </Link>{" "}
          <Link
            to={"/log"}
            onClick={(e) => {
              if (
                window.confirm("Are you sure you want to delete this dive?")
              ) {
                e.preventDefault();
                this.handleDelete(dive_id);
              } else {
                alert(`Whew, that was close!`);
              }
            }}
            className="btn-delete"
          >
            Delete Dive
          </Link>
        </div>
      </div>
    ) : (
      <h2>Loading dive details...</h2>
    );
  }
}
