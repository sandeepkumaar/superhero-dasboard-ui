import createFetchJson from './fetch';

const fetchJson = createFetchJson(import.meta.env.VITE_SERVICE_HOST);

export async function getGreetMessage() {
  return fetchJson(`/api/message`, { method: 'GET' });
};

