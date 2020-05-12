import React from "react";
import Context from "../Context";
import dummyStore from "../dummyStore";
import AnimalFilter from "../AnimalFinderUtils/AnimalFilter";

export default class LogFilters extends React.Component {
  static contextType = Context;

  render() {
    const countries = dummyStore.countries;

    return (
      <div className="LogFilters">
        <fieldset>
          <legend>Filter dives</legend>

          <label>
            <select onChange={(e) => this.props.updateSearchBy(e.target.value)}>
              <option value="all">All</option>
              <option value="country">Country</option>
              <option value="animal">Animal</option>
              <option value="site">Dive Site</option>
              <option value="shop">Dive Shop</option>
            </select>
          </label>
          <br />

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
            ) : this.props.searchBy === "site" ? (
              <div>
                <label>
                  Dive Site:
                  <input
                    type="text"
                    onChange={(e) => this.props.updateSite(e)}
                  />
                </label>
              </div>
            ) : this.props.searchBy === "shop" ? (
              <div>
                <label>
                  Dive Shop:
                  <input
                    type="text"
                    onChange={(e) => this.props.updateShop(e)}
                  />
                </label>
              </div>
            ) : (
              ""
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}
