import React from "react";
import "./Login.css";

export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <form>
          <fieldset className="input-fields">
            <legend>Login</legend>
            <div className="sign-up-input">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                id="email"
                aria-label="Enter your email address"
                aira-required="true"
                required
              />
              <br />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                aria-label="Enter your password"
                aira-required="true"
                required
              />
            </div>
          </fieldset>

          <button type="submit">Login</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    );
  }
}
