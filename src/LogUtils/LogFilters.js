import React from "react";
import Context from "../Context";
import dummyStore from "../dummyStore";
import AnimalFilter from "../AnimalFinderUtils/AnimalFilter";

export default class LogFilters extends React.Component {
  static contextType = Context;

  //   state = {
  //     searchBy: "",
  //     country: "",
  //     animal: "",
  //   };

  //   updateSearchBy(search) {
  //     this.setState({
  //       searchBy: search,
  //       country: "",
  //       animal: "",
  //     });
  //   }

  //   updateCountry = (e) => {
  //     this.setState({
  //       country: e.target.value,
  //     });
  //   };

  //   updateAnimal = (e) => {
  //     this.setState({
  //       animal: e.target.value,
  //     });
  //   };

  render() {
    const countries = dummyStore.countries;

    return (
      <div className="LogFilters">
        <fieldset>
          <legend>Filter dives by</legend>
          <input
            type="radio"
            name="searchBy"
            id="country"
            value="country"
            onChange={(e) => this.props.updateSearchBy(e.target.value)}
          />
          <label htmlFor="country">Country</label>
          <br />
          <input
            type="radio"
            name="searchBy"
            id="animal"
            value="animal"
            onChange={(e) => this.props.updateSearchBy(e.target.value)}
          />
          <label htmlFor="animal">Animal</label>
          <br />
          <input
            type="radio"
            name="searchBy"
            id="year"
            value="year"
            onChange={(e) => this.props.updateSearchBy(e.target.value)}
          />
          <label htmlFor="year">Year</label>
          <br />
          <input
            type="radio"
            name="searchBy"
            id="site"
            value="site"
            onChange={(e) => this.props.updateSearchBy(e.target.value)}
          />
          <label htmlFor="site">Dive Site</label>
          <br />
          <input
            type="radio"
            name="searchBy"
            id="shop"
            value="shop"
            onChange={(e) => this.props.updateSearchBy(e.target.value)}
          />
          <label htmlFor="shop">Dive Shop</label>
          <br />
        </fieldset>
        <div className="filter-box">
          {this.props.searchBy === "country" ? (
            <div>
              <label>
                Country:
                <select onChange={(e) => this.props.updateCountry(e)}>
                  <option>Select...</option>
                  {countries.map((country) => (
                    <option
                      value={country.country_name}
                      key={country.country_name}
                    >
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : this.props.searchBy === "animal" ? (
            <div>
              <AnimalFilter updateAnimal={this.props.updateAnimal} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
