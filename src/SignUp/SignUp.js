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
            <fieldset className="sign-up-input">
              <legend>Account information</legend>
              <div>
                <label htmlFor="first_name">First Name: </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  aria-label="Enter your first name"
                  aria-required="true"
                  placeholder="Barbara"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  aria-label="Enter your email address"
                  aria-required="true"
                  placeholder="barb@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-label="Create your password"
                  aria-required="true"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Current Certification Level</legend>
              <fieldset>
                <legend>Agency</legend>
                <label>
                  <input type="radio" name="agency" required />
                  PADI
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" required />
                  SSI
                </label>
                <br />
                <label>
                  <input type="radio" name="agency" required />
                  Other:
                </label>
                {/* is there a better way to write-in for other? */}
                <label htmlFor="other"> </label>
                <input type="text" name="other" />
              </fieldset>
              <fieldset>
                <legend>Certification</legend>
                <label>
                  <input type="radio" name="cert" required />
                  Scuba Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Open Water Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Advanced Open Water Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Rescue Diver
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Divemaster
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Assistant Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Open Water Scuba Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Master Scuba Diver Trainer
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  IDC Staff Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Master Scuba Instructor
                </label>
                <br />
                <label>
                  <input type="radio" name="cert" required />
                  Course Director
                </label>
              </fieldset>
              <fieldset>
                <legend>The Numbers</legend>
                <label htmlFor="cert-num">Certification Number: </label>
                <input type="text" name="cert-num" id="cert-num" required />
                <br />
                <label htmlFor="cert-date">Date certified: </label>
                <input type="month" name="cert-date" id="cert-date" required />
              </fieldset>
            </fieldset>
            <fieldset className="sign-up-input">
              <legend>Animal Wishlist</legend>
              Select the animals that you wish to see!
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

          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
