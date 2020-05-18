import React from "react";

export default React.createContext({
  users: [],
  dives: [],
  certs: [],
  user: {},
  wishlist: [],
  loggedIn: null,
  allAnimals: [],
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
  deleteDive: () => {},
  deleteCert: () => {},
});
