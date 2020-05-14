import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EditWishlist from "./EditWishlist";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditWishlist />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
