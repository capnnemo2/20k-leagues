import config from "../config";
import TokenService from "./token-service";

const NonGetApiService = {
  // USERS
  addUser(newUser) {
    fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        newUser,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateUser(userId, newUser) {
    fetch(`${config.API_ENDPOINT}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        newUser,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   DIVES
  addDive(newDive) {
    fetch(`${config.API_ENDPOINT}/dives`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        newDive,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateDive(diveId, newDive) {
    fetch(`${config.API_ENDPOINT}/dives/${diveId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        newDive,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteDive(diveId) {
    fetch(`${config.API_ENDPOINT}/dives/${diveId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   CERTS
  addCert(user_id, agency, cert_level, cert_num, cert_date) {
    fetch(`${config.API_ENDPOINT}/certs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        user_id,
        agency,
        cert_level,
        cert_num,
        cert_date,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteCert(certId) {
    fetch(`${config.API_ENDPOINT}/certs/${certId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        // authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   ANIMAL TRACKER
  addAnimalTracked(newAnimalTracked) {
    fetch(`${config.API_ENDPOINT}/animalTracker`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        newAnimalTracked,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateAnimalsTracked(animal, region) {
    fetch(`${config.API_ENDPOINT}/animalTracker`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ animal, region }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default NonGetApiService;
