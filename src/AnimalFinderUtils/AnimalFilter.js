import React from "react";
import dummyStore from "../dummyStore";
import Context from "../Context";

export default class AnimalFilter extends React.Component {
  static contextType = Context;

  render() {
    const animals = this.context.allAnimals;
    return (
      <div className="AnimalFilter">
        <label>
          Animal:
          <select onChange={(e) => this.props.updateAnimal(e)}>
            <option>Select...</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id} id={animal.id}>
                {animal.animal}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
