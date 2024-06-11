
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  scales: {
    r: {
      ticks: {
       display: false
      }
    }
  }
}

export function RadarChart({data, dataOpts}) {
const radarData = {
  labels: Object.keys(data),
  datasets: [
    {
      data: Object.values(data),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      ...dataOpts,
    },
  ],
};
  return <Radar data={radarData} options={options}/>;
}
