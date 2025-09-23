"use client";
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header({ onToggleSidebar }) {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // We set isClient to true to indicate we are now safe to render the clock.
    setIsClient(true);

    const timer = setInterval(() => {
      // We can now safely get the client's time.
      const timeInIST = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeInIST);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleSidebar = () => {
    setIsSidebarOpen((v) => !v);
    if (onToggleSidebar) onToggleSidebar();
  };

  return (
    <header className="bg-white p-3 border-b border-gray-200 shadow-sm flex gap-4 items-center">
      <div className="flex items-center gap-2 hover:bg-gray-100 absolute left-0 p-2 rounded-full cursor-pointer" onClick={toggleSidebar}>
        <GiHamburgerMenu className="text-2xl text-gray-800 " />
      </div>
      <div className="ml-10">
        <h1 className="text-xl font-bold text-gray-800">Police Control Dashboard</h1>
        <p className="text-sm text-gray-500">Barrackpore Division</p>
      </div>
      <div className="text-right ml-auto">
        {/*
          By checking for `isClient`, we ensure the server and the initial client render
          show a placeholder. The actual time is only rendered on the client after mounting,
          which prevents the hydration error.
        */}
        <p className="text-xl font-semibold text-gray-700 w-40">
          {isClient ? currentTime : '--:--:--'}
        </p>
        <p className="text-sm text-gray-500">Monday, 22 Sept 2025 (IST)</p>
      </div>
    </header>
  );
}

