import React from "react";
import Context from "../Context";

export default class LocationFilter extends React.Component {
  static contextType = Context;
  render() {
    const countries = this.context.countries;
    const country = this.props.country;
    console.log(country);
    // const regions =
    //   this.props.country === ""
    //     ? []
    //     : countries.find(
    //         (country) => country.country_name === this.state.country
    //       ).regions;

    return (
      <div className="LocationFilter">
        <label>
          Country:
          <select onChange={(e) => this.props.updateCountry(e)}>
            <option>Select...</option>
            {countries.map((country) => (
              <option value={country.country_name} key={country.country_name}>
                {country.country_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        {/* <label>
          Region:
          <select onChange={(e) => this.props.updateRegion(e)}>
            <option>Select...</option>
            {regions.map((region) => (
              <option value={region} key={region}>
                {region}
              </option>
            ))}
          </select>
        </label> */}
      </div>
    );
  }
}
