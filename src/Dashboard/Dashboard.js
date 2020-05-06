import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import dummyStore from "../dummyStore";

export default class Dashboard extends React.Component {
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
    return avg + " ft.";
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

  render() {
    const totalDives = dummyStore.dives.length;
    // this logic to find the user will be different once login is established
    const user = dummyStore.users[0];
    const userId = user.id;
    const dives = dummyStore.dives.filter(
      (d) => Number(d.user_id) === Number(userId)
    );
    return (
      <div className="Dashboard">
        <section>
          <h2>{user.first_name}'s Dive Log</h2>
          <p>
            Access your profile:
            <Link to="/profile"> My Profile</Link>
          </p>
        </section>
        <p>filter the dive list</p>
        <Link to="/add-dive">Add new dive</Link>{" "}
        <fieldset>
          <legend>Dives</legend>
          <ul>
            {dives.map((dive) => (
              <li key={dive.id}>
                <ul>
                  {/* dive number will have to be calculated by counting all dives with the specific user_id, not just dive.id because there will be dives from multiple users in the same db. somehow keep them chronological too */}
                  <li>Dive #{dive.id}</li>
                  <li>Date: {dive.date}</li>
                  <li>Country: {dive.country}</li>
                  <li>Site: {dive.diveSite}</li>
                  <li>Rating: {dive.rating} seastars</li>
                  <li>
                    <Link to={`/dive-details/${dive.id}`}>Details</Link>{" "}
                  </li>
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
          <ul>
            {user.wishlistFulfilled.map((animal) => (
              <li key={animal}>{animal}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Seeking</legend>
          <ul>
            {user.wishlist.map((animal) => (
              <li key={animal}>{animal}</li>
            ))}
          </ul>
        </fieldset>
      </div>
    );
  }
}
