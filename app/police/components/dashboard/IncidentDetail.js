"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Detailed view for a single reported incident.
export default function IncidentDetail({ incident }) {
  const { type, description, imageUrl, location, timestamp, reportedBy } = incident;

  return (
    <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Panel: Information */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-amber-600 mb-4">INCIDENT REPORT</h2>
        
        <div className="mb-6">
            <img src={imageUrl} alt={type} className="w-full h-48 object-cover rounded-lg" />
        </div>
        
        <div className="space-y-3 text-sm">
            <h3 className="text-xl font-bold text-gray-800">{type}</h3>
            <p className="text-gray-700">{description}</p>
            <hr/>
            <p><strong>Reported By:</strong> {reportedBy.name} (ID: {reportedBy.abcId})</p>
            <p><strong>Time of Report:</strong> {new Date(timestamp).toLocaleString()}</p>
            <p><strong>Location:</strong> {location.lat}, {location.lng}</p>
        </div>

        <div className="mt-8 border-t pt-6">
            <h4 className="font-bold text-lg mb-4">Actions</h4>
            <div className="flex space-x-4">
                {/* TODO: Implement backend functionality for these actions */}
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">Verify Incident</button>
                <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">Dispatch Response</button>
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition">Dismiss as False</button>
            </div>
        </div>
      </div>
      
      {/* Right Panel: Focused Map */}
      <div className="w-1/2">
        <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Location of reported incident.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
