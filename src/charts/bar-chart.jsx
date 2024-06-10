import { useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from "react-chartjs-2";
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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  //responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Publishers",
      align: "start",
      color: "#020816",
      font: {
        size: 16,
        weight: 'bold',
        lineHeight: 1.2,
      },
    },
    datalabels: {
      anchor: "end",
      align: "end",
      formatter: function (value) {
        if(value < 2) return '';
        return value;
      },
      font: {
        weight: "normal",
      },
    },
  },
};

export function BarChart({ data: barData, labelKey = "", dataKey = "", onClick={onClick}}) {
  const chartRef = useRef()
  useEffect(() => {
    console.log('BarChart Render');
  });
  let { labels, data } = splitLabelData(barData, labelKey, dataKey);
  //console.log("bar", { labels, data }, barData);
  let labelDataSets = {
    labels,
    datasets: [
      {
        label: "Heroes",
        data,
        //backgroundColor: ["#e57373", "#e0e0e0", "#FFF59D"],
      },
    ],
  };
  const handleClick = (event) => {
    //console.log('getDatasetAtEvent', getDatasetAtEvent(chartRef.current, event));
    //console.log('getElementAtEvent', getElementAtEvent(chartRef.current, event));
    //console.log('getElementsAtEvent', getElementsAtEvent(chartRef.current, event));
    let events = getElementAtEvent(chartRef.current, event);
    if(events?.length) {
      let index = events[0]?.index;
      //console.log('index', labels[index]);
      onClick(labels[index]);
    }
    return;
  }
  return (
    <Card className='h-full p-4'>
      <Bar options={options} data={labelDataSets} onClick={handleClick} ref={chartRef}/>
    </Card>
  )
}
