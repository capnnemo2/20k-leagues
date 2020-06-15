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
import "./App.css";
import TokenService from "./services/token-service";
// import IdleService from './services/idle-service'
// import AuthApiService from './services/auth-api-service'
import GetApiService from "./services/get-api-service";
import NonGetApiService from "./services/non-get-api-service";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: [],
    dives: [],
    certs: [],
    user: {},
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

  createNewUser = (newUser) => {
    this.setState({
      users: [...this.state.users, newUser],
    });
  };

  updateUser = (newUser) => {
    this.setState({
      user: newUser,
    });
  };

  updateWishlist = (wishlist) => {
    const newUser = this.state.user;
    newUser.wishlist = wishlist;

    NonGetApiService.updateUser(newUser.id, newUser)
      .then(this.updateUser(newUser))
      .catch((err) => console.log(err));
  };

  addCert = (newCert) => {
    this.setState({
      certs: [...this.state.certs, newCert],
    });
  };

  updateSpecialties = (newSpecs) => {
    const newUser = this.state.user;
    newUser.specialties = newSpecs;

    NonGetApiService.updateUser(newUser.id, newUser)
      .then(this.updateUser(newUser))
      .catch((err) => console.log(err));
  };

  updateInstrSpecs = (newInstrSpecs) => {
    const newUser = this.state.user;
    newUser.instructor_specialties = newInstrSpecs;

    NonGetApiService.updateUser(newUser.id, newUser)
      .then(this.updateUser(newUser))
      .catch((err) => console.log(err));
  };

  addDive = (newDive) => {
    this.setState({
      dives: [...this.state.dives, newDive],
    });
  };

  addToWishlistFulfilled = (animals_spotted) => {
    let newAnimalsSpotted = animals_spotted.filter(
      (a) => !this.state.user.wishlist_fulfilled.includes(a)
    );
    const newUser = this.state.user;
    newUser.wishlist_fulfilled = [].concat(
      newUser.wishlist_fulfilled,
      newAnimalsSpotted
    );

    NonGetApiService.updateUser(newUser.id, newUser)
      .then(this.updateUser(newUser))
      .catch((err) => console.log(err));
  };

  updateWishlistFulfilled = (newWishlistFulfilled) => {
    const newUser = this.state.user;
    newUser.wishlist_fulfilled = newWishlistFulfilled;

    NonGetApiService.updateUser(newUser.id, newUser)
      .then(this.updateUser(newUser))
      .catch((err) => console.log(err));
  };

  updateAnimalsTracked = (allAnimalsTracked) => {
    this.setState({
      animalTracker: allAnimalsTracked,
    });
  };

  updateAnimalTracker = (newAnimals) => {
    NonGetApiService.addAnimalsTracked(newAnimals)
      .then((res) => {
        const animalsTracked = [].concat(this.state.animalTracker, res);
        this.updateAnimalsTracked(animalsTracked);
      })
      .catch((err) => console.log(err));
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

  updateDive = (diveId, newDive) => {
    const newDives = this.state.dives.map((dive) =>
      dive.id === diveId ? newDive : dive
    );
    this.setState({
      dives: newDives,
    });
  };

  componentDidMount() {
    if (TokenService.getAuthToken()) {
      GetApiService.getUser().then((res) => {
        this.getUserData(res);
      });
    }
    GetApiService.getCountries().then(this.setCountries).catch(this.catchError);
    GetApiService.getAnimals().then(this.setAllAnimals).catch(this.catchError);
    GetApiService.getSpecialties()
      .then(this.setSpecialties)
      .catch(this.catchError);

    GetApiService.getAnimalsTracked()
      .then(this.setAnimalTracker)
      .catch(this.catchError);
  }

  getUserData = (user) => {
    this.setUser(user);
    GetApiService.getUserCerts(user.id)
      .then(this.setCerts)
      .catch(this.catchError);
    GetApiService.getUserDives(user.id)
      .then(this.setDives)
      .catch(this.catchError);
  };

  catchError = (err) => {
    console.error(err);
  };

  render() {
    const value = {
      users: this.state.users,
      user: this.state.user,
      setUser: this.setUser,
      dives: this.state.dives,
      certs: this.state.certs,
      allAnimals: this.state.allAnimals,
      countries: this.state.countries,
      animalTracker: this.state.animalTracker,
      specialties: this.state.specialties,
      createNewUser: this.createNewUser,
      updateWishlist: this.updateWishlist,
      addCert: this.addCert,
      updateSpecialties: this.updateSpecialties,
      updateInstrSpecs: this.updateInstrSpecs,
      addDive: this.addDive,
      addToWishlistFulfilled: this.addToWishlistFulfilled,
      updateAnimalTracker: this.updateAnimalTracker,
      deleteDive: this.deleteDive,
      deleteCert: this.deleteCert,
      updateDive: this.updateDive,
      getUserData: this.getUserData,
      updateWishlistFulfilled: this.updateWishlistFulfilled,
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
