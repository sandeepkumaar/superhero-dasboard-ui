import { useLoaderData, useNavigate } from 'react-router-dom';
import { PieChart, DoughnutChart } from "../charts/index.jsx";
import {
  fetchHeroesByProperty,
} from "../service";

import partition from "just-partition";
import filterObj from 'just-filter-object';
import { defined } from '../utils.js';


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
  // hooks
  let {
    heroesByGender,
    heroesByAlignment,
    heroesByRace,
    publisher,
  } = useLoaderData();
  
  let navigate = useNavigate();

  // derived states
  heroesByRace = consolidateRacers(heroesByRace)

  // handlers
  let handleChartClick = (o={}) => {
    let payload = { publisher, ...o };
    payload = filterObj(payload, defined); 
    let searchString = new URLSearchParams(payload).toString();
    return navigate(`/superhero-table?${searchString}`) 
  }


  // utils
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
        onClick={(gender) => handleChartClick({gender})}
      />
      <DoughnutChart
        data={heroesByAlignment}
        labelKey="alignment"
        dataKey="count"
        option={{ titleOpts: { text: getTitle("Alignment") } }}
        onClick={(alignment) => handleChartClick({alignment})}
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
        onClick={(race) => handleChartClick({race})}
        ></PieChart>
      </div>

    </>
  )
}
