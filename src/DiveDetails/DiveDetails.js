import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import NonGetApiService from "../services/non-get-api-service";
import "./DiveDetails.css";

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
      viz = "Terrible";
    }
    if (Number(viz) === 2) {
      viz = "Poor";
    }
    if (Number(viz) === 3) {
      viz = "Fair";
    }
    if (Number(viz) === 4) {
      viz = "Good";
    }
    if (Number(viz) === 4) {
      viz = "Excellent";
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
    const dive = this.context.dives.find(
      (d) => Number(d.id) === Number(dive_id)
    );

    if (!dive.animals_spotted.length) {
      this.deleteDive(dive_id);
    } else if (dive.animals_spotted.length) {
      // updates user wishlist fulfilled
      const updatedAnimalsSpotted = [
        ...new Set(
          [].concat(
            ...this.context.dives
              .filter(
                (dive) =>
                  dive.user_id === this.context.user.id &&
                  Number(dive.id) !== Number(dive_id)
              )
              .map((dive) => dive.animals_spotted)
          )
        ),
      ];
      this.context.updateWishlistFulfilled(updatedAnimalsSpotted);

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
          <div className="input-fields sidebar">
            <h3 className="section-title">Statistics</h3>
            <ul className="sign-up-input">
              <li className="stats-item">
                Maximum Depth{" "}
                <span className="details-li">{dive.max_depth} ft.</span>{" "}
              </li>
              <li className="stats-item">
                Bottom Time{" "}
                <span className="details-li">{dive.duration} min.</span>{" "}
              </li>
              <li className="stats-item">
                Water Temp{" "}
                <span className="details-li">{dive.water_temp} °F</span>{" "}
              </li>
              {dive.viz !== "" ? (
                <li className="stats-item">
                  Visibility{" "}
                  <span className="details-li">
                    {this.displayViz(dive.viz)}
                  </span>{" "}
                </li>
              ) : (
                ""
              )}
              {dive.diveType === "boat" ? (
                <li className="stats-item">
                  {" "}
                  Access{"  "} <span className="details-li">Boat dive</span>{" "}
                </li>
              ) : (
                <li className="stats-item">
                  Access{"  "} <span className="details-li">Shore dive</span>
                </li>
              )}
              {dive.drift_dive === true ? (
                <li className="stats-item">
                  Dive Type <span className="details-li">Drift dive</span>
                </li>
              ) : (
                ""
              )}
              {dive.night_dive === true ? (
                <li className="stats-item">
                  Dive Type <span className="details-li">Night dive</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="dive-inner-container">
            <div className="input-fields">
              <h3 className="section-title">Date and Location</h3>
              <ul className="sign-up-input">
                <li className="stats-item">
                  Date{" "}
                  <span className="details-li">
                    {this.displayDate(dive.dive_date)}
                  </span>{" "}
                </li>
                <li className="stats-item">
                  Country <span className="details-li">{dive.country}</span>{" "}
                </li>
                <li className="stats-item">
                  Region <span className="details-li">{dive.region}</span>{" "}
                </li>
                <li className="stats-item">
                  Dive Site <span className="details-li">{dive.dive_site}</span>{" "}
                </li>
              </ul>
            </div>
            <div className="input-fields">
              <h3 className="section-title">Description</h3>
              <ul className="sign-up-input">
                {dive.description !== "" ? <li>{dive.description}</li> : ""}
                <li className="details-rating">{dive.rating} seastars</li>
              </ul>
            </div>
            <div className="input-fields">
              <h3 className="section-title">Animals Spotted</h3>
              <ul className="sign-up-input">
                {this.context.allAnimals
                  .filter((animal) => dive.animals_spotted.includes(animal.id))
                  .map((animal, i) => (
                    <li key={i}>{animal.animal}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="input-fields sidebar">
            <h3 className="section-title">People</h3>
            <ul className="sign-up-input">
              {dive.dive_shop ? (
                <li className="stats-item">
                  Dive Shop <span className="details-li">{dive.dive_shop}</span>
                </li>
              ) : (
                ""
              )}
              {dive.guide !== "" ? (
                <li className="stats-item">
                  Guide <span className="details-li">{dive.guide}</span>{" "}
                </li>
              ) : (
                ""
              )}
              {dive.buddy !== "" ? (
                <li className="stats-item">
                  Buddy <span className="details-li">{dive.buddy}</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <div className="btn-container btn-details-back">
          <Link to={`/edit-dive/${dive_id}`} className="btn-submit">
            Edit
          </Link>{" "}
          <Link to="/log" className="btn-cancel">
            Back
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
            Delete
          </Link>
        </div>
      </div>
    ) : (
      <h2>Loading dive details...</h2>
    );
  }
}
