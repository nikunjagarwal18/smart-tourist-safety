"use client";

// Card for displaying a single high-priority panic alert in the sidebar.
export default function AlertCard({ alert, isSelected, onClick }) {
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
          : "bg-card-background border-red-800 hover:bg-gray-700"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-100">{alert.tourist.name}</p>
        <p className="text-xs text-red-400 font-semibold">{timeSince(alert.timestamp)}</p>
      </div>
      <p className="text-sm text-gray-400">ABC ID: {alert.tourist.abcId}</p>
    </div>
  );
}