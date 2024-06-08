import { Form, Outlet, useLoaderData } from 'react-router-dom';

import { getGreetMessage } from '../service';

export function loader({request}) {
  return getGreetMessage();
};

export default function App() {
  const {message} = useLoaderData();
  return (
    <h3>{message}</h3>
  );
}
