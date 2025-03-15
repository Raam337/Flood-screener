import { ApiReadingResponse, ApiStationResponse, FloodItem, LevelReading, PureLevelReading } from "@/types/apiResponse";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

const getStationsInCatchment = async (catchment : string): Promise<ApiStationResponse> => {
  console.log("Fetching Stations in " + catchment)
  return axiosConfig
  .get<ApiStationResponse>(`/id/stations?parameter=level&catchmentName=${catchment}`)
  .then( res => res.data )
};

const getAllCatchments = async (): Promise<string[]> => {
  console.log("Fetching All Catchments...")
  return axiosConfig
  .get<ApiStationResponse>("/id/stations?parameter=level")
  .then( res => {
    const catchments = new Set<string>()
    res.data.items.map( item => {
      if( Array.isArray(item.catchmentName) ) {
        item.catchmentName.map( i => catchments.add(i))
      } else if ( item.catchmentName ) {
        catchments.add(item.catchmentName)
      }
    })

    return Array.from(catchments)
  })
};

const getStationReadings = async (stationID : string): Promise<PureLevelReading[]> => {
  console.log("Fetching Reading in " + stationID);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  console.log(yesterday.toISOString())
  return axiosConfig
  .get<ApiReadingResponse>(`/id/stations/${stationID}/readings?_sorted&parameter=level&since=${yesterday.toISOString()}`)
  .then( res => {
    const readings: PureLevelReading[] = []
    res.data.items.map( reading => {
      const { dateTime, value } = reading
      readings.unshift({ dateTime, value })
    })
    console.log(readings)
    //readings.push({ dateTime:new Date("2026-03-14T20:25:10.358Z"), value:0.7 })
    return readings
  })
};

const getStationInfo = async (stationID : string): Promise<ApiStationResponse> => {
  console.log("Fetching Stations in " + stationID)
  return axiosConfig
  .get<ApiStationResponse>(`/id/stations/${stationID}`)
  .then( res => res.data )
};

const floodApi = {
  getStationsInCatchment,
  getAllCatchments,
  getStationReadings,
  getStationInfo
}

export default floodApi