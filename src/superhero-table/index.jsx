import { useState } from 'react'
import { useActionData, useLoaderData, useNavigate, Link, useLocation } from "react-router-dom";
import { fetchSuperHeroes } from "../service.js";
import { DataTable } from "@/components/ui/data-table.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button } from "@/components/ui/button.jsx";
//import { columns } from './columns.jsx';
import SuperHero from './super-hero.jsx'

export async function loader({ request }) {
  const url = new URL(request.url);
  const body = Object.fromEntries(url.searchParams);
  console.log("SuperHeroTable Loader", body);
  let { data: superHeroes } = await fetchSuperHeroes(body);
  //console.log('SuperHeroTable Action', superHeroes);
  return { superHeroes };
}

export async function action({ request }) {
  let body = await request.json();
  console.log("SuperHeroTable Action", body);
  let { data: superHeroes } = await fetchSuperHeroes(body);
  console.log("SuperHeroTable Action", superHeroes);
  return { superHeroes };
}

export default function SuperHeroTable() {
  let actionData = useActionData() || {};
  let loaderData = useLoaderData() || {};
  let navigate = useNavigate();
  let location = useLocation();
  let [hero, setHero] = useState(null);
  //console.log('actionData', actionData);
  let data = actionData.superHeroes || loaderData.superHeroes || [];

  console.log(hero);



  const columns = [
    //{
    //  id: "select",
    //  header: ({ table }) => (
    //    <Checkbox
    //      checked={
    //        table.getIsAllPageRowsSelected() ||
    //        (table.getIsSomePageRowsSelected() && "indeterminate")
    //      }
    //      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //      aria-label="Select all"
    //    />
    //  ),
    //  cell: ({ row }) => (
    //    <Checkbox
    //      checked={row.getIsSelected()}
    //      onCheckedChange={(value) => {
    //        row.toggleSelected(!!value)
    //        console.log('row', row.original);
    //      }}
    //      aria-label="Select row"
    //    />
    //  ),
    //},
    //{
    //  accessorKey: "id",
    //  header: "id",
    //},
    {
      accessorKey: "name",
      header: "name",
      cell: ({row}) => {
        let original = row.original;
        return (
          <Button variant="link" onClick={() => setHero(original)}>{row.getValue('name')}</Button>
        )
      }
    },
    {
      accessorKey: "publisher",
      header: "publisher",
    },
    {
      accessorKey: "gender",
      header: "gender",
    },
    {
      accessorKey: "race",
      header: "race",
    },
    {
      accessorKey: "intelligence",
      header: "intelligence",
    },
    {
      accessorKey: "strength",
      header: "strength",
    },
    {
      accessorKey: "speed",
      header: "speed",
    },
    {
      accessorKey: "durability",
      header: "durability",
    },
    {
      accessorKey: "power",
      header: "power",
    },
    {
      accessorKey: "combat",
      header: "combat",
    },
    /*
  height: "$appearance.height",
  weight: "$appearance.weight",
  eyeColor: "$appearance.eyeColor",
  hairColor: "$appearance.hairColor",
  */
  ];

  return (
    <>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
      { hero ? (
        <SuperHero data={hero} onClose={() => setHero(null)}/>
      ) : null
      }
    </>
  );
}
