import React from "react";
// import LocationFilter from "../AnimalFinderUtils/LocationFilter";
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
      animal: "",
      region: "",
      country: "",
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

    const currentAnimal =
      this.state.animal !== ""
        ? dummyStore.animalTracker.filter(
            (animal) => animal.animal === this.state.animal
          )
        : "";

    let regionCount = currentAnimal
      ? currentAnimal.reduce((counts, obj) => {
          let bool = false;
          if (!counts) {
            counts = [];
          }
          counts.forEach((a) => {
            if (a.region === obj.region) {
              a.count++;
              bool = true;
            }
          });
          if (!bool) {
            obj.count = 1;
            counts.push(obj);
          }
          return counts;
        }, [])
      : "";

    const currentRegion =
      this.state.region !== ""
        ? dummyStore.animalTracker.filter(
            (region) => region.region === this.state.region
          )
        : "";

    let animalCount = currentRegion
      ? currentRegion.reduce((counts, obj) => {
          let bool = false;
          if (!counts) {
            counts = [];
          }
          counts.forEach((a) => {
            if (a.animal === obj.animal) {
              a.count++;
              bool = true;
            }
          });
          if (!bool) {
            obj.count = 1;
            counts.push(obj);
          }
          return counts;
        }, [])
      : "";

    return (
      <div className="AnimalFinder">
        <h2>Find that beast</h2>
        <section>
          <div>
            {/* maybe change this first select/option to radio buttons */}
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

        <section>
          <div>
            {regionCount
              ? regionCount.map((animal) => (
                  <div key={animal.id}>
                    <p>{animal.country}</p>
                    <p>{animal.region}</p>
                    <p>Total sightings: {animal.count}</p>
                    <hr />
                  </div>
                ))
              : ""}
          </div>
          <div>
            {animalCount
              ? animalCount.map((region) => (
                  <div key={region.id}>
                    <p>{region.animal}</p>
                    <p>Total sightings: {region.count}</p>
                    <hr />
                  </div>
                ))
              : ""}
          </div>
        </section>
      </div>
    );
  }
}
