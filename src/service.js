import createFetchJson from './fetch';

const fetchJson = createFetchJson(import.meta.env.VITE_SERVICE_HOST);

export async function fetchAllSuperHeroes() {
  return fetchJson(`/superheroes/all`, { method: 'GET' })
    .then(results => {
      console.log(results);
      return 'from api';
    })
};

export async function fetchHeroesByPublishers() {
  return fetchJson(`/superheroes/groupby/publishers`, { method: 'GET' })
    .then(results => {
      console.log(results);
      return results;
    })
};

