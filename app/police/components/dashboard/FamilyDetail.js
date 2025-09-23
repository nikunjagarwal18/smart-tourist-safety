"use client";

import dynamic from "next/dynamic";
import { getDistance } from "geolib";
import Spinner from "../ui/Spinner";
import { FamilyIcon } from "../icons/FamilyIcon";

// Dynamically import MapView to prevent SSR issues with Leaflet
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <Spinner />,
});

const CLUSTER_RADIUS_METERS = 100;

export default function FamilyDetail({ family }) {
  if (!family) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <p className="text-gray-500">No family selected.</p>
      </div>
    );
  }

  // Find members who are outside the safe zone
  const membersOutsideZone = family.members.filter(
    (member) => getDistance(member, family.parent) > CLUSTER_RADIUS_METERS
  );

  return (
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Panel: Family Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm overflow-y-auto h-full">
        <div className="flex items-center gap-3 mb-4 border-b pb-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <FamilyIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{family.familyName}</h1>
            <p className="text-sm text-gray-500">ABC ID: {family.abcId}</p>
          </div>
        </div>

        {/* Alert for members outside the zone */}
        {membersOutsideZone.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">{membersOutsideZone.length} Member(s) Outside Safe Zone</p>
            <p>The following members are more than 100m away from the parent/guardian.</p>
          </div>
        )}

        {/* Member List */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Members ({family.memberCount})</h2>
          <ul className="space-y-2">
            {family.members.map((member) => {
              const isOutside = getDistance(member, family.parent) > CLUSTER_RADIUS_METERS;
              return (
                <li key={member.name} className={`flex items-center justify-between p-2 rounded-md ${isOutside ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                  <span className="font-medium text-gray-800">{member.name}</span>
                  {isOutside ? (
                    <span className="text-xs font-bold text-yellow-800 bg-yellow-200 px-2 py-1 rounded-full">
                      ALERT: Outside Zone
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-green-800 bg-green-200 px-2 py-1 rounded-full">
                      Within Zone
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Right Panel: Focused Map */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
        <MapView
          // The key prop forces a re-render when a different family is selected
          key={family.id}
          // We pass only the selected family to show just them on the map
          families={[family]}
          // Center the map on the family's parent
          center={[family.parent.lat, family.parent.lng]}
          zoom={16} // Zoom in closer for a detailed view
        />
      </div>
    </div>
  );
}
