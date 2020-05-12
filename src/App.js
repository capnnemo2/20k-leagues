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

import PublicOnlyRoute from "./Utils/PublicOnlyRoute";
// import PrivateRoute from "./Utils/PrivateRoute";

import Context from "./Context";
import dummyStore from "./dummyStore";
import "./App.css";
// import TokenService from "./services/token-service";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: [],
    dives: [],
    certs: [],
    user: {},
    loggedIn: false,
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

  setLoggedIn = () => {
    this.setState({
      loggedIn: true,
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

  updateWishlist = (wishlist) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        wishlist,
      },
    }));
  };

  addCert = (newCert) => {
    this.setState({
      certs: [...this.state.certs, newCert],
    });
  };

  addSpecialties = (specs) => {
    for (let i = 0; i < specs.length; i++) {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          specialties: [...prevState.user.specialties, specs[i]],
        },
      }));
    }
  };

  addInstructorSpecialties = (specs) => {
    for (let i = 0; i < specs.length; i++) {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          instructorSpecialties: [
            ...prevState.user.instructorSpecialties,
            specs[i],
          ],
        },
      }));
    }
  };

  addDive = (newDive) => {
    this.setState({
      dives: [...this.state.dives, newDive],
    });
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
      user: this.state.user,
      setUser: this.setUser,
      dives: this.state.dives,
      certs: this.state.certs,
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn,
      createNewUser: this.createNewUser,
      updateWishlist: this.updateWishlist,
      addCert: this.addCert,
      addSpecialties: this.addSpecialties,
      addInstructorSpecialties: this.addInstructorSpecialties,
      addDive: this.addDive,
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
              <PublicOnlyRoute path="/sign-up" component={SignUp} />
              <PublicOnlyRoute path="/login" component={Login} />
              <Route path="/animal-finder" component={AnimalFinder} />

              {/* private endpoints */}
              <Route path="/log" component={Log} />
              <Route path="/profile" component={Profile} />
              <Route path="/add-cert" component={AddCert} />
              <Route path="/add-specialty" component={AddSpecialty} />
              <Route path="/dive-details/:dive_id" component={DiveDetails} />
              <Route path="/add-dive" component={AddDive} />
              <Route path="/edit-wishlist" component={EditWishlist} />
            </Switch>
          </main>
          <footer>&copy;2020 Ben Hernandez</footer>
        </div>
      </Context.Provider>
    );
  }
}
