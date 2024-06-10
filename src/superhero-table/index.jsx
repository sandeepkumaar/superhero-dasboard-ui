import { useActionData, useLoaderData } from 'react-router-dom'
import { fetchSuperHeroes } from '../service.js'
import {DataTable} from '@/components/ui/data-table.jsx';
import { columns } from './columns.js';

export async function loader({request}) {
  const url = new URL(request.url);
  const body = Object.fromEntries(url.searchParams);
  console.log('SuperHeroTable Loader', body);
  let { data: superHeroes } = await fetchSuperHeroes(body);
  //console.log('SuperHeroTable Action', superHeroes);
  return {superHeroes};
}

export async function action({request}) {
  let body = await request.json();
  console.log('SuperHeroTable Action', body);
  let { data: superHeroes } = await fetchSuperHeroes(body);
  console.log('SuperHeroTable Action', superHeroes);
  return {superHeroes};
}


export default function SuperHeroTable() {
  let actionData = useActionData() || {};
  let loaderData = useLoaderData() || {};
  //console.log('actionData', actionData);
  let data = actionData.superHeroes || loaderData.superHeroes || [];

  return (
    <div>
      <DataTable columns={columns} data={data} />

    </div>
  )

}
