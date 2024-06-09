
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data1 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function splitLabelData(data=[]) {
  return data.reduce((acc, item) => {
    let {publisher= 'unknown', count=0} = item;
    acc.labels.push(publisher || 'Unknown');
    acc.data.push(count);
    return acc;
  }, {
    labels: [],
    data: []
  })
}

export default function PieChart({data: pieData}) {
  console.log('PieChart', splitLabelData(pieData));
  let {labels, data}  = splitLabelData(pieData)
  let labelDataSets = {
    labels,
    datasets: [
      {
        label: "Heroes",
        data
      }
    ]
  };
  return (
    <Pie data={labelDataSets}></Pie>
  )
}
