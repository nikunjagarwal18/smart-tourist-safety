"use client";

import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import MapView from "./components/dashboard/MapView";
import PanicAlertDetail from "./components/dashboard/PanicAlertDetail";
import IncidentDetail from "./components/dashboard/IncidentDetail";
import FamilyDetail from "./components/dashboard/FamilyDetail";
import Spinner from "./components/ui/Spinner";

import {
  panicAlerts as initialAlerts,
  reportedIncidents as initialIncidents,
  nearbyFamilies as initialFamilies,
} from "./lib/dummyData";

export default function PoliceDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [families, setFamilies] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setAlerts(initialAlerts);
      setIncidents(initialIncidents);
      setFamilies(initialFamilies);
      setLoading(false);

      if (initialAlerts.length > 0) {
        setSelectedItem({ type: "panic", data: initialAlerts[0] });
      }
    };

    const timer = setTimeout(fetchData, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectItem = (item) => {
    if (selectedItem && selectedItem.data.id === item.data.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      );
    }

    if (!selectedItem) {
      return <MapView alerts={alerts} incidents={incidents} families={families} />;
    }

    switch (selectedItem.type) {
      case "panic":
        return <PanicAlertDetail alert={selectedItem.data} />;
      case "incident":
        return <IncidentDetail incident={selectedItem.data} />;
      case "family":
        return <FamilyDetail family={selectedItem.data} />;
      default:
        return <MapView alerts={alerts} incidents={incidents} families={families} />;
    }
  };

   return (
    <div className="h-screen w-screen flex flex-col font-sans bg-background text-foreground overflow-hidden">
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
        <main className="flex-1 p-4 md:p-6 h-full transition-all duration-300" style={{ marginLeft: isSidebarOpen ? '24rem' : '0' }}>
           <div className="h-full bg-card-background rounded-xl shadow-lg border border-border-color overflow-hidden">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}