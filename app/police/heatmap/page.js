"use client";

import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import HistorySidebar from "../components/heatmap/HistorySidebar";
import Spinner from "../components/ui/Spinner";
import dynamic from 'next/dynamic';

// Import the new historical data
import {
  historicalPanicAlerts,
  historicalIncidents,
  resolvedEfirs,
} from "../lib/dummyData";

// Dynamically import the HeatmapView to prevent SSR issues
const HeatmapView = dynamic(() => import('../components/heatmap/HeatmapView'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full"><Spinner /></div>,
});

export default function HeatmapPage() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [efirs, setEfirs] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setAlerts(historicalPanicAlerts);
      setIncidents(historicalIncidents);
      setEfirs(resolvedEfirs);
      setLoading(false);
    };
    const timer = setTimeout(fetchData, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Combine all points for the heatmap layer
  const allPoints = [...alerts, ...incidents, ...efirs].map(item => ({
    lat: item.location.lat,
    lng: item.location.lng,
    intensity: item.type === 'panic' ? 1.0 : 0.6, // Panic alerts are more intense
  }));

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-background text-foreground overflow-hidden">
      <Header onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
      <div className="relative flex flex-1 overflow-hidden">
        <HistorySidebar
          alerts={alerts}
          incidents={incidents}
          efirs={efirs}
          isOpen={isSidebarOpen}
          onSelectItem={setSelectedHistoryItem}
          selectedItemId={selectedHistoryItem ? selectedHistoryItem.id : null}
        />
        <main className="flex-1 p-4 md:p-6 h-full transition-all duration-300" style={{ marginLeft: isSidebarOpen ? '24rem' : '0' }}>
           <div className="h-full w-full bg-card-background rounded-xl shadow-lg border border-border-color overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full"><Spinner /></div>
            ) : (
              <HeatmapView
                points={allPoints}
                alerts={alerts}
                incidents={incidents}
                efirs={efirs}
                selectedItem={selectedHistoryItem}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}