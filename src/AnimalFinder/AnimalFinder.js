import React from "react";
import LocationFilter from "../AnimalFinderUtils/LocationFilter";
import AnimalFilter from "../AnimalFinderUtils/AnimalFilter";
import dummyStore from "../dummyStore";
import "./AnimalFinder.css";

export default class AnimalFinder extends React.Component {
  state = {
    searchBy: "animal",
    country: "",
    region: "",
    animal: "",
  };

  updateSearchBy(search) {
    this.setState({
      searchBy: search,
    });
  }

  updateCountry = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  updateRegion = (e) => {
    this.setState({
      region: e.target.value,
    });
  };

  updateAnimal = (e) => {
    this.setState({
      animal: e.target.value,
    });
  };

  render() {
    const countries = dummyStore.countries;
    const regions =
      this.state.country !== ""
        ? countries.find(
            (country) => country.country_name === this.state.country
          ).regions
        : [];
    const animals = dummyStore.animals;

    return (
      <div className="AnimalFinder">
        <h2>Find that beast</h2>
        <section>
          <div>
            <label>
              Search by:
              <select onChange={(e) => this.updateSearchBy(e.target.value)}>
                <option value="animal">Animal</option>
                <option value="location">Location</option>
              </select>
            </label>
          </div>
          <div className="filter-box">
            {this.state.searchBy === "location" ? (
              <div>
                {/* <LocationFilter
              updateCountry={this.updateCountry}
              updateRegion={this.updateRegion}
              country={this.state.country}
            /> */}
                <label>
                  Country:
                  <select onChange={(e) => this.updateCountry(e)}>
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
                <br />
                <label>
                  Region:
                  <select onChange={(e) => this.updateRegion(e)}>
                    <option>Select...</option>
                    {regions.map((region) => (
                      <option value={region} key={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <div>
                <AnimalFilter updateAnimal={this.updateAnimal} />
              </div>
            )}
          </div>
        </section>

        <div>
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>{animal.animal}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
