import React from "react";
import "./SignUp.css";

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="SignUp">
        <header>
          <h2>Sign Up</h2>
        </header>
        <form>
          <div className="input-fields">
            <fieldset>
              <legend>Account information</legend>
              <div className="sign-up-input">
                <label htmlFor="first_name">First Name: </label>
                <input
                  type="text"
                  name="first_name"
                  aria-label="Enter your first name"
                  aria-required="true"
                  placeholder="Barbara"
                  required
                />
              </div>

              <div className="sign-up-input">
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  aria-label="Enter your email address"
                  aria-required="true"
                  placeholder="barb@email.com"
                  required
                />
              </div>

              <div className="sign-up-input">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  aria-label="Create your password"
                  aria-required="true"
                  required
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Current Certification Level</legend>
              <fieldset>
                <legend>Agency</legend>
                <label>
                  <input type="radio" name="agency" />
                  PADI
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" />
                  NAUI
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" />
                  CSS
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" />
                  CMAS
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" />
                  BSAC
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" />
                  Other
                </label>
                <br />
                <label htmlFor="other">If 'other', please specify: </label>
                <input type="text" name="other" />
              </fieldset>
              <fieldset>
                <legend>Certification</legend>
                <label>
                  <input type="radio" name="cert" />
                  Scuba Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Open Water Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Advanced Open Water Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Rescue Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Divemaster
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Assistant Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Open Water Scuba Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Master Scuba Diver Trainer
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  IDC Staff Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Master Scuba Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" />
                  Course Director
                </label>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>Animal Wishlist</legend>
              Check what you've already seen!
              <br />
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
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
