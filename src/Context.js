import React from "react";

export default React.createContext({
  users: [],
  dives: [],
  certs: [],
  user: {},
  wishlist: [],
  loggedIn: null,
  animalTracker: [],
  createNewUser: () => {},
  setLoggedIn: () => {},
  updateWishlist: () => {},
  setUser: () => {},
  addCert: () => {},
  addSpecialties: () => {},
  addInstrcutorSpecialties: () => {},
  addDive: () => {},
  updateWishlistFulfilled: () => {},
  updateAnimalTracker: () => {},
});
