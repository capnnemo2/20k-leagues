import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section>This is the home/landing page.</section>

        <section>This app is a dive log.</section>

        <section>This app is also maybe somehow an animal finder.</section>

        <section>
          Although the animals you can find might be severely limited.
        </section>
      </div>
    );
  }
}
