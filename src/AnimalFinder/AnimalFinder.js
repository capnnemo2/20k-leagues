import React from "react";
// import LocationFilter from "../AnimalFinderUtils/LocationFilter";
import AnimalFilter from "../AnimalFinderUtils/AnimalFilter";
import dummyStore from "../dummyStore";
import Context from "../Context";
import "./AnimalFinder.css";

export default class AnimalFinder extends React.Component {
  static contextType = Context;

  state = {
    searchBy: "",
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

    let userSelectedAnimal = this.context.allAnimals.find(
      (a) => a.id === Number(this.state.animal)
    );

    const currentAnimal =
      this.state.animal !== ""
        ? this.context.animalTracker.filter(
            (animal) => animal.animal === userSelectedAnimal.animal
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
        ? this.context.animalTracker.filter(
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
        <section>
          <div>
            <div className="finderExplanation">
              <p>
                Here is where you can leverage the data that we have collected
                from all of the dives logged by all of our users.
              </p>
              <p>
                If you select a particular creature, we'll show you everywhere
                that our users have spotted that creature. If you select a
                destination country, we'll show you all of the wishlist animals
                that users have seen there.
              </p>
            </div>

            {/* <label>
              Search by:
              <select onChange={(e) => this.updateSearchBy(e.target.value)}>
                <option value="animal">Animal</option>
                <option value="location">Location</option>
              </select>
            </label> */}
            <fieldset>
              <legend>Search by</legend>
              <input
                type="radio"
                name="searchBy"
                id="animal"
                value="animal"
                onChange={(e) => this.updateSearchBy(e.target.value)}
              />
              <label htmlFor="animal">Animal</label>
              <br />
              <input
                type="radio"
                name="searchBy"
                id="location"
                value="location"
                onChange={(e) => this.updateSearchBy(e.target.value)}
              />
              <label htmlFor="location">Location</label>
            </fieldset>
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
            ) : this.state.searchBy === "animal" ? (
              <div>
                <AnimalFilter updateAnimal={this.updateAnimal} />
              </div>
            ) : (
              ""
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
