import React from "react";

export default React.createContext({
  users: [],
  dives: [],
  certs: [],
  user: "",
  wishlist: [],
  createNewUser: () => {},
});
