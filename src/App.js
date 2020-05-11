import React from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Log from "./Log/Log";
import Profile from "./Profile/Profile";
import AddCert from "./AddCert/AddCert";
import AddSpecialty from "./AddSpecialty/AddSpecialty";
import EditWishlist from "./EditWishlist/EditWishlist";
import DiveDetails from "./DiveDetails/DiveDetails";
import AddDive from "./AddDive/AddDive";
import AnimalFinder from "./AnimalFinder/AnimalFinder";

import Context from "./Context";
import dummyStore from "./dummyStore";
import "./App.css";
import TokenService from "./services/token-service";

export default class App extends React.Component {
  state = {
    users: [],
    dives: [],
    certs: [],
    user: [],
    loggedIn: TokenService.hasAuthToken() ? true : false,
    error: null,
  };

  setUsers = (users) => {
    this.setState({
      users,
      error: null,
    });
  };

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  setDives = (dives) => {
    this.setState({
      dives,
      error: null,
    });
  };

  setCerts = (certs) => {
    this.setState({
      certs,
      error: null,
    });
  };

  createNewUser = (newUser) => {
    console.log("create new user ran in app");
    this.setState({
      users: [...this.state.users, newUser],
    });
    console.log("new user: ", newUser);
    console.log("hopefully new users: ", this.state.users);
  };

  setLoggedIn = (status) => {
    this.setState({
      loggedIn: status,
    });
  };

  updateWishlist = (wishlist) => {
    let newUser = [...this.context.user, wishlist];
    console.log(newUser);
  };

  // right now just loading up everything, but with login will only need to set data for the specific user
  componentDidMount() {
    this.setUsers(dummyStore.users);
    this.setDives(dummyStore.dives);
    this.setCerts(dummyStore.certs);
    // this.setUser(dummyStore.users[0]);
  }

  render() {
    const value = {
      users: this.state.users,
      dives: this.state.dives,
      certs: this.state.certs,
      user: this.state.user,
      createNewUser: this.createNewUser,
      setLoggedIn: this.setLoggedIn,
      updateWishlist: this.updateWishlist,
      setUser: this.setUser,
    };
    return (
      <Context.Provider value={value}>
        <div className="App">
          <Nav />
          <main>
            <Header />
            <Switch>
              {/* public endpoints */}
              <Route exact path="/" component={Home} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/login" component={Login} />

              {/* private endpoints */}
              <Route path="/log" component={Log} />
              <Route path="/profile" component={Profile} />
              <Route path="/add-cert" component={AddCert} />
              <Route path="/add-specialty" component={AddSpecialty} />
              <Route path="/dive-details/:dive_id" component={DiveDetails} />
              <Route path="/add-dive" component={AddDive} />
              <Route path="/edit-wishlist" component={EditWishlist} />
              <Route path="/animal-finder" component={AnimalFinder} />
            </Switch>
          </main>
          <footer>&copy;2020 Ben Hernandez</footer>
        </div>
      </Context.Provider>
    );
  }
}
