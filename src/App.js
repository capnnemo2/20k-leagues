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
import UpdateSpecialties from "./UpdateSpecialties/UpdateSpecialties";
import UpdateInstrSpecs from "./UpdateInstrSpecs/UpdateInstrSpecs";
import EditWishlist from "./EditWishlist/EditWishlist";
import DiveDetails from "./DiveDetails/DiveDetails";
import AddDive from "./AddDive/AddDive";
import EditDive from "./EditDive/EditDive";
import AnimalFinder from "./AnimalFinder/AnimalFinder";

import PublicOnlyRoute from "./Utils/PublicOnlyRoute";
import PrivateRoute from "./Utils/PrivateRoute";
import Context from "./Context";
// import dummyStore from "./dummyStore";
import "./App.css";
// import TokenService from "./services/token-service";
// import IdleService from './services/idle-service'
// import AuthApiService from './services/auth-api-service'
import GetApiService from "./services/get-api-service";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: [],
    dives: [],
    certs: [],
    user: {},
    loggedIn: false,
    allAnimals: [],
    countries: [],
    animalTracker: [],
    specialties: [],
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

  setCountries = (countries) => {
    this.setState({
      countries,
    });
  };

  setCerts = (certs) => {
    this.setState({
      certs,
      error: null,
    });
  };

  setAllAnimals = (allAnimals) => {
    this.setState({
      allAnimals,
      error: null,
    });
  };

  setSpecialties = (specialties) => {
    this.setState({
      specialties,
      error: null,
    });
  };

  setAnimalTracker = (animalTracker) => {
    this.setState({
      animalTracker,
      error: null,
    });
  };

  setLoggedIn = () => {
    this.setState({
      loggedIn: true,
    });
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };

  createNewUser = (newUser) => {
    this.setState({
      users: [...this.state.users, newUser],
    });
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

  updateSpecialties = (newSpecs) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        specialties: newSpecs,
      },
    }));
  };

  updateInstrSpecs = (newInstrSpecs) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        instructorSpecialties: newInstrSpecs,
      },
    }));
  };

  addDive = (newDive) => {
    this.setState({
      dives: [...this.state.dives, newDive],
    });
  };

  updateWishlistFulfilled = (animalsSpotted) => {
    let newAnimalsSpotted = animalsSpotted.filter(
      (a) => !this.state.user.wishlistFulfilled.includes(a)
    );

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        wishlistFulfilled: [].concat(
          prevState.user.wishlistFulfilled,
          newAnimalsSpotted
        ),
      },
    }));
  };

  updateAnimalTracker = (newAnimals) => {
    this.setState({
      animalTracker: [].concat(this.state.animalTracker, newAnimals),
    });
  };

  deleteDive = (dive_id) => {
    const newDives = this.state.dives.filter(
      (dive) => Number(dive.id) !== Number(dive_id)
    );
    this.setState({
      dives: newDives,
    });
  };

  deleteCert = (certId) => {
    const newCerts = this.state.certs.filter(
      (cert) => Number(cert.id) !== Number(certId)
    );
    this.setState({
      certs: newCerts,
    });
  };

  updateDive = (newDive, diveId) => {
    const newDives = this.state.dives.map((dive) =>
      dive.id === diveId ? newDive : dive
    );
    this.setState({
      dives: newDives,
    });
  };

  // right now just loading up everything
  componentDidMount() {
    // does each of these need a catch?
    GetApiService.getCountries().then(this.setCountries);
    GetApiService.getAnimals().then(this.setAllAnimals);
    GetApiService.getSpecialties().then(this.setSpecialties);

    GetApiService.getAllCerts().then(this.setCerts);
    GetApiService.getAllDives().then(this.setDives);
    GetApiService.getAnimalsTracked().then(this.setAnimalTracker);

    // this.setUsers(dummyStore.users);

    // this.setDives(dummyStore.dives);
    // this.setCerts(dummyStore.certs);
    // this.setAnimalTracker(dummyStore.animalTracker);
    // this.setAllAnimals(dummyStore.animals);
    // this.setSpecialties(dummyStore.specialties);
  }

  render() {
    const value = {
      users: this.state.users,
      user: this.state.user,
      setUser: this.setUser,
      dives: this.state.dives,
      certs: this.state.certs,
      loggedIn: this.state.loggedIn,
      allAnimals: this.state.allAnimals,
      countries: this.state.countries,
      animalTracker: this.state.animalTracker,
      specialties: this.state.specialties,
      setLoggedIn: this.setLoggedIn,
      createNewUser: this.createNewUser,
      updateWishlist: this.updateWishlist,
      addCert: this.addCert,
      updateSpecialties: this.updateSpecialties,
      updateInstrSpecs: this.updateInstrSpecs,
      addDive: this.addDive,
      updateWishlistFulfilled: this.updateWishlistFulfilled,
      updateAnimalTracker: this.updateAnimalTracker,
      deleteDive: this.deleteDive,
      deleteCert: this.deleteCert,
      updateDive: this.updateDive,
      logOut: this.logOut,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <Nav />
          <main>
            <Header />
            <Switch>
              {/* public routes */}
              <Route exact path="/" component={Home} />
              <PublicOnlyRoute path="/sign-up" component={SignUp} />
              <PublicOnlyRoute path="/login" component={Login} />
              <Route path="/animal-finder" component={AnimalFinder} />

              {/* private routes */}
              <PrivateRoute path="/log" component={Log} />
              <PrivateRoute path="/add-cert" component={AddCert} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute
                path="/update-specialties"
                component={UpdateSpecialties}
              />
              <PrivateRoute
                path="/update-instr-specs"
                component={UpdateInstrSpecs}
              />
              <PrivateRoute
                path="/dive-details/:dive_id"
                component={DiveDetails}
              />
              <PrivateRoute path="/add-dive" component={AddDive} />
              <PrivateRoute path="/edit-dive/:dive_id" component={EditDive} />
              <PrivateRoute path="/edit-wishlist" component={EditWishlist} />

              {/* public route */}
              {/* <Route component={NotFoundPage} /> */}
            </Switch>
          </main>
          <footer>&copy;2020 Ben Hernandez</footer>
        </div>
      </Context.Provider>
    );
  }
}
