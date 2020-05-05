import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import dummyStore from "../dummyStore";

export default class Dashboard extends React.Component {
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
    const user = dummyStore.users[0];
    return (
      <div className="Dashboard">
        <section>
          <h2>User_name's Dive Log</h2>
          <p>
            Access your account profile:
            <Link to="/profile"> My Profile</Link>
          </p>
        </section>
        <section>
          <p>filter the dive list</p>
          <Link to="/add-dive">Add new dive</Link>{" "}
          <ul>
            <li>
              <ul>
                {/* need a function to reverse the order so that most recent dive is listed first */}
                <li>Dive #{dummyStore.dives[1].id}</li>
                <li>Date: {dummyStore.dives[1].date}</li>
                <li>Country: {dummyStore.dives[1].country}</li>
                <li>Site: {dummyStore.dives[1].diveSite}</li>
                <li>Rating: {dummyStore.dives[1].rating} seastars</li>
                <li>
                  <Link to={`/dive-details/${dummyStore.dives[1].id}`}>
                    Details
                  </Link>{" "}
                </li>
              </ul>
            </li>
            <br />
            <li>
              <ul>
                <li>Dive #{dummyStore.dives[0].id}</li>
                <li>Date: {dummyStore.dives[0].date}</li>
                <li>Country: {dummyStore.dives[0].country}</li>
                <li>Site: {dummyStore.dives[0].diveSite}</li>
                <li>Rating: {dummyStore.dives[0].rating} seastars</li>
                <li>
                  <Link to={`/dive-details/${dummyStore.dives[0].id}`}>
                    Details
                  </Link>{" "}
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          Your dives will be listed here, perhaps as cards, maybe just a plain
          list? They will only display some basic info here: dive #,
          location/country, date, site. If you click, it will take you to see
          more details.
          <Link to="/dive-details"> Example</Link>
        </section>

        <section>
          This section will just have simple statistics: total # of dives, total
          time under water deepest dive, longest dive, etc.
          <h2>Dive Stats</h2>
          <ul>
            <li>Total Dives: {totalDives}</li>
            <li>
              <ul>
                <li>Deepest Dive: {this.findDeepestDive(dummyStore.dives)}</li>
                <li>
                  Avg Dive Depth: {this.findAvgDiveDepth(dummyStore.dives)}
                </li>
                <li>
                  Shallowest Dive: {this.findShallowestDive(dummyStore.dives)}{" "}
                </li>
              </ul>
            </li>
            <br />
            <li>
              <ul>
                <li>Longest Dive: {this.findLongestDive(dummyStore.dives)}</li>
                <li>Avg Dive Time: {this.findAvgDiveTime(dummyStore.dives)}</li>
                <li>
                  Shortest Dive: {this.findShortestDive(dummyStore.dives)}
                </li>
                <li>
                  Total Time Spent Underwater:{" "}
                  {this.findTotalDiveTime(dummyStore.dives)}
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          When you register you choose which animals will appear on your animal
          wishlist. You can edit that via your profile. Here we will display
          your personal wishlist and animals that you've seen will be checked
          off in some exciting way.
          <h3>Spotted in the wild!</h3>
          <ul>
            {user.wishlist
              .filter((animal) => animal.seen === true)
              .map((animal) => (
                <li key={animal.animal}>{animal.animal}</li>
              ))}
          </ul>
          <h3>Still searching for...</h3>
          <ul>
            {user.wishlist
              .filter((animal) => animal.seen === false)
              .map((animal) => (
                <li key={animal.animal}>{animal.animal}</li>
              ))}
          </ul>
        </section>
      </div>
    );
  }
}
