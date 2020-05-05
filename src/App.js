import React from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import AddCert from "./AddCert/AddCert";
import AddSpecialty from "./AddSpecialty/AddSpecialty";
import DiveDetails from "./DiveDetails/DiveDetails";
import AddDive from "./AddDive/AddDive";

import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/add-cert" component={AddCert} />
            <Route path="/add-specialty" component={AddSpecialty} />
            <Route path="/dive-details/:dive_id" component={DiveDetails} />
            <Route path="/add-dive" component={AddDive} />
          </Switch>
        </main>
        <footer>&copy;2020 Ben Hernandez</footer>
      </div>
    );
  }
}
