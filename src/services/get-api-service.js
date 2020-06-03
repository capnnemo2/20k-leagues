import config from "../config";
import TokenService from "./token-service";

const GetApiService = {
  getCountries() {
    return fetch(`${config.API_ENDPOINT}/countries`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json((e) => Promise.reject(e)) : res.json()
    );
  },
  getAnimals() {
    return fetch(`${config.API_ENDPOINT}/animals`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getSpecialties() {
    return fetch(`${config.API_ENDPOINT}/specialties`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // if this function is implemented in the CDM fn of App component, will the animal tracker list re-render after addAnimalTracked() runs? that fn should return the new animals tracked list, right?
  getAnimalsTracked() {
    return fetch(`${config.API_ENDPOINT}/animalTracker`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  // do I get the user by id or by email?
  // I think email
  // getUser(userId) {
  //   // return fetch(`${config.API_ENDPOINT}/${userId}`);
  // },
  getUser(userEmail) {
    return fetch(`${config.API_ENDPOINT}/users/${userEmail}`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getUserCerts(userId) {
    return fetch(`${config.API_ENDPOINT}/certs/user/${userId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // OR -----------
  getAllCerts() {
    return fetch(`${config.API_ENDPOINT}/certs`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getUserDives(userId) {
    return fetch(`${config.API_ENDPOINT}/dives/user/${userId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // OR ----------
  getAllDives() {
    return fetch(`${config.API_ENDPOINT}/dives`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default GetApiService;
