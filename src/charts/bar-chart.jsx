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
import { Bar, getElementAtEvent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { splitLabelData } from "./utils.js";
import {
  Card,
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

export function BarChart({ data: barData, labelKey = "", dataKey = "", onClick}) {
  const chartRef = useRef()
  let { labels, data } = splitLabelData(barData, labelKey, dataKey);
  let labelDataSets = {
    labels,
    datasets: [
      {
        label: "Heroes",
        data,
      },
    ],
  };
  const handleClick = (event) => {
    let events = getElementAtEvent(chartRef.current, event);
    if(events?.length) {
      let index = events[0]?.index;
      onClick(labels[index]);
    }
    return;

  }
  return (
    <Card className='h-full p-4 cursor-pointer'>
      <Bar options={options} data={labelDataSets} onClick={handleClick} ref={chartRef}/>
    </Card>
  )
}
