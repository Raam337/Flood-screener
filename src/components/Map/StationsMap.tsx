import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { Box, BoxProps, Skeleton } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import floodApi from "@/services/api";
import { Icon } from "leaflet";

interface StationMapProps extends BoxProps {}

function StationsMap({ ...styleProps }: StationMapProps) {
  const { catchment: selectedCatchment } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["stations", selectedCatchment],
    queryFn: () => floodApi.getStationsInCatchment(selectedCatchment!),
    enabled: !!selectedCatchment,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>{error.message}</div>;

  return (
    <Box {...styleProps}>
      {isLoading ? (
        <Skeleton
          variant="shine"
          boxSize="full"
          css={{
            "--start-color": "colors.teal.200",
            "--end-color": "colors.teal.400",
          }}
        />
      ) : (
        <MapContainer
          center={[52.505, -2.09]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data?.items.map((point) => (
            <Marker
              key={point.notation}
              position={[point.lat ?? 0, point.long ?? 0]}
              eventHandlers={{
                click: () =>
                  navigate(`/${selectedCatchment}/${point.notation}`),
              }}
              icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 5]})}
            >
              <Popup>{point.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
}

export default StationsMap;
