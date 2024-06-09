import { Form, Outlet, useLoaderData } from 'react-router-dom';
import PieChart from '../charts/index.jsx';
import {BarChart} from '../charts/horizontal-barchart.jsx';
import { Button } from '../components/ui/button.jsx';
import partition from 'just-partition';

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
  let {heroesByPublishers, heroesByGender} = useLoaderData();
  // to group minPublishers as 'Others'
  let [minPublishers, maxPublishers]  = partition(heroesByPublishers, (item => item.count < 2))
  heroesByPublishers = [...maxPublishers, {count: minPublishers.length, publisher: 'Others'}]
  return (
    <div className='relative flex min-h-screen flex-col bg-background'>
      <header className='header sticky top-0 z-50 row-span-1 h-16 p-4 mb-4 bg-primary text-primary-foreground'>
        <h4 className='scroll-m-20 text-xl tracking-tight'>Super Hero App</h4>
      </header>
      <main className='main flex-1 pb-8 container grid grid-cols-6 grid-rows-1 gap-x-8'>
        <div className='charts col-span-4 gap-4 [ grid grid-cols-2 grid-rows-2 ]'>
            <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
            <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
            <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
            <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
        </div>
        <div className='publisher col-span-2'>
          <BarChart data={heroesByPublishers} labelKey='publisher' dataKey='count'/>
        </div>
      </main>

    </div>


  )
}
/*

<div className='grid  grid-rows-[auto_1fr_16px] w-screen font-sans'>
<div className='w-[360px] h-[360px]'>
  <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
</div>

<div className='w-[400px] h-[400px] p-4'>
  <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
</div>
<div className='w-[400px] h-[400px] p-4'>
  <PieChart data={heroesByGender} labelKey='gender' dataKey='count'></PieChart>
</div>
*/
