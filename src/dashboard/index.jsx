import {useState, useEffect } from 'react'
import { useLoaderData, useFetcher, useNavigate, Outlet } from "react-router-dom";
import { PieChart, BarChart, DoughnutChart } from "../charts/index.jsx";
import partition from "just-partition";


import {
  fetchHeroesByProperty,
} from "../service";


import {useCheckComponent} from '../utils.jsx';

export async function loader({ request }) {
  //const url = new URL(request.url);
  //const publisher = url.searchParams.get("publisher");
  console.log("Dasboard Loader Called ::");
  //if (publisher) {
    let {data: heroesByPublishers} = await fetchHeroesByProperty('publisher', {
    });
    //let { data: heroesByGender } = await fetchHeroesByProperty("gender", {
    //});
    //let { data: heroesByAlignment } = await fetchHeroesByProperty("alignment", {
    //});
    //let { data: heroesByRace } = await fetchHeroesByProperty("race", {
    //});
    return {
      heroesByPublishers,
      //heroesByGender,
      //heroesByAlignment,
      //heroesByRace, 
    };
}


const consolidatePublishers = function (data = []) {
  let [minPublishers, maxPublishers] = partition(
    data,
    (item) => item.count < 2
  );
  return [
    ...maxPublishers,
    { count: minPublishers.length, publisher: "Others" },
  ];
};

export default function Dashboard({}) {
  useCheckComponent('Dashboard');
  let loaderData = useLoaderData();
  // to group minPublishers as 'Others'
  let heroesByPublishers = consolidatePublishers(loaderData.heroesByPublishers);

  //let [publisher, setPublisher] = useState();

  let fetcher = useFetcher();
  console.log('App Fetcher state ::', fetcher.state);
  //useEffect(() => {
  //  if (!fetcher.data) return;
  //  let { heroesByGender, heroesByAlignment, heroesByRace } = fetcher.data;
  //  //setHeroesByGender(heroesByGender);
  //  //setHeroesByRace(consolidateRacers(heroesByRace));
  //  //setHeroesByAlignment(heroesByAlignment);
  //}, [fetcher]);
  //useEffect(() => {
  //  if (publisher) {
  //    console.log(publisher);
  //    //fetcher.submit({publisher}, {method: 'post'})
  //    fetcher.load(`/dashboard/charts?publisher=${publisher}`);
  //  }
  //}, [publisher]);

  let navigate = useNavigate();
  const handlePublisherChartClick = function (name) {
    //setPublisher(name);
    //fetcher.load(`/dashboard?index&publisher=${name}`);
    navigate(`/dashboard/charts/?publisher=${name}`);
  };

  return (
    <div className="grid grid-cols-6 grid-rows-[1fr] gap-x-8 min-h-full">
      <div className="publisher col-span-2">
        <BarChart
          data={heroesByPublishers}
          labelKey="publisher"
          dataKey="count"
          onClick={handlePublisherChartClick}
        />
      </div>
      <div className="charts col-span-4 gap-4 [ grid grid-cols-2 grid-rows-2 ]">
        <Outlet />
      </div>
    </div>
  )

}

/*

*/
