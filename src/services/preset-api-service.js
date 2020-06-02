import config from "../config";

const PresetApiService = {
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
};

export default PresetApiService;
