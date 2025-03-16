import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import floodApi from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Box, BoxProps, Skeleton } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

interface StationMapProps extends BoxProps{}

function StationsMap({ ...styleProps }: StationMapProps) {
  const { catchment: selectedCatchment } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["stations", selectedCatchment],
    queryFn: () => floodApi.getStationsInCatchment(selectedCatchment!),
    enabled: !!selectedCatchment,
    refetchOnWindowFocus: false,
  });
  console.log("Map rerender");

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
          style={{ height: "100%", width: "100%"}}
          
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data?.items?.map((point) => (
            <Marker
              key={point.notation}
              position={[point.lat ?? 0, point.long ?? 0]}
              eventHandlers={{
                click: () =>
                  navigate(`/${selectedCatchment}/${point.notation}`),
              }}
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
