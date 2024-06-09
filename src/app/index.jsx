import { Form, Outlet, useLoaderData } from 'react-router-dom';
import PieChart from '../charts/index.jsx';
import {BarChart} from '../charts/horizontal-barchart.jsx';
import { Button } from '../components/ui/button.jsx';

import { 
  fetchAllSuperHeroes ,
  fetchHeroesByPublishers,
  fetchHeroesByGender,
} from '../service';

export async function loader({request}) {
  //return fetchAllSuperHeroes();
  let {data: heroesByPublishers} = await fetchHeroesByPublishers();
  let {data: heroesByGender} = await fetchHeroesByGender();
  return {
    heroesByPublishers,
    heroesByGender,
  }
};

export default function App() {
  const {heroesByPublishers, heroesByGender} = useLoaderData();
  return (
    <div className='grid  grid-rows-[auto_1fr] w-screen h-screen font-sans'>
      <header className='header sticky top-0 row-span-1 h-16 p-4 bg-primary text-primary-foreground'>
        <h4 className='scroll-m-20 text-xl tracking-tight'>Super Hero App</h4>
      </header>
      <main className='main container row-span-1 grid grid-cols-6 grid-rows-1'>
        <div className='charts col-span-4 bg-gray-100 [ grid grid-cols-2 grid-rows-2 ]'>
          <div className='w-[400px] h-[400px] p-4'>
          <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
          </div>
          <div className='w-[400px] h-[400px] p-4'>
          <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
          </div>
          <div className='w-[400px] h-[400px] p-4'>
          <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
          </div>
        </div>
        <div className='publisher col-span-2'>
          <BarChart data={heroesByPublishers} labelKey='publisher' dataKey='count'/>
        </div>
      </main>

    </div>


  )
}
