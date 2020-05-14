import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddCert from "./AddCert";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddCert />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
