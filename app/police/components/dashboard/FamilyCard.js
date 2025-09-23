"use client";

// Card for displaying a family cluster in the sidebar.
export default function FamilyCard({ family, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-blue-100 border-blue-500 shadow-md"
          : "bg-white border-blue-300 hover:bg-blue-50 hover:shadow-sm"
      }`}
    >
      <p className="font-bold text-gray-800">{family.familyName}</p>
      <p className="text-sm text-gray-600">Members: {family.memberCount}</p>
    </div>
  );
}
