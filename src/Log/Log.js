import React from "react";
import { Link } from "react-router-dom";
import dummyStore from "../dummyStore";
import LogFilters from "../LogUtils/LogFilters";
import Context from "../Context";
import "./Log.css";

export default class Log extends React.Component {
  static contextType = Context;

  state = {
    searchBy: "",
    country: "",
    animal: "",
  };

  // filter handlers
  updateSearchBy = (search) => {
    this.setState({
      searchBy: search,
      country: "",
      animal: "",
    });
  };

  updateCountry = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  updateAnimal = (e) => {
    this.setState({
      animal: e.target.value,
    });
  };

  // dive depth handlers
  findDeepestDive(arr) {
    let diveDepths = [];
    for (let i = 0; i < arr.length; i++) {
      diveDepths.push(arr[i].maxDepth);
    }
    return (
      diveDepths.reduce(function (prevLargestNum, currLargestNum) {
        return currLargestNum > prevLargestNum
          ? currLargestNum
          : prevLargestNum;
      }) + " ft."
    );
  }

  findAvgDiveDepth(arr) {
    let diveDepths = [];
    for (let i = 0; i < arr.length; i++) {
      diveDepths.push(arr[i].maxDepth);
    }
    let sum = diveDepths.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;
    return avg.toFixed(1) + " ft.";
  }

  findShallowestDive(arr) {
    let diveDepths = [];
    for (let i = 0; i < arr.length; i++) {
      diveDepths.push(arr[i].maxDepth);
    }
    return (
      diveDepths.reduce(function (prevSmallestNum, currSmallestNum) {
        return currSmallestNum < prevSmallestNum
          ? currSmallestNum
          : prevSmallestNum;
      }) + " ft."
    );
  }

  // dive time handlers
  findLongestDive(arr) {
    let diveTimes = [];
    for (let i = 0; i < arr.length; i++) {
      diveTimes.push(arr[i].duration);
    }
    return (
      diveTimes.reduce(function (prevLargestNum, currLargestNum) {
        return currLargestNum > prevLargestNum
          ? currLargestNum
          : prevLargestNum;
      }) + " min."
    );
  }

  findAvgDiveTime(arr) {
    let diveTimes = [];
    for (let i = 0; i < arr.length; i++) {
      diveTimes.push(arr[i].duration);
    }
    let sum = diveTimes.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;
    return avg + " min.";
  }

  findShortestDive(arr) {
    let diveTimes = [];
    for (let i = 0; i < arr.length; i++) {
      diveTimes.push(arr[i].duration);
    }
    return (
      diveTimes.reduce(function (prevSmallestNum, currSmallestNum) {
        return currSmallestNum < prevSmallestNum
          ? currSmallestNum
          : prevSmallestNum;
      }) + " min."
    );
  }

  findTotalDiveTime(arr) {
    let diveTimes = [];
    for (let i = 0; i < arr.length; i++) {
      diveTimes.push(arr[i].duration);
    }
    const sum = diveTimes.reduce((a, b) => a + b, 0);
    return this.convertTime(sum);
  }

  convertTime(num) {
    let days = Math.floor(num / 1440);
    let hours = Math.floor((num - days * 1440) / 60);
    let minutes = num % 60;
    if (days > 0) {
      return days + " days : " + hours + " hr : " + minutes + " min.";
    } else {
      return hours + " hr : " + minutes + " min.";
    }
  }

  renderAnimalsSeen = (user) => {
    return user.wishlistFulfilled.map((animal) => (
      <li key={animal}>{animal}</li>
    ));
  };

  renderAnimalsToSee = (user) => {
    let animalsToSee = [];
    for (let i = 0; i < user.wishlistFulfilled.length; i++) {
      const animal = user.wishlist.filter(
        (animal) => animal !== user.wishlistFulfilled[i]
      );
      animalsToSee = animal;
    }
    return animalsToSee.map((animal) => <li key={animal}>{animal}</li>);
  };

  render() {
    const user = this.context.user;

    const userId = user.id;
    const dives = this.context.dives.filter(
      (d) => Number(d.user_id) === Number(userId)
    );
    // they aren't truly in order, just reverse order of how they were entered
    const divesInOrder = dives.sort(function (a, b) {
      return a.date - b.date;
    });
    console.log(divesInOrder);
    const totalDives = dives.length;

    return user ? (
      <div className="Log">
        <section>
          <h2>{user.first_name}'s Dive Log</h2>
          <p>
            Access your
            <Link to="/profile"> profile</Link>
          </p>
        </section>
        <LogFilters
          updateSearchBy={this.updateSearchBy}
          updateCountry={this.updateCountry}
          updateAnimal={this.updateAnimal}
          searchBy={this.state.searchBy}
        />
        <Link to="/add-dive">Add new dive</Link>
        <fieldset>
          <legend>Dives</legend>
          <ul>
            {/* dives should be displayed in order of most recent. currently this just reverses the order they were input. what if a user (me) inputs dives from the past, out of order */}
            {dives
              .slice(0)
              .reverse()
              .map((dive) => (
                <li key={dive.id}>
                  <ul>
                    {/* <li>Dive #{dive.id}</li> */}
                    <li>{dive.date}</li>
                    <li>{dive.country}</li>
                    <li>{dive.diveSite}</li>
                    <li>{dive.rating} seastars</li>
                    <li>
                      <Link to={`/dive-details/${dive.id}`}>Details</Link>
                    </li>
                    <br />
                  </ul>
                </li>
              ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Statistics</legend>
          <ul>
            <li>Total Dives: {totalDives}</li>
            <li>Deepest Dive: {this.findDeepestDive(dummyStore.dives)}</li>
            <li>Avg Dive Depth: {this.findAvgDiveDepth(dummyStore.dives)}</li>
            <li>
              Shallowest Dive: {this.findShallowestDive(dummyStore.dives)}{" "}
            </li>
            <li>Longest Dive: {this.findLongestDive(dummyStore.dives)}</li>
            <li>Avg Dive Time: {this.findAvgDiveTime(dummyStore.dives)}</li>
            <li>Shortest Dive: {this.findShortestDive(dummyStore.dives)}</li>
            <li>
              Total Time Spent Underwater:{" "}
              {this.findTotalDiveTime(dummyStore.dives)}
            </li>
          </ul>
        </fieldset>
        <p>
          When you register you choose which animals will appear on your animal
          wishlist. You can edit that via your profile. Here we will display
          your personal wishlist and animals that you've seen will be checked
          off in some exciting way.
        </p>
        <fieldset>
          <legend>Spotted!</legend>
          <ul>{this.renderAnimalsSeen(user)}</ul>
        </fieldset>
        <fieldset>
          <legend>Seeking</legend>
          <ul>{this.renderAnimalsToSee(user)}</ul>
        </fieldset>
      </div>
    ) : (
      "Loading..."
    );
  }
}
