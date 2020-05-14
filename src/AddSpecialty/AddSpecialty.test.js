import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddSpecialty from "./AddSpecialty";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddSpecialty />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
