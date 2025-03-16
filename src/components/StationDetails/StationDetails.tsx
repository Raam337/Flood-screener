import floodApi from "@/services/api";
import { useQueries, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import dayjs from 'dayjs';
import { Box, Text, Flex, Heading, SimpleGrid, Table, Container, Center, Skeleton } from '@chakra-ui/react';
import "chartjs-adapter-date-fns"; 
import Chart from './Chart';

const fields = {
  "Catchment area": "catchmentName",
  "Date Opened":  "dateOpened",
  "Latitude": "lat",
  "Longitude:": "long"
} as const

function StationDetails() {
  const { town: selectedTown } = useParams();

  const results = useQueries({
    queries: [
      { queryKey: ["station", selectedTown], queryFn: () => floodApi.getStationInfo(selectedTown!), enabled: !!selectedTown },
      { queryKey: ["readings", selectedTown], queryFn: () => floodApi.getStationReadings(selectedTown!), enabled: !!selectedTown },
    ],
  });
  const [stationInfo, stationReadings] = results;

  if (stationInfo.isLoading || stationReadings.isLoading)
    return (
      <Skeleton
        variant="shine"
        boxSize="full"
        minH="400px"
        css={{
          "--start-color": "colors.teal.200",
          "--end-color": "colors.teal.400",
        }}
      />
    );

  if (!stationInfo.data && !stationInfo.data)
    return (
      <Center boxSize="full" rounded={20} border={"2px dashed teal"}>
        <Box fontSize="24px">Select a station</Box>
      </Center>
    );

  return (
    <Flex direction="column" justify="center" align="center" w="full" h="full" fontSize={["3xl", "3xl", "3xl", "4xl"]}>
        <Heading fontSize="1em" mb={8}>Station: {stationInfo.data?.items.label}</Heading>
        <SimpleGrid columns={2} gap={2}>
        {Object.entries(fields).map( ([value,key]) => (
          <Box fontSize="0.5em">
            <Text display="inline" fontWeight="500">{value}</Text>
            {`: ${stationInfo.data?.items[key]}`}
          </Box>
        ))}
        </SimpleGrid>
      <Box w="full" h="fit" py={6} position="relative">
        <Chart data={stationReadings.data} />
      </Box>
      <Table.ScrollArea w="full">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row bg="teal.400">
              <Table.ColumnHeader>Time</Table.ColumnHeader>
              {stationReadings.data?.map((item, id) => (
                <>
                <Table.ColumnHeader key={id}>
                  <Text>{dayjs(item.dateTime).format("ddd")}</Text>
                  {dayjs(item.dateTime).format("HH:mm")}
                </Table.ColumnHeader>
                </>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Cell>Level, m</Table.Cell>
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