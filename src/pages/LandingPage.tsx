import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import StationsMap from "../components/Map/StationsMap"
import SearchBar from "@/components/SearchBar/SearchBar"
import StationDetails from "@/components/StationDetails/StationDetails"

function LandingPage() {
  return (
    <Grid templateColumns="repeat(2,1fr)" templateRows="100vh" as="main">
      <GridItem borderWidth="2px" bg="teal.200" p="4">
        <Flex w="100%" h="100%" direction="column">
          <SearchBar></SearchBar>
          <StationsMap w="100%"  flexGrow="1"></StationsMap>
        </Flex>
      </GridItem>

      <GridItem>
        <StationDetails />
      </GridItem>
    </Grid>
  )
}

export default LandingPage