import React from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import DiveDetails from "./DiveDetails/DiveDetails";

import "./App.css";

function App() {
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
          <Route path="/dive-details" component={DiveDetails} />
        </Switch>
      </main>
      <footer>&copy;2020 Ben Hernandez</footer>
    </div>
  );
}

export default App;
