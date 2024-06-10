import {useState} from 'react'
import { useLoaderData } from 'react-router-dom';
import { PieChart, BarChart, DoughnutChart } from "../charts/index.jsx";
import {
  fetchHeroesByProperty,
} from "../service";

import partition from "just-partition";

export async function loader({ request }) {
  const url = new URL(request.url);
  const publisher = url.searchParams.get("publisher");
  console.log("DasboardChart Loader Called ::", publisher);
    let { data: heroesByGender } = await fetchHeroesByProperty("gender", {
      publisher,
    });
    let { data: heroesByAlignment } = await fetchHeroesByProperty("alignment", {
      publisher,
    });
    let { data: heroesByRace } = await fetchHeroesByProperty("race", {
      publisher,
    });
    return {
      publisher,
      heroesByGender,
      heroesByAlignment,
      heroesByRace,
    };
}

const consolidateRacers = function (data = []) {
  let [minRace, maxRace] = partition(data, (item) => item.count <= 10);
  return [...maxRace, { count: minRace.length, race: "Others" }];
};

export default function ChartDashboard() {
  let {
    heroesByGender,
    heroesByAlignment,
    heroesByRace,
    publisher,
  } = useLoaderData();
  

  heroesByRace = consolidateRacers(heroesByRace)
 
  //let [heroesByGender, setHeroesByGender] = useState(loaderData.heroesByGender);
  //let [heroesByRace, setHeroesByRace] = useState(
  //  consolidateRacers(loaderData.heroesByRace)
  //);
  //let [heroesByAlignment, setHeroesByAlignment] = useState(
  //  loaderData.heroesByAlignment
  //);

  const getTitle = (title) => {
    return publisher ? `${publisher}: ${title}` : title;
  };
  return (
    <>
      <PieChart
        data={heroesByGender}
        labelKey="gender"
        dataKey="count"
        option={{ titleOpts: { text: getTitle("Gender") } }}
      />
      <DoughnutChart
        data={heroesByAlignment}
        labelKey="alignment"
        dataKey="count"
        option={{ titleOpts: { text: getTitle("Alignment") } }}
      />
      <div className="col-span-2">
        <PieChart
          data={heroesByRace}
          labelKey="race"
          dataKey="count"
          option={{
            titleOpts: { text: getTitle("Race") },
            legendOpts: { position: "right" },
          }}
        ></PieChart>
      </div>

    </>
  )
}
