import floodApi from "@/services/api";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import dayjs from 'dayjs';
import { Flex, Table } from '@chakra-ui/react';
import "chartjs-adapter-date-fns"; 
import Chart from './Chart';



function StationDetails() {
  const { town: selectedTown } = useParams();

  const { isLoading, error, data: levelReadings } = useQuery({
    queryKey: ["station", selectedTown],
    queryFn: () => floodApi.getStationReadings(selectedTown!),
    enabled: !!selectedTown,
    refetchOnWindowFocus: false,
  });



  return (
    <Flex direction="column" justify="center" w="full" h="full" p="6">
      <Chart data={levelReadings}></Chart>
      <Table.ScrollArea w="full">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row bg="red.300">
              <Table.ColumnHeader>Time</Table.ColumnHeader>
              {levelReadings?.map((item, id) => (
                <Table.ColumnHeader key={id}>
                  {dayjs(item.dateTime).format("ddd HH:mm")}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Cell>Measurement</Table.Cell>
            {levelReadings?.map((item) => (
              <Table.Cell>{item.value}</Table.Cell>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
}

export default StationDetails;