
export type ApiResponse = {
  "@context": string;
  meta: MetaData;
  items: FloodItem[];
};

export type ApiStationResponse = {
  "@context": string;
  meta: MetaData;
  items: StationInfo;
};

export type ApiReadingResponse = {
  "@context": string;
  meta: MetaData;
  items: LevelReading[];
};

type LevelReading = {
  "@id": string;
  dateTime: Date;
  measure: string;
  value: number;
};

type PureLevelReading = Omit<LevelReading, '@id' | 'measure'>

type MetaData = {
  publisher: string;
  licence: string;
  documentation: string;
  version: string;
  comment: string;
  hasFormat: string[];
  limit: number;
};

type FloodArea = {
  "@id": string;
  county: string;
  notation: string;
  polygon: string;
  riverOrSea: string;
};

type FloodItem = {
  "@id": string;
  description: string;
  eaAreaName: string;
  eaRegionName: string;
  floodArea: FloodArea;
  floodAreaID: string;
  isTidal: boolean;
  severity: string;
  severityLevel: number;
  timeMessageChanged: string;
  timeRaised: string;
  timeSeverityChanged: string;
};

type StationInfo = {
  RLOIid?: string;
  catchmentName?: string | string[];
  dateOpened?: string;
  datumOffset?: number;
  downstageScale?: string;
  label: string;
  measures: string[];
  notation: string;
  riverName?: string;
  stageScale?: string;
  stationReference: string;
  town?: string;
  wiskiID?: string;
  lat: number;
  long: number;
  easting?: number;
  northing?: number;
  status?: 'rt:statusActive' | 'rt:statusClosed' | 'rt:statusSuspended';
  statusReason?: string;
  statusDate?: string;
  type: string[];
};

