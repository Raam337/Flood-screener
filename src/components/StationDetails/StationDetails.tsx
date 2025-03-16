import floodApi from "@/services/api";
import { useQueries, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import dayjs from 'dayjs';
import { Box, Container, Flex, Heading, SimpleGrid, Table } from '@chakra-ui/react';
import "chartjs-adapter-date-fns"; 
import Chart from './Chart';

function StationDetails() {
  const { town: selectedTown } = useParams();

  const results = useQueries({
    queries: [
      { queryKey: ["station", selectedTown], queryFn: () => floodApi.getStationInfo(selectedTown!) },
      { queryKey: ["readings", selectedTown], queryFn: () => floodApi.getStationReadings(selectedTown!) },
    ],
  });

  const [stationInfo, stationReadings] = results;

  const fields = {
    catchmentName: "Catchment area:",
    lat: "Latitude:",
    long: "Longitude:",
    dateOpened: "Date Opened:"
  } as const

  return (
    <Flex direction="column" justify="center" align="center" w="full" h="full" p="6">

      <Box>
        <Heading fontSize="36px">Station: {stationInfo.data?.items.label}</Heading>
        
        <SimpleGrid columns={2}>
        {Object.entries(fields).map( ([key,value]) => (
          <Box>{value}{stationInfo.data?.items[key]}</Box>
        ))}
        </SimpleGrid>
      </Box>

      <Chart data={stationReadings.data}></Chart>
      <Table.ScrollArea w="full">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row bg="red.300">
              <Table.ColumnHeader>Time</Table.ColumnHeader>
              {stationReadings.data?.map((item, id) => (
                <Table.ColumnHeader key={id}>
                  {dayjs(item.dateTime).format("ddd HH:mm")}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Cell>Measurement</Table.Cell>
            {stationReadings.data?.map((item) => (
              <Table.Cell>{item.value}</Table.Cell>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
}

export default StationDetails;