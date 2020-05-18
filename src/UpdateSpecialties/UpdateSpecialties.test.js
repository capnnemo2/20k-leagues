import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UpdateSpecialties from "./UpdateSpecialties";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <UpdateSpecialties />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
