import React from "react";
import { Link, Redirect } from "react-router-dom";
import Context from "../Context";
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

    allUserDives.map((dive) => (dive.date = dive.date.split("-").join("")));
    allUserDives.sort((a, b) => a.date - b.date);
    return allUserDives.indexOf(thisDive) + 1;
  };

  render() {
    const dive_id = this.props.match.params.dive_id;
    const dive = this.context.dives.find(
      (d) => Number(d.id) === Number(dive_id)
    );
    return dive ? (
      <div className="DiveDetails">
        <h2>Dive # {this.getDiveNumber(dive.user_id, dive)}</h2>
        <div className="dive-container">
          {/* the order of these only makes sense when you turn on flexbox. Need a way to change the order of the fieldsets depending on a media query? */}
          <fieldset className="input-fields sidebar">
            <legend>People</legend>
            <ul className="sign-up-input">
              {dive.diveShop ? <li>Dive Shop: {dive.diveShop}</li> : ""}
              {dive.guide !== "" ? <li>Guide: {dive.guide}</li> : ""}
              {dive.buddy !== "" ? <li>Buddy: {dive.buddy}</li> : ""}
            </ul>
          </fieldset>
          <div className="dive-inner-container">
            <fieldset className="input-fields">
              <legend>Date and Location</legend>
              <ul className="sign-up-input">
                <li>Date: {this.displayDate(dive.date)}</li>
                <li>Country: {dive.country}</li>
                <li>Region: {dive.region}</li>
                <li>Dive Site: {dive.diveSite}</li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend>Description</legend>
              <ul className="sign-up-input">
                {dive.description !== "" ? <li>{dive.description}</li> : ""}
                <li>Rating: {dive.rating} seastars</li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend>Wishlist Animals Spotted</legend>
              <ul className="sign-up-input">
                {dive.animalsSpotted.map((animal) => (
                  <li key={animal}>{animal}</li>
                ))}
              </ul>
            </fieldset>
          </div>

          <fieldset className="input-fields sidebar">
            <legend>Statistics</legend>
            <ul className="sign-up-input">
              <li>Maximum Depth: {dive.maxDepth} ft.</li>
              <li>Bottom Time: {dive.duration} min.</li>
              <li>Water Temp: {dive.waterTemp} °F</li>
              {dive.viz !== "" ? (
                <li>Visibility: {this.displayViz(dive.viz)}</li>
              ) : (
                ""
              )}
              {dive.diveType === "boat" ? (
                <li>Boat dive</li>
              ) : (
                <li>Shore dive</li>
              )}
              {dive.driftDive === true ? <li>Drift dive</li> : ""}
              {dive.night === true ? <li>Night dive</li> : ""}
            </ul>
          </fieldset>
        </div>

        <Link to="/log">Back to Log</Link>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}
