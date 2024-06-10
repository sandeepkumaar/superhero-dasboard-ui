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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend, Colors);
/*
const colors = {
  backgroundColor: [
    "rgba(100 116 139, 1)",
    "rgb(239 68 68)",
    "rgb(249 115 22)",
    "rgb(245 158 11)",
    "rgb(234 179 8)",
    "rgb(132 204 22)",
    "rgb(34 197 94)",
    "rgb(16 185 129)",
    "rgb(20 184 166)",
    "rgb(6 182 212)",
    "rgb(14 165 233)",
    "rgb(59 130 246)",
    "rgb(99 102 241)",
    "rgb(139 92 246)",
    "rgb(168 85 247)",
    "rgb(217 70 239)",
    "rgb(236 72 153)",
    "rgb(244 63 94)",
  ],
};
*/
// Chart options to display legends on the right

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
  let handleClick = (event) => {
    let events = getElementAtEvent(chartRef.current, event);
    if(events?.length) {
      let index = events[0]?.index;
      onClick(labels[index]);
    }
    return;
  }
  let options = getOptions(option);
  return (

    <Card className='w-full h-full p-4'>
        <Pie data={labelDataSets} width={360} height={360} options={options} onClick={handleClick} ref={chartRef}></Pie>
    </Card>

  )
}
