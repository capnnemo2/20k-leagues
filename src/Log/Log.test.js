import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Log from "./Log";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Log />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
