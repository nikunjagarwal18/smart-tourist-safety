export default function PanicHistoryCard({ alert, isSelected, onClick }) {
    return (
      <div onClick={onClick} className={`p-2 mb-2 rounded-md cursor-pointer transition-all duration-200 ${isSelected ? "bg-red-500/20" : "bg-card-background hover:bg-gray-700"}`}>
        <p className="font-semibold text-sm text-red-300">SOS: {alert.tourist.name}</p>
        <p className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</p>
      </div>
    );
}