import {useRef} from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { splitLabelData } from "./utils.js";

import {
  Card,
} from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const getOptions = function({titleOpts={}, legendOpts={}}) {
  return  {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Positioning the legend to the right
        ...legendOpts,
      },
      title: {
        display: true,
        text: "Gender",
        align: "start",
        color: "#020816",
        font: {
          size: 16,
          weight: 'bold',
          lineHeight: 1.2,
        },
        ...titleOpts,
      },
    },
  };
}

export function PieChart({
  data: pieData,
  labelKey = "",
  dataKey = "",
  option={},
  onClick
}) {
  // hooks
  const chartRef = useRef();
  let { labels, data } = splitLabelData(pieData, labelKey, dataKey);
  let labelDataSets = {
    labels,
    datasets: [
      {
        label: "Heroes",
        data,
        
      },
    ],
  };
  // handlers
  let handleClick = (event) => {
    let events = getElementAtEvent(chartRef.current, event);
    if(events?.length) {
      let index = events[0]?.index;
      onClick(labels[index]);
    }
    return;
  }

  // utils
  let options = getOptions(option);
  return (

    <Card className='w-full h-full p-4 cursor-pointer'>
        <Pie data={labelDataSets} width={360} height={360} options={options} onClick={handleClick} ref={chartRef}></Pie>
    </Card>

  )
}
