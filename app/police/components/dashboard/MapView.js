"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Spinner from '../ui/Spinner'; // Using Spinner for a better loading experience
import { POLICE_STATION_LOCATION } from '../../lib/dummyData';

// Dynamic imports to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(m => m.Circle), { ssr: false });

// Default view map showing all entities.
export default function MapView({ alerts, incidents, families, center, zoom = 12 }) {
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    // This effect runs only on the client side
    import('leaflet').then(L => {
      // We create the icons here, once Leaflet is loaded
      setIcons({
        police: new L.Icon({
          iconUrl: 'https://attic.sh/zo6whrrgga27un7oves9n2umyr8j',
          iconSize: [30, 30],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50],
        }),
        family: new L.Icon({
          iconUrl: 'https://img.icons8.com/color/48/000000/family.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        }),
        incident: new L.Icon({
          iconUrl: 'https://img.icons8.com/fluency/48/000000/error.png',
          iconSize: [50, 50],
          iconAnchor: [15, 15],
        }),
        alert: new L.Icon({
          iconUrl: 'https://img.icons8.com/color/48/siren.png',
          iconSize: [50, 50],
          iconAnchor: [20, 20],
        }),
      });
    });
  }, []); // Empty dependency array ensures this runs only once

  // The server and the first client render will show this loading state.
  // This consistency prevents the hydration error.
  if (!icons) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <Spinner />
      </div>
    );
  }

  // Determine the map center: use the prop if provided, otherwise default to the police station
  const mapCenter = center || [POLICE_STATION_LOCATION.lat, POLICE_STATION_LOCATION.lng];

  return (
    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: '8px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Police Station and 20km Radius */}
      <Marker position={[POLICE_STATION_LOCATION.lat, POLICE_STATION_LOCATION.lng]} icon={icons.police}>
        <Popup>{POLICE_STATION_LOCATION.name}</Popup>
      </Marker>
      <Circle center={[POLICE_STATION_LOCATION.lat, POLICE_STATION_LOCATION.lng]} radius={20000} pathOptions={{ color: 'blue', fillOpacity: 0.05 }} />

      {/* Display Families if the data is available */}
      {families && families.map(family => (
        <Marker key={family.id} position={[family.parent.lat, family.parent.lng]} icon={icons.family}>
          <Popup>{family.familyName}</Popup>
        </Marker>
      ))}

      {/* Display Incidents if the data is available */}
      {incidents && incidents.map(incident => (
        <Marker key={incident.id} position={[incident.location.lat, incident.location.lng]} icon={icons.incident}>
          <Popup><b>{incident.type}</b><br/>{incident.description}</Popup>
        </Marker>
      ))}
      
      {/* Display Panic Alerts if the data is available */}
      {alerts && alerts.map(alert => (
         <Marker key={alert.id} position={[alert.location.lat, alert.location.lng]} icon={icons.alert}>
           <Popup><b>SOS: {alert.tourist.name}</b></Popup>
         </Marker>
      ))}
    </MapContainer>
  );
}

