"use client";

import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    // Changed bg-black/70 to bg-black/90 for higher opacity
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[2000] animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card-background border border-border-color rounded-xl shadow-2xl w-full max-w-md p-6 text-center" // Increased max-w-sm to max-w-md for more space
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none"
        >
          <FiX size={20} />
        </button>
        
        {children}
      </div>
    </div>
  );
}