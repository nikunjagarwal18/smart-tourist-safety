"use client";

export default function IncidentCard({ incident, isSelected, onClick }) {
    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 3600;
        if (interval > 24) return Math.floor(interval/24) + " days ago";
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };
  
  return (
    // UPDATED: Styling to match AlertCard but with amber colors
    <div
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/20"
          : "bg-card-background border-amber-800 hover:bg-gray-700"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-100">{incident.type}</p>
        <p className="text-xs text-amber-400">{timeSince(incident.timestamp)}</p>
      </div>
      <p className="text-sm text-gray-400">Reported by: {incident.reportedBy.name}</p>
    </div>
  );
}