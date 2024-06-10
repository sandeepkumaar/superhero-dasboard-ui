import createFetchJson from './fetch';
import filterObj from 'just-filter-object'

const fetchJson = createFetchJson(import.meta.env.VITE_SERVICE_HOST);

const defined = (key, value) => value !== undefined && value !== null

export async function fetchSuperHeroes(payload) {
  let body = filterObj(payload, defined);
  return fetchJson(`/superheroes/search`, { method: 'POST', body })
    .then(results => {
      console.log(results);
      return results;
    })
};

export async function fetchHeroesByPublishers() {
  return fetchJson(`/superheroes/groupby/publisher`, { method: 'GET' })
    .then(results => {
      console.log(results);
      return results;
    })
};

export async function fetchHeroesByGender() {
  return fetchJson(`/superheroes/groupby/gender`, { method: 'GET' })
    .then(results => {
      console.log(results);
      return results;
    })
};

export async function fetchHeroesByProperty(property, payload) {
  let body = filterObj(payload, defined);
  return fetchJson(`/superheroes/groupby/${property}`, { method: 'POST', body})
    .then(results => {
      //console.log(results);
      return results;
    })
};
