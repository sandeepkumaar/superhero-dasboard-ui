import {useRef} from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { splitLabelData } from "./utils.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const getOptions = ({titleOpts={}, legendOpts={}}) => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Positioning the legend to the right
        ...legendOpts,
      },
      title: {
        display: true,
        text: "Character Alignment",
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

export function DoughnutChart({ data: doughnutData, labelKey = "", dataKey = "", option , onClick}) {
  let chartRef = useRef();
  let { labels, data } = splitLabelData(doughnutData, labelKey, dataKey);
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
      //console.log('index', labels[index], events);
      onClick(labels[index]);
    }
    return;
  }

  return (
    <Card className='h-full p-4'>
      <Doughnut options={getOptions(option)} data={labelDataSets} onClick={handleClick} ref={chartRef}/>
    </Card>
  )
}
