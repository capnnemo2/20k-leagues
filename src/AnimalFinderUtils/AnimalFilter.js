import React from "react";
import dummyStore from "../dummyStore";

export default class AnimalFilter extends React.Component {
  render() {
    const animals = dummyStore.animals;
    return (
      <div className="AnimalFilter">
        <label>
          Animal:
          <select onChange={(e) => this.props.updateAnimal(e)}>
            <option>Select...</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.animal}>
                {animal.animal}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
