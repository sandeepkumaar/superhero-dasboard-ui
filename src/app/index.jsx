import { Form, Outlet, useLoaderData } from 'react-router-dom';
import PieChart from '../charts/index.jsx';
import { Button } from '../components/ui/button.jsx';

import { 
  fetchAllSuperHeroes ,
  fetchHeroesByPublishers,
} from '../service';

export async function loader({request}) {
  //return fetchAllSuperHeroes();
  let {data: heroesByPublishers} = await fetchHeroesByPublishers();
  return {
    heroesByPublishers
  }
};

export default function App() {
  const {heroesByPublishers} = useLoaderData();
  return (
    <div>
      <h3>Hi</h3>
      <div>
        <Button> Submit </Button>
      </div>
      <div>
        <PieChart data={heroesByPublishers}></PieChart>
      </div>


    </div>
  );
}
