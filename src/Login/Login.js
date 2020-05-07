import React from "react";
import Context from "../Context";
import "./Login.css";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/log";
    history.push(destination);
  };

  checkUser(email, password) {
    const users = this.context.users;
    let userCheck = users.find((user) => user.email === email);
    console.log(users);
    console.log("userCheck = ", userCheck);
    console.log(`check user ran`);
  }

  handleSubmitAuth = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.setState({
      error: null,
    });
    this.checkUser(email, password);
    this.context.setLoggedIn(true);
    this.handleLoginSuccess();
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmitAuth}>
          <fieldset className="input-fields">
            <legend>Login</legend>
            <div className="error">{error && <p>{error}</p>}</div>
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
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
