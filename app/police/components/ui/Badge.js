"use client";

// A simple, reusable badge for displaying counts.
export default function Badge({ count, color = "blue" }) {
  const colorClasses = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    blue: "bg-blue-600",
  };

  return (
    <span
      className={`ml-2 text-white text-xs font-bold px-2 py-1 rounded-full ${colorClasses[color]}`}
    >
      {count}
    </span>
  );
}
