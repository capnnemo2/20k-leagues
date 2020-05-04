import React from "react";
import "./AddCert.css";

export default class AddCert extends React.Component {
  render() {
    return (
      <div className="AddCert">
        <section>
          Do you need to be able to update your email address? This would affect
          your login. Do I have the ability to change that?
        </section>
        <section>There should be a section for specialities.</section>
        <section>Your animal wishlist should auto-update.</section>
        <form>
          <div className="input-fields">
            <h2>Add a certification</h2>
            <fieldset className="sign-up-input">
              <legend>Select an agency</legend>
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
            <fieldset className="sign-up-input">
              <legend>Certification Level</legend>
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
            <fieldset className="sign-up-input">
              <legend>The Numbers</legend>
              <label htmlFor="cert-num">Certification Number: </label>
              <input type="text" name="cert-num" id="cert-num" required />
              <br />
              <label htmlFor="cert-date">Date certified: </label>
              <input type="month" name="cert-date" id="cert-date" required />
            </fieldset>
          </div>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
