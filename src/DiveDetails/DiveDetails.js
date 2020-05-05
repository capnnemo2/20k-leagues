import React from "react";
import { Link } from "react-router-dom";
import dummyStore from "../dummyStore";
import "./DiveDetails.css";

export default class DiveDetails extends React.Component {
  render() {
    const dive_id = this.props.match.params.dive_id;
    const dive = dummyStore.dives.find((d) => Number(d.id) === Number(dive_id));
    // const viz =

    return (
      <div className="DiveDetails">
        <h2>Dive #{dive.id}</h2>
        <div className="dive-container">
          {/* the order of these only makes sense when you turn on flexbox. Need a way to change the order of the fieldsets depending on a media query? */}
          <fieldset className="input-fields sidebar">
            <legend>People</legend>
            <ul className="sign-up-input">
              <li>Dive Shop Used: {dive.diveShop}</li>
              <li>Guide: {dive.guide}</li>
              <li>Buddy: {dive.buddy}</li>
            </ul>
          </fieldset>
          <div className="dive-inner-container">
            <fieldset className="input-fields">
              <legend>Date and Location</legend>
              <ul className="sign-up-input">
                <li>Date: {dive.date}</li>
                <li>Country: {dive.country}</li>
                <li>Dive Site: {dive.diveSite}</li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend>Description</legend>
              <ul className="sign-up-input">
                <li>Description: {dive.description}</li>
                <li>Rating: {dive.rating} seastars</li>
              </ul>
            </fieldset>
            <fieldset className="input-fields">
              <legend>Wishlist Animals</legend>
              <ul className="sign-up-input">
                {dive.animals.map((animal) => (
                  <li key={animal}>{animal}</li>
                ))}
              </ul>
            </fieldset>
          </div>

          <fieldset className="input-fields sidebar">
            <legend>Statistics</legend>
            <ul className="sign-up-input">
              <li>Depth: {dive.maxDepth} ft.</li>
              <li>Bottom Time: {dive.duration} min.</li>
              <li>Water Temp: {dive.waterTemp} °F</li>
              <li>Visibility: {dive.viz}</li>
              <li>Dive Type: {dive.diveType}</li>
              <li>Drift: {dive.driftDive}</li>
            </ul>
          </fieldset>
        </div>

        <Link to="/dashboard">Back to Log</Link>
      </div>
    );
  }
}
