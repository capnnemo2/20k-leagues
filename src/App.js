import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </main>
      <footer>&copy;2020 Ben Hernandez</footer>
    </div>
  );
}

export default App;
