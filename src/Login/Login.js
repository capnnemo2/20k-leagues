import React from "react";
import "./Login.css";

export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <header>
          <h2>Login</h2>
        </header>
        <form>
          <div className="input-fields">
            <div className="login-input">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                aria-label="Enter your email address"
                aira-required="true"
                required
              />
            </div>

            <div className="login-input">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                aria-label="Enter your password"
                aira-required="true"
                required
              />
            </div>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
