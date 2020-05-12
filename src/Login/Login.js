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
    this.context.setLoggedIn();
    history.push(destination);
  };

  checkUser(email, password) {
    const users = this.context.users;
    const userCheck = users.find((user) => user.email === email);
    if (userCheck === undefined) {
      this.setState({ error: "Email does not exist" });
      console.log("user incorrect");
    } else {
      if (userCheck.password === password) {
        this.context.setUser(userCheck);
        this.context.setLoggedIn(true);
        this.handleLoginSuccess();
      } else {
        this.setState({ error: "Incorrect password" });
        console.log("incorrect password");
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.checkUser(email.value, password.value);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
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
            <p>
              Feel free to login as Bob. Email: bob@email, password: password.
            </p>
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
