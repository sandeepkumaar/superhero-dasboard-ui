import { useState, useEffect } from "react";
import { Form, Outlet, useLoaderData, useFetcher } from "react-router-dom";
import { PieChart, BarChart, DoughnutChart } from "../charts/index.jsx";
import { Button } from "../components/ui/button.jsx";
import partition from "just-partition";

import {
  fetchAllSuperHeroes,
  fetchHeroesByPublishers,
  fetchHeroesByGender,
  fetchHeroesByProperty,
} from "../service";
import {useCheckComponent} from '../utils.jsx';

export async function loader({ request }) {
  const url = new URL(request.url);
  const publisher = url.searchParams.get("publisher");
  console.log("App Loader Called ::", publisher);
  //if (publisher) {
    let {data: heroesByPublishers} = await fetchHeroesByProperty('publisher', {
      publisher
    });
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
      heroesByPublishers,
      heroesByGender,
      heroesByAlignment,
      heroesByRace,
    };
 //}
  //let { data: heroesByPublishers } = await fetchHeroesByProperty("publisher");
  //let { data: heroesByGender } = await fetchHeroesByProperty("gender");
  //let { data: heroesByAlignment } = await fetchHeroesByProperty("alignment");
  //let { data: heroesByRace } = await fetchHeroesByProperty("race");
  //return {
  //  heroesByPublishers,
  //  heroesByGender,
  //  heroesByAlignment,
  //  heroesByRace,
  //};
}

export async function action({ request }) {
  console.log("App Action Called ::");
  let formData = await request.formData();
  let publisher = formData.get("publisher");
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
    heroesByGender,
    heroesByAlignment,
    heroesByRace,
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
const consolidateRacers = function (data = []) {
  let [minRace, maxRace] = partition(data, (item) => item.count <= 10);
  return [...maxRace, { count: minRace.length, race: "Others" }];
};

export default function App() {
  useCheckComponent('App');
  let loaderData = useLoaderData();
  // to group minPublishers as 'Others'
  let heroesByPublishers = consolidatePublishers(loaderData.heroesByPublishers);

  let [publisher, setPublisher] = useState();
  let [heroesByGender, setHeroesByGender] = useState(loaderData.heroesByGender);
  let [heroesByRace, setHeroesByRace] = useState(
    consolidateRacers(loaderData.heroesByRace)
  );
  let [heroesByAlignment, setHeroesByAlignment] = useState(
    loaderData.heroesByAlignment
  );

  let fetcher = useFetcher();
  console.log('App Fetcher state ::', fetcher.state);
  useEffect(() => {
    if (!fetcher.data) return;
    let { heroesByGender, heroesByAlignment, heroesByRace } = fetcher.data;
    setHeroesByGender(heroesByGender);
    setHeroesByRace(consolidateRacers(heroesByRace));
    setHeroesByAlignment(heroesByAlignment);
  }, [fetcher]);
  useEffect(() => {
    if (publisher) {
      console.log(publisher);
      //fetcher.submit({publisher}, {method: 'post'})
      fetcher.load(`/?publisher=${publisher}`);
    }
  }, [publisher]);

  const handlePublisherChartClick = function (name) {
    setPublisher(name);
  };

  const getTitle = (title) => {
    return publisher ? `${publisher}: ${title}` : title;
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="header sticky top-0 z-50 row-span-1 h-16 p-4 mb-4 bg-primary text-primary-foreground">
        <h4 className="scroll-m-20 text-xl tracking-tight">Super Hero App</h4>
      </header>
      <main className="main flex-1 pb-8 container grid grid-cols-6 grid-rows-1 gap-x-8">
        <div className="publisher col-span-2">
          <BarChart
            data={heroesByPublishers}
            labelKey="publisher"
            dataKey="count"
            onClick={handlePublisherChartClick}
          />
        </div>
        <div className="charts col-span-4 gap-4 [ grid grid-cols-2 grid-rows-2 ]">
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
        </div>
      </main>
    </div>
  );
}
