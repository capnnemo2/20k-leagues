import React from "react";
import "./EditProfile.css";

export default class EditProfile extends React.Component {
  render() {
    return (
      <div className="EditProfile">
        <section>You need to be able to add older and newer certs.</section>
        <section>
          Do you need to be able to update your email address? This would affect
          your login. Do I have the ability to change that?
        </section>
        <section>There should be a section for specialities.</section>
        <section>Your animal wishlist should auto-update.</section>
        <form>
          <div className="input-fields">
            <h2>Add a certificaiton</h2>
            <fieldset>
              <legend>Select an agency</legend>
              <label>
                <input type="radio" name="agency" />
                PADI
              </label>
              <br />
              <label>
                <input type="radio" name="agency" />
                SSI
              </label>
              <br />
              <label>
                <input type="radio" name="agency" />
                Other:
              </label>
              {/* is there a better way to write-in for other? */}
              <label htmlFor="other"> </label>
              <input type="text" name="other" />
            </fieldset>
            <fieldset>
              <legend>Certification Level</legend>
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
          </div>
        </form>
      </div>
    );
  }
}
