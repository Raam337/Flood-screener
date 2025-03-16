import { PureLevelReading } from '@/types/apiResponse';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale} from 'chart.js';
import dayjs from 'dayjs';
import { Line } from "react-chartjs-2";

ChartJS.register(TimeScale);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data } : { data: PureLevelReading[] | undefined}) {
  const opt = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          }, 
        },
        ticks: {
          source: "auto",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  } as const

  

  const chartData = {
    labels: data?.map((item) => dayjs(item.dateTime).valueOf()),
    datasets: [{
        label: "Water Level, meters",
        data: data?.map((item) => item.value),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
    }]
  };



  return (
    <Line data={chartData} options={opt}/>
  )
}

export default Chart