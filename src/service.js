import createFetchJson from './fetch.js';
import filterObj from 'just-filter-object'
import {defined } from './utils.js';

const fetchJson = createFetchJson(import.meta.env.VITE_SERVICE_HOST);


export async function fetchSuperHeroes(payload={}) {
  let body = filterObj(payload, defined);
  return fetchJson(`/superheroes/search`, { method: 'POST', body })
    .then(results => {
      console.log(results);
      return results;
    })
};


export async function fetchHeroesByProperty(property='', payload={}) {
  let body = filterObj(payload, defined);
  return fetchJson(`/superheroes/groupby/${property}`, { method: 'POST', body})
    .then(results => {
      //console.log(results);
      return results;
    })
};
