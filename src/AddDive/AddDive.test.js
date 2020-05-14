import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddDive from "./AddDive";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddDive />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
