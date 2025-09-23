"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Detailed view for a single panic alert.
export default function PanicAlertDetail({ alert }) {
  const { tourist, location, timestamp, emergencyContacts, itinerary } = alert;

  return (
    <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Panel: Information */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">SOS ALERT: E-FIR Pending</h2>
        
        <div className="flex items-center mb-6">
          <img src={tourist.photoUrl} alt={tourist.name} className="w-24 h-24 rounded-full mr-4 border-4 border-red-200" />
          <div>
            <h3 className="text-xl font-bold">{tourist.name}</h3>
            <p className="text-gray-600">ABC ID: {tourist.abcId}</p>
            <p className="text-gray-600">{tourist.age} years old, {tourist.nationality}</p>
          </div>
        </div>
        
        <div className="space-y-4 text-sm">
            <p><strong>Time of Alert:</strong> {new Date(timestamp).toLocaleString()}</p>
            <p><strong>Last Known Location:</strong> {location.lat}, {location.lng}</p>
            <p><strong>Trip Itinerary:</strong> {itinerary}</p>
            <div>
                <h4 className="font-bold mb-1">Emergency Contacts:</h4>
                <ul className="list-disc list-inside">
                    {emergencyContacts.map(contact => <li key={contact}>{contact}</li>)}
                </ul>
            </div>
        </div>

        <div className="mt-8 border-t pt-6">
            <h4 className="font-bold text-lg mb-4">Actions</h4>
            <div className="grid grid-cols-2 gap-4">
                 {/* TODO: Implement backend functionality for these actions */}
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">Dispatch Nearest Unit</button>
                <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">Establish Contact</button>
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition">View Live Feed</button>
                <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition">Mark as Resolved</button>
            </div>
        </div>
      </div>
      
      {/* Right Panel: Focused Map */}
      <div className="w-1/2">
        <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Live location of {tourist.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
