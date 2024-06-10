import { useActionData, useLoaderData } from 'react-router-dom'
import { fetchSuperHeroes } from '../service.js'
import {DataTable} from '@/components/ui/data-table.jsx';

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

const columns = [
  {
    accessorKey: "id",
    header: "id"
  },
  {
    accessorKey: "name",
    header: "name"
  },
  {
    accessorKey: "publisher",
    header: "publisher"
  },
  {
    accessorKey: "gender",
    header: "gender"
  },
  {
    accessorKey: "race",
    header: "race"
  },
  {
    accessorKey: "intelligence",
    header: "intelligence"
  },
  {
    accessorKey: "strength",
    header: "strength"
  },
  {
    accessorKey: "speed",
    header: "speed"
  },
  {
    accessorKey: "durability",
    header: "durability"
  },
  {
    accessorKey: "power",
    header: "power"
  },
  {
    accessorKey: "combat",
    header: "combat"
  },
/*
height: "$appearance.height",
weight: "$appearance.weight",
eyeColor: "$appearance.eyeColor",
hairColor: "$appearance.hairColor",
*/

];

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
