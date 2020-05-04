import React from "react";
import "./AddSpecialty.css";

export default class AddSpecialty extends React.Component {
  render() {
    return (
      <div className="AddSpecialty">
        <form>
          <div className="input-fields">
            <fieldset className="sign-up-input">
              <legend>Specialty Type</legend>
              <label>
                <input type="radio" name="diver" />
                Diver
              </label>
              <br />
              <label>
                <input type="radio" name="diver" />
                Instructor
              </label>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Specialties</legend>
              <input type="checkbox" name="altitude" id="altitude" />
              <label htmlFor="altitude">Altitude Diver</label>
              <br />
              <input type="checkbox" name="boat" id="boat" />
              <label htmlFor="boat">Boat Diver</label>
              <br />
              <input type="checkbox" name="cavern" id="cavern" />
              <label htmlFor="cavern">Cavern Diver</label>
              <br />
              <input
                type="checkbox"
                name="reef-conservation"
                id="reef-conservation"
              />
              <label htmlFor="reef-conservation">Coral Reef Conservation</label>
              <br />
              <input type="checkbox" name="deep" id="deep" />
              <label htmlFor="deep">Deep Diver</label>
              <br />
              <input type="checkbox" name="dup" id="dup" />
              <label htmlFor="dup">Digital Underwater Photographer</label>
              <br />
              <input type="checkbox" name="dpv" id="dpv" />
              <label htmlFor="dpv">Diver Propulsion Vehicle</label>
              <br />
              <input type="checkbox" name="drift" id="drift" />
              <label htmlFor="drift">Drift Diver</label>
              <br />
              <input type="checkbox" name="dry-suit" id="dry-suit" />
              <label htmlFor="dry-suit">Dry Suit Diver</label>
              <br />
              <input type="checkbox" name="o2-provider" id="o2-provider" />
              <label htmlFor="o2-provider">Emergency Oxygen Provider</label>
              <br />
              <input type="checkbox" name="eanx" id="eanx" />
              <label htmlFor="eanx">Enriched Air Diver</label>
              <br />
              <input type="checkbox" name="equipment" id="equipment" />
              <label htmlFor="equipment">Equipment Specialist</label>
              <br />
              <input type="checkbox" name="fish-id" id="fish-id" />
              <label htmlFor="fish-id">Fish Identification</label>
              <br />
              <input type="checkbox" name="ice" id="ice" />
              <label htmlFor="ice">Ice Diver</label>
              <br />
              <input type="checkbox" name="night" id="night" />
              <label htmlFor="night">Night Diver</label>
              <br />
              <input type="checkbox" name="ppb" id="ppb" />
              <label htmlFor="ppb">Peak Performance Buoyancy</label>
              <br />
              <input type="checkbox" name="psd" id="psd" />
              <label htmlFor="psd">Public Safety Diver</label>
              <br />
              <input type="checkbox" name="s-and-r" id="s-and-r" />
              <label htmlFor="s-and-r">Search and Recovery Diver</label>
              <br />
              <input type="checkbox" name="self" id="self" />
              <label htmlFor="self">Self-Reliant Diver</label>
              <br />
              <input type="checkbox" name="sidemount" id="sidemount" />
              <label htmlFor="sidemount">Sidemount Diver</label>
              <br />
              <input type="checkbox" name="naturalist" id="naturalist" />
              <label htmlFor="naturalist">Underwater Naturalist</label>
              <br />
              <input type="checkbox" name="nav" id="nav" />
              <label htmlFor="nav">Underwater Navigator</label>
              <br />
              <input type="checkbox" name="video" id="video" />
              <label htmlFor="video">Underwater Videographer</label>
              <br />
              <input type="checkbox" name="wreck" id="wreck" />
              <label htmlFor="wreck">Wreck Diver</label>
            </fieldset>
          </div>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
