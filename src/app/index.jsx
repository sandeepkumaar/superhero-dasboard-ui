import { Form, Outlet, useLoaderData } from 'react-router-dom';

import { fetchAllSuperHeroes } from '../service';

export function loader({request}) {
  return fetchAllSuperHeroes();
};

export default function App() {
  const {message} = useLoaderData();
  return (
    <h3>{message}</h3>
  );
}
