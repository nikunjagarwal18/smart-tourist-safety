"use client";

import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MapView from "./components/dashboard/MapView";
import PanicAlertDetail from "./components/dashboard/PanicAlertDetail";
import IncidentDetail from "./components/dashboard/IncidentDetail";
import FamilyDetail from "./components/dashboard/FamilyDetail"; // Import the new component
import Spinner from "./components/ui/Spinner";

// Import dummy data
import {
  panicAlerts as initialAlerts,
  reportedIncidents as initialIncidents,
  nearbyFamilies as initialFamilies,
} from "./lib/dummyData";

// This is the main component that assembles the entire dashboard.
export default function PoliceDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to hold all data
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [families, setFamilies] = useState([]);

  // State to manage what is shown in the main content panel
  const [selectedItem, setSelectedItem] = useState(null);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    const fetchData = () => {
      setAlerts(initialAlerts);
      setIncidents(initialIncidents);
      setFamilies(initialFamilies);
      setLoading(false);

      // Proactively select the first panic alert to draw attention to it.
      if (initialAlerts.length > 0) {
        setSelectedItem({ type: "panic", data: initialAlerts[0] });
      }

      // TODO: Set up WebSocket or SSE connection for real-time updates from the backend.
    };

    const timer = setTimeout(fetchData, 1500); // 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  const handleSelectItem = (item) => {
    // If the same item is clicked again, deselect it to show the main map.
    if (selectedItem && selectedItem.data.id === item.data.id) {
        setSelectedItem(null);
    } else {
        setSelectedItem(item);
    }
  };

  // Logic to render the correct component in the main content area
  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      );
    }

    if (!selectedItem) {
      // Default view: Show the overview map
      return <MapView alerts={alerts} incidents={incidents} families={families} />;
    }

    switch (selectedItem.type) {
      case "panic":
        return <PanicAlertDetail alert={selectedItem.data} />;
      case "incident":
        return <IncidentDetail incident={selectedItem.data} />;
      case "family":
        // This is the corrected part: Now it renders the FamilyDetail component.
        return <FamilyDetail family={selectedItem.data} />;
      default:
        return <MapView alerts={alerts} incidents={incidents} families={families} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-gray-100 overflow-hidden">
      <Header onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar
          alerts={alerts}
          incidents={incidents}
          families={families}
          onSelectItem={handleSelectItem}
          selectedItemId={selectedItem ? selectedItem.data.id : null}
          isOpen={isSidebarOpen}
        />
        <main className="flex-1 p-4 h-full">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

