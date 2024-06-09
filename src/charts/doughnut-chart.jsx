import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
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

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom", // Positioning the legend to the right
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
    },
  },
};

export function DoughnutChart({ data: doughnutData, labelKey = "", dataKey = "" }) {
  let { labels, data } = splitLabelData(doughnutData, labelKey, dataKey);
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
  return (
    <Card className='h-full p-4'>
      <Doughnut options={options} data={labelDataSets} />
    </Card>
  )
}
