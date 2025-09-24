// "use client";
// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.heat';

// // Helper to smoothly fly to a selected marker
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (center) {
//       map.flyTo(center, zoom, { animate: true, duration: 1.5 });
//     }
//   }, [center, zoom, map]);
//   return null;
// };

// // Helper to add the heatmap layer to the map
// const HeatmapLayer = ({ points }) => {
//     const map = useMap();

//     useEffect(() => {
//         if (!map || points.length === 0) return;

//         // The type declaration for L.heatLayer is not perfect, so we cast to any
//         const heatLayer = L.heatLayer(
//             points.map(p => [p.lat, p.lng, p.intensity]),
//             {
//                 radius: 100,
//                 blur: 40,
//                 maxZoom: 18,
//                 gradient: { 0.4: 'blue', 0.6: 'lime', 1: 'red' }
//             }
//         ).addTo(map);

//         // Cleanup function to remove the layer when the component unmounts
//         return () => {
//             map.removeLayer(heatLayer);
//         };
//     }, [map, points]);

//     return null; // This component does not render anything itself
// };


// export default function HeatmapView({ points, alerts, incidents, efirs, selectedItem }) {
//   const [icons, setIcons] = useState(null);
//   const [mapCenter, setMapCenter] = useState([22.7650, 88.3700]);
//   const [mapZoom, setMapZoom] = useState(13);

//   useEffect(() => {
//     import('leaflet').then(L => {
//       setIcons({
//         alert: new L.Icon({ iconUrl: 'https://img.icons8.com/color/48/siren.png', iconSize: [35, 35] }),
//         incident: new L.Icon({ iconUrl: 'https://img.icons8.com/fluency/48/000000/error.png', iconSize: [35, 35] }),
//         efir: new L.Icon({ iconUrl: 'https://img.icons8.com/color/48/000000/document.png', iconSize: [35, 35] }),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (selectedItem) {
//       setMapCenter([selectedItem.location.lat, selectedItem.location.lng]);
//       setMapZoom(17);
//     }
//   }, [selectedItem]);

//   if (!icons) return <div className="h-full w-full bg-card-background" />;

//   return (
//     <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
//       <ChangeView center={mapCenter} zoom={mapZoom} />
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//       />
      
//       {/* This component now handles the heatmap layer */}
//       <HeatmapLayer points={points} />
      
//       {alerts.map(item => (
//         <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.alert}>
//           <Popup><b>SOS Alert:</b> {item.tourist.name}</Popup>
//         </Marker>
//       ))}
//       {incidents.map(item => (
//         <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.incident}>
//           <Popup><b>Incident:</b> {item.type}</Popup>
//         </Marker>
//       ))}
//        {efirs.map(item => (
//         <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.efir}>
//           <Popup><b>E-FIR:</b> {item.details}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Helper to smoothly fly to a selected marker
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

// Helper to add the heatmap layer to the map
const HeatmapLayer = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || points.length === 0) return;

        // The type declaration for L.heatLayer is not perfect, so we cast to any
        const heatLayer = L.heatLayer(
            points.map(p => [p.lat, p.lng, p.intensity]),
            {
                radius: 60,
                blur: 5,
                maxZoom: 10,
                gradient: { 0.4: 'blue', 0.6: 'lime', 1: 'red' }
            }
        ).addTo(map);

        // Cleanup function to remove the layer when the component unmounts
        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points]);

    return null; // This component does not render anything itself
};


export default function HeatmapView({ points, alerts, incidents, efirs, selectedItem }) {
  const [icons, setIcons] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.7650, 88.3700]);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    import('leaflet').then(L => {
      setIcons({
        alert: new L.Icon({ iconUrl: 'https://img.icons8.com/color/48/siren.png', iconSize: [35, 35] }),
        incident: new L.Icon({ iconUrl: 'https://img.icons8.com/fluency/48/000000/error.png', iconSize: [35, 35] }),
        efir: new L.Icon({ iconUrl: 'https://img.icons8.com/color/48/000000/document.png', iconSize: [35, 35] }),
      });
    });
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setMapCenter([selectedItem.location.lat, selectedItem.location.lng]);
      setMapZoom(17);
    }
  }, [selectedItem]);

  if (!icons) return <div className="h-full w-full bg-card-background" />;

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
      <ChangeView center={mapCenter} zoom={mapZoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* This component now handles the heatmap layer */}
      <HeatmapLayer points={points} />
      
      {alerts.map(item => (
        <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.alert}>
          <Popup><b>SOS Alert:</b> {item.tourist.name}</Popup>
        </Marker>
      ))}
      {incidents.map(item => (
        <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.incident}>
          <Popup><b>Incident:</b> {item.type}</Popup>
        </Marker>
      ))}
       {efirs.map(item => (
        <Marker key={item.id} position={[item.location.lat, item.location.lng]} icon={icons.efir}>
          <Popup><b>E-FIR:</b> {item.details}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}