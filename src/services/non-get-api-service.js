import config from "../config";
import TokenService from "./token-service";

const NonGetApiService = {
  // USERS
  addUser(newUser) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newUser),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateUser(userId, newUser) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newUser),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
  //   DIVES
  addDive(newDive) {
    return fetch(`${config.API_ENDPOINT}/dives`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newDive),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateDive(diveId, newDive) {
    return fetch(`${config.API_ENDPOINT}/dives/${diveId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newDive),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
  deleteDive(diveId) {
    return fetch(`${config.API_ENDPOINT}/dives/${diveId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
  //   CERTS
  addCert(newCert) {
    return fetch(`${config.API_ENDPOINT}/certs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newCert),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteCert(certId) {
    return fetch(`${config.API_ENDPOINT}/certs/${certId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
  //   ANIMAL TRACKER
  addAnimalsTracked(newAnimalsTracked) {
    return fetch(`${config.API_ENDPOINT}/animalTracker`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newAnimalsTracked),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // this used to have a cb as a second parameter and was returned instead of true
  removeAnimalsTracked(animalsToRemove) {
    return fetch(`${config.API_ENDPOINT}/animalTracker`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(animalsToRemove),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
};

export default NonGetApiService;
