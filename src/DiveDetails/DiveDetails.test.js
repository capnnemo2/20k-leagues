import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DiveDetails from "./DiveDetails";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <DiveDetails />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
