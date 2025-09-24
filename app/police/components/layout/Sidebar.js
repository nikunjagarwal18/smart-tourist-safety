"use client";
import { useState } from "react";
import Badge from "../ui/Badge";
import AlertCard from "../dashboard/AlertCard";
import IncidentCard from "../dashboard/IncidentCard";
import FamilyCard from "../dashboard/FamilyCard";
import { AlertIcon } from "../icons/AlertIcon";
import { IncidentIcon } from "../icons/IncidentIcon";
import { FamilyIcon } from "../icons/FamilyIcon";
import Link from 'next/link';
import { FaFire } from "react-icons/fa";


export default function Sidebar({
  alerts,
  incidents,
  families,
  onSelectItem,
  selectedItemId,
  isOpen = false
}) {
  const [isFamiliesOpen, setIsFamiliesOpen] = useState(true);

  return (
    <aside className={`w-96 bg-gray-50 border-r border-gray-200 flex flex-col h-full absolute left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Panic Alerts Section */}
      <div className="p-4 border-b border-border-color">
        <Link href="/police/heatmap" className="flex items-center p-3 rounded-lg text-gray-200 bg-gray-700/50 hover:bg-gray-700 transition-colors">
          <FaFire className="w-6 h-6 mr-3 text-red-400" />
          <span className="font-bold text-lg">Crime Heatmap & History</span>
        </Link>
      </div>
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-red-600 flex items-center">
          <AlertIcon className="w-6 h-6 mr-2" />
          Panic Alerts (SOS)
          <Badge count={alerts.length} color="red" />
        </h2>
      </div>
      <div className="overflow-y-auto px-2 py-2">
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            isSelected={selectedItemId === alert.id}
            onClick={() => onSelectItem({ type: "panic", data: alert })}
          />
        ))}
      </div>

      {/* Reported Incidents Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="font-bold text-lg text-amber-600 flex items-center">
          <IncidentIcon className="w-6 h-6 mr-2" />
          Reported Incidents
          <Badge count={incidents.length} color="amber" />
        </h2>
      </div>
      <div className="overflow-y-auto px-2 py-2">
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            isSelected={selectedItemId === incident.id}
            onClick={() => onSelectItem({ type: "incident", data: incident })}
          />
        ))}
      </div>

      {/* Families Nearby Section */}
      <div className="p-4 border-t border-gray-200 cursor-pointer" onClick={() => setIsFamiliesOpen(!isFamiliesOpen)}>
        <h2 className="font-bold text-lg text-blue-600 flex items-center justify-between">
          <div className="flex items-center">
            <FamilyIcon className="w-6 h-6 mr-2" />
            Families Nearby (20km)
            <Badge count={families.length} color="blue" />
          </div>
          <span className={`transform transition-transform duration-300 ${isFamiliesOpen ? 'rotate-180' : ''}`}>▼</span>
        </h2>
      </div>
      <div className={`overflow-y-auto px-2 flex-grow transition-all duration-300 ${isFamiliesOpen ? 'max-h-full py-2' : 'max-h-0'}`}>
        {families.map((family) => (
          <FamilyCard
            key={family.id}
            family={family}
            isSelected={selectedItemId === family.id}
            onClick={() => onSelectItem({ type: "family", data: family })}
          />
        ))}
      </div>
    </aside>
  );
}
