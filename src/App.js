import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Header />

        <section>Section 1</section>

        <section>Section 2</section>

        <section>Section 3</section>

        <section>Section 4</section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
