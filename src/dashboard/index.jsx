import { useLoaderData, useFetcher, useNavigate, Outlet } from "react-router-dom";
import { BarChart } from "../charts/index.jsx";
import partition from "just-partition";


import {
  fetchHeroesByProperty,
} from "../service";


import {useCheckComponent} from '../utils.jsx';

export async function loader({ request }) {
  console.log("Dasboard Loader Called ::");
    let {data: heroesByPublishers} = await fetchHeroesByProperty('publisher', {
    });
    return {
      heroesByPublishers,
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
  // hooks
  useCheckComponent('Dashboard');
  let loaderData = useLoaderData();
  let heroesByPublishers = consolidatePublishers(loaderData.heroesByPublishers);

  let fetcher = useFetcher();
  console.log('App Fetcher state ::', fetcher.state);
  let navigate = useNavigate();

  // handlers
  const handlePublisherChartClick = function (name) {
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
