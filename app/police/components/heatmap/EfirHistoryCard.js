export default function EfirHistoryCard({ efir, isSelected, onClick }) {
    return (
      <div onClick={onClick} className={`p-2 mb-2 rounded-md cursor-pointer transition-all duration-200 ${isSelected ? "bg-blue-500/20" : "bg-card-background hover:bg-gray-700"}`}>
        <p className="font-semibold text-sm text-blue-300">E-FIR #{efir.id}</p>
        <p className="text-xs text-gray-400">{efir.details}</p>
      </div>
    );
}