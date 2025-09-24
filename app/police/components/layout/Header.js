"use client";
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut, FiMail, FiPhone, FiTarget, FiHash, FiCalendar } from "react-icons/fi";
import Modal from '../ui/Modal';

// Mock user data - using the same expanded details
const loggedInUser = {
  name: "DGP Alok Sharma",
  rank: "Director General",
  id: "BKP001",
  avatarUrl: "/icons/police.png",
  email: "alok.sharma@police.gov.in",
  phone: "+91 98765 43210",
  unit: "Barrackpore Division",
  badgeNumber: "DGP-WB-001",
  status: "On Duty",
  joinedDate: "2000-01-15",
};

// A small helper component for the detail items to avoid repetition
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-5 h-5 mt-0.5">{icon}</div>
    <div className="ml-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-200">{value}</p>
    </div>
  </div>
);

export default function Header({ onToggleSidebar }) {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const now = new Date();
      // ... (time logic remains the same)
      const timeInIST = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const dateInIST = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setCurrentTime(timeInIST);
      setCurrentDate(dateInIST + " (IST)");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="sticky top-0 bg-card-background/90 backdrop-blur-xl p-3 border-b border-border-color shadow-lg flex items-center z-[1000]">
        {/* ... (header content remains the same) */}
        <button onClick={onToggleSidebar} className="p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors focus:outline-none">
          <GiHamburgerMenu className="text-2xl" />
        </button>
        <div className="ml-4">
          <h1 className="text-xl font-bold text-gray-100">Police Control Dashboard</h1>
          <p className="text-sm text-gray-400">Barrackpore Division</p>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xl font-semibold text-gray-100 w-44">{isClient ? currentTime : '...'}</p>
            <p className="text-sm text-gray-400">{isClient ? currentDate : '...'}</p>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="h-12 w-12 rounded-full overflow-hidden border-2 border-border-color hover:border-blue-500 transition-colors focus:outline-none"
          >
            <img src={loggedInUser.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
          </button>
        </div>
      </header>

      {/* The Profile Modal with Corrected Layout */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <div className="flex flex-col items-center">
            <img src={loggedInUser.avatarUrl} alt="Profile" className="h-28 w-28 rounded-full border-4 border-blue-500 mb-4 shadow-lg" />
            <h2 className="text-3xl font-extrabold text-gray-100 mt-2">{loggedInUser.name}</h2>
            <p className="text-lg text-gray-400 font-semibold">{loggedInUser.rank}</p>
            <p className="text-sm text-gray-500 mt-2 bg-gray-700 px-3 py-1 rounded-full inline-block">ID: {loggedInUser.id}</p>
            
            {/* --- THIS IS THE CORRECTED LAYOUT SECTION --- */}
            <div className="mt-8 w-full border-t border-border-color pt-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <DetailItem icon={<FiMail className="text-blue-400" />} label="Email" value={loggedInUser.email} />
                <DetailItem icon={<FiPhone className="text-green-400" />} label="Phone" value={loggedInUser.phone} />
                <DetailItem icon={<FiTarget className="text-purple-400" />} label="Unit" value={loggedInUser.unit} />
                <DetailItem icon={<FiHash className="text-orange-400" />} label="Badge No." value={loggedInUser.badgeNumber} />
                <DetailItem icon={<FiCalendar className="text-indigo-400" />} label="Joined" value={loggedInUser.joinedDate} />
                <DetailItem 
                  icon={<div className={`h-full w-full flex items-center justify-center`}><div className={`h-2.5 w-2.5 rounded-full ${loggedInUser.status === 'On Duty' ? 'bg-green-500' : 'bg-yellow-500'}`}></div></div>}
                  label="Status" 
                  value={loggedInUser.status} 
                />
              </div>
            </div>

            <div className="mt-6 w-full border-t border-border-color pt-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-md transition-colors">
                <FiLogOut />
                Logout
              </button>
            </div>
        </div>
      </Modal>
    </>
  );
}