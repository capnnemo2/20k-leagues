import React from "react";

export default React.createContext({
  users: [],
  dives: [],
  certs: [],
  user: {},
  wishlist: [],
  loggedIn: null,
  allAnimals: [],
  countries: [],
  animalTracker: [],
  specialties: [],
  createNewUser: () => {},
  setLoggedIn: () => {},
  updateWishlist: () => {},
  setUser: () => {},
  addCert: () => {},
  updateSpecialties: () => {},
  updateInstrSpecs: () => {},
  addDive: () => {},
  addToWishlistFulfilled: () => {},
  updateAnimalTracker: () => {},
  deleteDive: () => {},
  deleteCert: () => {},
  updateDive: () => {},
  logOut: () => {},
  getUserData: () => {},
  updateWishlistFulfilled: () => {},
});
