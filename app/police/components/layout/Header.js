"use client";
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header({ onToggleSidebar }) {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const now = new Date();
      const timeInIST = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateInIST = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentTime(timeInIST);
      setCurrentDate(dateInIST + " (IST)");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-card-background/70 backdrop-blur-xl p-3 border-b border-border-color shadow-lg flex items-center z-40">
      <button onClick={onToggleSidebar} className="p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors focus:outline-none">
        <GiHamburgerMenu className="text-2xl" />
      </button>
      <div className="ml-4">
        <h1 className="text-xl font-bold text-gray-100">Police Control Dashboard</h1>
        <p className="text-sm text-gray-400">Barrackpore Division</p>
      </div>
      <div className="text-right ml-auto">
        <p className="text-xl font-semibold text-gray-100 w-44">
          {isClient ? currentTime : '...'}
        </p>
        <p className="text-sm text-gray-400">{isClient ? currentDate : '...'}</p>
      </div>
    </header>
  );
}