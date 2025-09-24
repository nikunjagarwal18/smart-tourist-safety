"use client";

export default function FamilyCard({ family, isSelected, onClick }) {
  return (
    // UPDATED: Styling to match AlertCard but with blue colors
    <div
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20"
          : "bg-card-background border-blue-800 hover:bg-gray-700"
      }`}
    >
      <p className="font-bold text-gray-100">{family.familyName}</p>
      <p className="text-sm text-gray-400">Members: {family.memberCount}</p>
    </div>
  );
}