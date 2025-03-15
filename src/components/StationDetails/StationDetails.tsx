import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import floodApi from "@/services/api";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import dayjs from 'dayjs';
import { Table } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StationDetails() {
  const { town: selectedTown } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["station", selectedTown],
    queryFn: () => floodApi.getStationReadings(selectedTown!),
    enabled: !!selectedTown,
    refetchOnWindowFocus: false,
  });

  const chartData = {
    labels: data?.map((item) => dayjs(item.dateTime).format("ddd HH:mm")),
    datasets: [
      {
        label: "Reading Value",
        data: data?.map((item) => item.value),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
      <Table.ScrollArea maxW="1000px">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Time</Table.ColumnHeader>
              {data?.map((item, id) => (
                <Table.ColumnHeader key={id}>
                  {dayjs(item.dateTime).valueOf()}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Cell>Measurement</Table.Cell>
            {data?.map((item) => (
              <Table.Cell>{item.value}</Table.Cell>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </div>
  );
}

export default StationDetails;