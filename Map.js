// src/Map.js
import React, { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';

const Map = ({ vehicleData }) => {
  const mapRef = useRef();  // Create a ref for the MapContainer

  // Set default icon for the marker
  const vehicleIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/car.png', // replace with your vehicle icon path
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Memoize the path and current location
  const path = useMemo(() => vehicleData.map(point => [point.latitude, point.longitude]), [vehicleData]);

  const currentLocation = useMemo(() => path.length ? path[path.length - 1] : [0, 0], [path]);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.setView(currentLocation, 15);  // Auto-pan to new location
    }
  }, [currentLocation]);

  return (
    <MapContainer
      center={currentLocation}
      zoom={15}
      style={{ height: '100vh', width: '100%' }}
      ref={mapRef} // Assign ref to MapContainer
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {path.length > 0 && (
        <>
          <Marker position={currentLocation} icon={vehicleIcon} />
          <Polyline positions={path} color="red" />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
