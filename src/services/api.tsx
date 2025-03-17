import { ApiReadingResponse, ApiStationResponse, ApiStationsResponse, PureLevelReading } from "@/types/apiResponse";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://environment.data.gov.uk/flood-monitoring",
  headers: {
    'Content-Type': 'application/json'
  },
})

const getStationsInCatchment = async (catchment : string): Promise<ApiStationsResponse> => {
  return axiosConfig
  .get<ApiStationsResponse>(`/id/stations?parameter=level&catchmentName=${catchment}`)
  .then( res => res.data )
};

const getAllCatchments = async (): Promise<string[]> => {
  return axiosConfig
  .get<ApiStationsResponse>("/id/stations?parameter=level")
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
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  return axiosConfig
  .get<ApiReadingResponse>(`/id/stations/${stationID}/readings?_sorted&parameter=level&since=${yesterday.toISOString()}`)
  .then( res => {
    const readings: PureLevelReading[] = []
    res.data.items.map( reading => {
      const { dateTime, value } = reading
      readings.unshift({ dateTime, value })
    })
    return readings
  })
};

const getStationInfo = async (stationID : string): Promise<ApiStationResponse> => {
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