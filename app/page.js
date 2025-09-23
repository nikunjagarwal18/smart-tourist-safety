"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- ICONS (No changes) ---
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7" />
  </svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
// --- END ICONS ---

// Hardcoded "correct" IDs for the dummy login
const VALID_IDS = {
  POLICE: "BKP001",
  TOURISM: "TWB01",
};

// Predefined locations for the dropdown
const LOCATION_OPTIONS = {
    police: ['Barrackpore Division', 'Kolkata North Division', 'Howrah City Police'],
    tourism: ['Kolkata Head Office', 'Darjeeling District Office', 'Siliguri Regional Office'],
};

export default function LandingPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState('police'); // 'police' or 'tourism'
  const [formData, setFormData] = useState({ name: '', id: '', location: LOCATION_OPTIONS.police[0] });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (type) => {
    setLoginType(type);
    setError(''); // Reset error on tab switch
    // Reset form fields and set location to the first available option
    setFormData({
      name: '',
      id: '',
      location: LOCATION_OPTIONS[type][0],
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.id || !formData.location) {
      setError('All fields are required.');
      return;
    }

    const idToValidate = formData.id.trim().toUpperCase();
    let isValid = false;

    if (loginType === 'police') {
      isValid = idToValidate === VALID_IDS.POLICE;
    } else {
      isValid = idToValidate === VALID_IDS.TOURISM;
    }

    if (isValid) {
      // For now, both logins redirect to the police dashboard.
      router.push('/police');
    } else {
      setError('Invalid ID. Please try again.');
    }
  };
  
  // Dynamic form labels and placeholders based on loginType
  const formConfig = {
    police: {
      nameLabel: 'DGP Name',
      namePlaceholder: 'e.g., Alok Sharma',
      idLabel: 'Police ID',
      idPlaceholder: 'Enter official ID (Hint: BKP001)',
      locationLabel: 'Station / Division',
    },
    tourism: {
      nameLabel: 'Head of Dept. Name',
      namePlaceholder: 'e.g., Priya Roy',
      idLabel: 'Department ID',
      idPlaceholder: 'Enter official ID (Hint: TWB01)',
      locationLabel: 'Office Location',
    },
  };
  const currentConfig = formConfig[loginType];

  return (
    <div className="font-sans bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto text-center"> {/* Centered heading */}
          <h1 className="text-xl font-bold text-gray-800">Smart Tourist Safety System</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-8">
        {/* --- HERO & FEATURES SECTIONS (No changes) --- */}
        <section className="text-center py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Advanced Monitoring & Rapid Response</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">A unified platform for ensuring tourist safety through real-time tracking, instant alerts, and streamlined incident management.</p>
        </section>
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><MapIcon /><h3 className="mt-4 text-lg font-semibold text-gray-800">Real-Time Geofencing</h3><p className="mt-2 text-gray-600">Monitor tourist clusters within a 20km radius and receive alerts for any deviations from safe zones.</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><AlertIcon /><h3 className="mt-4 text-lg font-semibold text-gray-800">Instant Panic Alerts</h3><p className="mt-2 text-gray-600">Receive high-priority SOS signals with live locations, enabling immediate dispatch and support.</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><ReportIcon /><h3 className="mt-4 text-lg font-semibold text-gray-800">Incident Reporting</h3><p className="mt-2 text-gray-600">Manage and respond to tourist-reported incidents, complete with images and precise coordinates.</p></div>
          </div>
        </section>
        {/* --- END HERO & FEATURES --- */}

        {/* Login Form Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">Official Login</h2>
            
            {/* --- Animated Tab Switcher --- */}
            <div className="mt-6 p-1 bg-gray-200 rounded-lg flex relative">
              <div 
                className="absolute top-1 left-1 bottom-1 bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out"
                style={{
                  width: 'calc(50% - 4px)',
                  transform: loginType === 'police' ? 'translateX(0%)' : 'translateX(100%)',
                }}
              />
              <button onClick={() => handleTabChange('police')} className="flex-1 p-2 text-sm font-semibold rounded-md z-10 focus:outline-none">Police</button>
              <button onClick={() => handleTabChange('tourism')} className="flex-1 p-2 text-sm font-semibold rounded-md z-10 focus:outline-none">Tourism Dept.</button>
            </div>
            {/* --- End Tab Switcher --- */}

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{currentConfig.nameLabel}</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder={currentConfig.namePlaceholder} />
              </div>
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">{currentConfig.idLabel}</label>
                <input id="id" name="id" type="text" required value={formData.id} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder={currentConfig.idPlaceholder} />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">{currentConfig.locationLabel}</label>
                <select 
                  id="location" 
                  name="location" 
                  required 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {LOCATION_OPTIONS[loginType].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Access Dashboard</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

