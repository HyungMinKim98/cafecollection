//Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../imgs/marker.svg'; // Import your custom marker icon

interface Location {
  lat: number;
  lng: number;
}

const Map: React.FC<{ location: Location }> = ({ location }) => {
  const icon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [35, 35], // Size of the icon
    iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer center={[location.lat, location.lng]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]} icon={icon} />
    </MapContainer>
  );
};

export default Map;
