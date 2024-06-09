import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { splitLabelData } from "./utils.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);
/*
export const data1 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
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
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "right", // Positioning the legend to the right
    },
  },
};
export default function PieChart({
  data: pieData,
  labelKey = "",
  dataKey = "",
}) {
  let { labels, data } = splitLabelData(pieData, labelKey, dataKey);
  console.log('pieData', {labels, data});
  let labelDataSets = {
    labels,
    datasets: [
      {
        label: "Heroes",
        data,
        //backgroundColor: ["#e57373", "#e0e0e0", "#FFF59D"],
        backgroundColor: ["#64b5f6", "#f48fb1", "#ffcc80"],
        
      },
    ],
  };
  return <Pie data={labelDataSets} options={options}></Pie>;
}
