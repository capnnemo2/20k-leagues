import React from "react";
import { Link, Redirect } from "react-router-dom";
import LogFilters from "../LogUtils/LogFilters";
import Context from "../Context";
import TokenService from "../services/token-service";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Log.css";

export default class Log extends React.Component {
  static contextType = Context;

  state = {
    searchBy: "all",
    country: "",
    animal: "",
    site: "",
    shop: "",
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

  updateSite = (e) => {
    this.setState({
      site: e.target.value,
    });
  };

  updateShop = (e) => {
    this.setState({
      shop: e.target.value,
    });
  };

  // dive depth handlers
  findDeepestDive(arr) {
    let diveDepths = arr.map((dive) => Number(dive.max_depth));

    return (
      diveDepths.reduce(function (prevLargestNum, currLargestNum) {
        return currLargestNum > prevLargestNum
          ? currLargestNum
          : prevLargestNum;
      }) + " ft."
    );
  }

  findAvgDiveDepth(arr) {
    let diveDepths = arr.map((dive) => Number(dive.max_depth));

    let sum = diveDepths.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;
    return avg.toFixed(1) + " ft.";
  }

  findShallowestDive(arr) {
    let diveDepths = arr.map((dive) => Number(dive.max_depth));

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
    let diveTimes = arr.map((dive) => Number(dive.duration));
    return (
      diveTimes.reduce(function (prevLargestNum, currLargestNum) {
        return currLargestNum > prevLargestNum
          ? currLargestNum
          : prevLargestNum;
      }) + " min."
    );
  }

  findAvgDiveTime(arr) {
    let diveTimes = arr.map((dive) => Number(dive.duration));

    let sum = diveTimes.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;
    return avg.toFixed(1) + " min.";
  }

  findShortestDive(arr) {
    let diveTimes = arr.map((dive) => Number(dive.duration));
    return (
      diveTimes.reduce(function (prevSmallestNum, currSmallestNum) {
        return currSmallestNum < prevSmallestNum
          ? currSmallestNum
          : prevSmallestNum;
      }) + " min."
    );
  }

  findTotalDiveTime(arr) {
    let diveTimes = arr.map((dive) => Number(dive.duration));
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

  // wishlist handlers
  renderAnimalsSeen = (user) => {
    return this.context.allAnimals
      .filter((animal) => user.wishlist_fulfilled.includes(animal.id))
      .map((animal, i) => <li key={i}>{animal.animal}</li>);
  };

  renderAnimalsToSee = (user) => {
    return this.context.allAnimals
      .filter((animal) => user.wishlist.includes(animal.id))
      .filter((animal) => !user.wishlist_fulfilled.includes(animal.id))
      .map((animal, i) => <li key={i}>{animal.animal}</li>);
  };

  renderWishlist = (user) => {
    return this.context.allAnimals.length > 0 && user.wishlist
      ? this.context.allAnimals
          .filter((animal) => user.wishlist.includes(animal.id))
          .map((animal, i) => (
            <li
              key={i}
              className={
                user.wishlist_fulfilled.includes(animal.id) ? "fulfilled" : ""
              }
            >
              {animal.animal}
            </li>
          ))
      : [];
  };

  // filter result handlers
  findAnimalDives(arr) {
    let animalDives = [];
    for (let i = 0; i < arr.length; i++) {
      let dive = arr[i];
      let currentDive = dive.animals_spotted;

      if (currentDive.length !== 0) {
        let check = currentDive.filter(
          (animal) => animal === Number(this.state.animal)
        );
        if (check.length !== 0) {
          animalDives.push(dive);
        }
      }
    }
    return animalDives;
  }

  findSiteDives(arr) {
    let siteDives = [];
    for (let i = 0; i < arr.length; i++) {
      let dive = arr[i];
      if (
        dive.dive_site.toUpperCase().includes(this.state.site.toUpperCase())
      ) {
        siteDives.push(dive);
      }
    }
    return siteDives;
  }

  findShopDives(arr) {
    let shopDives = [];
    for (let i = 0; i < arr.length; i++) {
      let dive = arr[i];
      if (
        dive.dive_shop.toUpperCase().includes(this.state.shop.toUpperCase())
      ) {
        shopDives.push(dive);
      }
    }
    return shopDives;
  }

  displayDate = (dive_date) => {
    let formattedDate = "";
    let year = dive_date.slice(0, 4);
    let month = dive_date.slice(4, 6);
    let day = dive_date.slice(6, 8);

    if (month === "01") {
      month = "January";
    }
    if (month === "02") {
      month = "February";
    }
    if (month === "03") {
      month = "March";
    }
    if (month === "04") {
      month = "April";
    }
    if (month === "05") {
      month = "May";
    }
    if (month === "06") {
      month = "June";
    }
    if (month === "07") {
      month = "July";
    }
    if (month === "08") {
      month = "August";
    }
    if (month === "09") {
      month = "September";
    }
    if (month === "10") {
      month = "October";
    }
    if (month === "11") {
      month = "November";
    }
    if (month === "12") {
      month = "December";
    }

    formattedDate = month + " " + day + ", " + year;

    return formattedDate;
  };

  render() {
    const user = this.context.user;
    const userId = user.id;

    const allUserDives = this.context.dives.filter(
      (dive) => Number(dive.user_id) === Number(userId)
    );

    const dives =
      this.state.searchBy === "all"
        ? allUserDives
        : this.state.searchBy === "country"
        ? allUserDives.filter((dive) => dive.country === this.state.country)
        : this.state.searchBy === "animal"
        ? this.findAnimalDives(allUserDives)
        : this.state.searchBy === "site"
        ? this.findSiteDives(allUserDives)
        : this.state.searchBy === "shop"
        ? this.findShopDives(allUserDives)
        : "";

    dives.map((dive) => (dive.dive_date = dive.dive_date.split("-").join("")));
    dives.sort((a, b) => b.dive_date - a.dive_date);

    const totalDives = allUserDives.length;

    return TokenService.hasAuthToken() && user ? (
      <div className="Log">
        <h2>{user.first_name}'s Dive Log</h2>
        <div className="log-body">
          <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
            <AccordionItem className="log-stats">
              <AccordionItemHeading>
                <AccordionItemButton>Statistics</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {allUserDives.length !== 0 ? (
                  <div>
                    <div>
                      Total Dives{" "}
                      <span className="details-li">{totalDives}</span>{" "}
                    </div>

                    <div>
                      Deepest Dive{" "}
                      <span className="details-li">
                        {this.findDeepestDive(allUserDives)}
                      </span>{" "}
                    </div>
                    <div>
                      Avg Dive Depth{" "}
                      <span className="details-li">
                        {this.findAvgDiveDepth(allUserDives)}
                      </span>{" "}
                    </div>
                    <div>
                      Shallowest Dive{" "}
                      <span className="details-li">
                        {this.findShallowestDive(allUserDives)}
                      </span>{" "}
                    </div>

                    <div>
                      Longest Dive{" "}
                      <span className="details-li">
                        {this.findLongestDive(allUserDives)}
                      </span>{" "}
                    </div>
                    <div>
                      Avg Dive Time{" "}
                      <span className="details-li">
                        {this.findAvgDiveTime(allUserDives)}
                      </span>{" "}
                    </div>
                    <div>
                      Shortest Dive{" "}
                      <span className="details-li">
                        {this.findShortestDive(allUserDives)}
                      </span>{" "}
                    </div>
                    <div>
                      Total Time Spent Underwater{" "}
                      <span className="details-li">
                        {this.findTotalDiveTime(allUserDives)}
                      </span>
                    </div>
                  </div>
                ) : (
                  "Log dives to get data!"
                )}
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="log-wishlist">
              <AccordionItemHeading>
                <AccordionItemButton>Wishlist</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {this.renderWishlist(user)}
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <div className="log-dives">
            <LogFilters
              searchBy={this.state.searchBy}
              updateSearchBy={this.updateSearchBy}
              updateCountry={this.updateCountry}
              updateAnimal={this.updateAnimal}
              updateSite={this.updateSite}
              updateShop={this.updateShop}
            />
            <Link to="/add-dive" className="btn-cancel">
              Add Dive
            </Link>
            <fieldset>
              <legend className="section-title">Dives</legend>
              <p className="log-details">Click a dive for more details</p>
              <ul>
                {dives
                  ? dives.map((dive) => (
                      <li key={dive.id} className="log-dive">
                        <ul>
                          <li>
                            <Link to={`/dive-details/${dive.id}`}>
                              {this.displayDate(dive.dive_date)}
                              <br />
                              {dive.country}
                              <br />
                              {dive.dive_site}
                              <br />
                              {dive.rating} seastars
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ))
                  : ""}
              </ul>
            </fieldset>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
