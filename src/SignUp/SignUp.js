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
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
