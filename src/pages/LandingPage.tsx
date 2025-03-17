import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import StationsMap from "../components/Map/StationsMap";
import SearchBar from "@/components/SearchBar/SearchBar";
import StationDetails from "@/components/StationDetails/StationDetails";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Box h="50px" px="6" bg="teal.500" alignContent="center">
        <Heading>
          <Link to="/">Flood Monitoring - UK</Link>
        </Heading>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(1, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
        }}
        templateRows="calc(100vh - 50px)"
        as="main"
        bg="teal.200"
      >
        <GridItem display="flex" flexDirection="column" p="4">
          <SearchBar />
          <StationsMap w="100%" flexGrow="1"></StationsMap>
        </GridItem>

        <GridItem p="6">
          <StationDetails />
        </GridItem>
      </Grid>
    </>
  );
}

export default LandingPage;
