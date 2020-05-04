import React from "react";
import "./AddDive.css";

export default class AddDive extends React.Component {
  render() {
    return (
      <div className="AddDive">
        <header>
          <h2>Log a New Dive</h2>
        </header>
        <form>
          <div className="new-dive-form">
            <fieldset>
              <legend>Essentials</legend>
              <div>
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  name="date"
                  aria-label="Enter the date of the dive"
                  aria-required="true"
                  required
                />
              </div>
              <div>
                <label htmlFor="site">Dive site: </label>
                <input
                  type="text"
                  name="site"
                  aria-label="Enter the name of the dive site"
                  aria-required="true"
                  required
                />
              </div>
              <div>
                <label htmlFor="country">Country: </label>
                <input
                  type="text"
                  name="country"
                  aria-label="Enter the country of the dive"
                  aira-required="true"
                  required
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Dive Stats</legend>
              <div>
                <label htmlFor="depth">Max depth (ft): </label>
                <input
                  type="text"
                  name="depth"
                  aria-label="Enter the maximum depth"
                />
              </div>
              <div>
                <label htmlFor="dive-time">Duration (min): </label>
                <input
                  type="number"
                  name="dive-time"
                  aria-label="Enter the dive duration"
                />
              </div>
              <div>
                <label htmlFor="temp">Water Temperature (F): </label>
                <input
                  type="number"
                  name="temp"
                  aria-label="Enter the water temperature"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>People</legend>
              <div>
                <label htmlFor="shop">Dive shop: </label>
                <input
                  type="text"
                  name="shop"
                  aria-label="Enter the dive shop"
                />
              </div>
              <div>
                <label htmlFor="guide">Divemaster/Guide: </label>
                <input
                  type="text"
                  name="guide"
                  aria-label="Enter your dive guide"
                />
              </div>
              <div>
                <label htmlFor="buddy">Buddy: </label>
                <input
                  type="text"
                  name="buddy"
                  aria-label="Enter your dive buddy"
                />
              </div>
            </fieldset>

            <div>
              <fieldset>
                <legend>Visibility</legend>
                <label>
                  <input type="radio" name="viz"></input>I couldn't see my own
                  fins
                </label>
                <br />
                <label>
                  <input type="radio" name="viz"></input>
                  My dive buddy was a vague shadow
                </label>
                <br />
                <label>
                  <input type="radio" name="viz"></input>
                  Anything beyond twenty feet was a theory
                </label>
                <br />
                <label>
                  <input type="radio" name="viz"></input>I could see just fine
                </label>
                <br />
                <label>
                  <input type="radio" name="viz"></input>I could see two days
                  into the future
                </label>
              </fieldset>
            </div>
            <fieldset>
              <legend>Sights</legend>
              <div>
                <label htmlFor="description">Description: </label>
                <textarea
                  name="description"
                  rows="4"
                  cols="50"
                  aria-label="Describe your dive"
                />
              </div>
              <fieldset>
                <legend>Animal Wishlist</legend>
                <label>
                  <input type="checkbox" name="whale-shark" />
                  Whale Shark
                </label>
                <br />
                <label>
                  <input type="checkbox" name="mola-mola" />
                  Mola Mola
                </label>
                <br />
                <label>
                  <input type="checkbox" name="thresher" />
                  Thresher Shark
                </label>
                <br />
                <label>
                  <input type="checkbox" name="hammer" />
                  Hammerhead Shark
                </label>
                <br />
                <label>
                  <input type="checkbox" name="white" />
                  Great White Shark
                </label>
                <br />
                <label>
                  <input type="checkbox" name="tiger" />
                  Tiger Shark
                </label>
                <br />
                <label>
                  <input type="checkbox" name="manatee" />
                  Manatee
                </label>
                <br />
                <label>
                  <input type="checkbox" name="manta" />
                  Manta Ray
                </label>
                <br />
                <label>
                  <input type="checkbox" name="seahorse" />
                  Seahorse
                </label>
              </fieldset>
            </fieldset>

            <fieldset>
              <legend>Dive Type</legend>
              <label>
                <input type="radio" name="dive-type" />
                Shore dive
              </label>

              <label>
                <input type="radio" name="dive-type" />
                Boat dive
              </label>

              <label>
                <input type="checkbox" name="drift" />
                Drift dive
              </label>
            </fieldset>
          </div>
          <button type="submit">Log dive</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}