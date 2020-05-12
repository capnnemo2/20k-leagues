import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./DiveDetails.css";

export default class DiveDetails extends React.Component {
  static contextType = Context;
  render() {
    const dive_id = this.props.match.params.dive_id;
    const dive = this.context.dives.find(
      (d) => Number(d.id) === Number(dive_id)
    );

    return (
      <div className="DiveDetails">
        <h2>Dive #{dive.id}</h2>
        <div className="dive-container">
          {/* the order of these only makes sense when you turn on flexbox. Need a way to change the order of the fieldsets depending on a media query? */}
          <fieldset className="input-fields sidebar">
            <legend>People</legend>
            <ul className="sign-up-input">
              {dive.diveShop ? <li>Dive Shop: {dive.diveShop}</li> : ""}
              {dive.guide !== "" ? <li>Guide: {dive.guide}</li> : ""}
              {dive.buddy !== "" ? <li>Guide: {dive.buddy}</li> : ""}
            </ul>
          </fieldset>
          <div className="dive-inner-container">
            <fieldset className="input-fields">
              <legend>Date and Location</legend>
              <ul className="sign-up-input">
                <li>Date: {dive.date}</li>
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
              {dive.viz !== "" ? <li>Visibility: {dive.viz} ft.</li> : ""}
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
    );
  }
}
