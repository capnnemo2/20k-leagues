import React from "react";
import Context from "../Context";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import GetApiService from "../services/get-api-service";
import "./Login.css";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  handleLoginSuccess = (cb) => {
    GetApiService.getUser()
      .then((res) => {
        this.context.setUser(res);
      })
      .then(() => {
        // this is not working because it needs to pass the newly fetch user id
        cb();
      });
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess(() => {
          // somewhere the newly fetched user id has to be passed to this function
          this.context.getUserData();
          this.props.history.push("/log");
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmitJwtAuth}>
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
              Feel free to login as Bob: email: bob@email.com, password:
              password.
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
