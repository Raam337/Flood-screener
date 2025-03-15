import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

const points = [
  { id: 1, lat: 51.505, lng: -0.09, name: 'Point 1' },
  { id: 2, lat: 51.515, lng: -0.1, name: 'Point 2' },
];

function MapComponent() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  return (
    <div>
      <h2>Selected Point: {selectedPoint || "None"}</h2>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} eventHandlers={{
            click: () => setSelectedPoint(point.name)
          }}>
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
