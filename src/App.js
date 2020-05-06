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
import EditWishlist from "./EditWishlist/EditWishlist";
import DiveDetails from "./DiveDetails/DiveDetails";
import AddDive from "./AddDive/AddDive";

import Context from "./Context";
import dummyStore from "./dummyStore";
import "./App.css";

export default class App extends React.Component {
  state = {
    users: [],
    dives: [],
    user: "",
    wishlist: [],
    error: null,
  };

  setUsers = (users) => {
    this.setState({
      users,
      error: null,
    });
  };

  setDives = (dives) => {
    this.setState({
      dives,
      error: null,
    });
  };

  createNewUser = (newUser) => {
    this.setState({
      users: [...this.state.users, newUser],
    });
  };

  // right now just loading up everything, but with login will only need to set data for the specific user
  componentDidMount() {
    this.setUsers(dummyStore.users);
    this.setDives(dummyStore.dives);
  }

  render() {
    const value = {
      users: this.state.users,
      dives: this.state.dives,
      createNewUser: this.createNewUser,
    };
    return (
      <Context.Provider value={value}>
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
              <Route path="/edit-wishlist" component={EditWishlist} />
            </Switch>
          </main>
          <footer>&copy;2020 Ben Hernandez</footer>
        </div>
      </Context.Provider>
    );
  }
}
