export default function IncidentHistoryCard({ incident, isSelected, onClick }) {
    return (
      <div onClick={onClick} className={`p-2 mb-2 rounded-md cursor-pointer transition-all duration-200 ${isSelected ? "bg-amber-500/20" : "bg-card-background hover:bg-gray-700"}`}>
        <p className="font-semibold text-sm text-amber-300">{incident.type}</p>
        <p className="text-xs text-gray-400">{new Date(incident.timestamp).toLocaleString()}</p>
      </div>
    );
}