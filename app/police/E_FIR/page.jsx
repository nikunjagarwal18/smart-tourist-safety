"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// NOTE: All Firebase imports have been removed as per your request.

// Dummy data for the E-FIRs to replace Firebase
const DUMMY_FIRS = [
    {
        id: '1',
        title: 'Missing Person Report',
        status: 'Active',
        details: 'A person was reported missing from the downtown area. Last seen wearing a blue jacket and jeans.',
        timestamp: new Date(Date.now() - 86400000)
    },
    {
        id: '2',
        title: 'Suspicious Activity Alert',
        status: 'Unusual',
        details: 'Report of a drone flying low near a restricted zone. Security team has been dispatched.',
        timestamp: new Date(Date.now() - 172800000)
    },
    {
        id: '3',
        title: 'Cybersecurity Breach',
        status: 'Critical',
        details: 'Unauthorized access detected in the main server. All systems are on lockdown. Investigation is underway.',
        timestamp: new Date(Date.now() - 259200000)
    },
    {
        id: '4',
        title: 'Traffic Accident',
        status: 'Active',
        details: 'Two-car collision on the main highway. Emergency services are on the scene.',
        timestamp: new Date(Date.now() - 345600000)
    },
    {
        id: '5',
        title: 'Building Fire',
        status: 'Critical',
        details: 'Fire reported on the 3rd floor of the commercial building. Evacuation procedures are in effect.',
        timestamp: new Date(Date.now() - 432000000)
    }
].sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent first

// Helper function for formatting timestamps
const formatTimestamp = (timestamp) => {
    if (!timestamp) return '...';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const EFIRListItem = ({ fir, onSelect, isSelected }) => {
    return (
        <div
            onClick={() => onSelect(fir)}
            className={`cursor-pointer border-b border-gray-700 py-3 px-4 transition-all duration-200 ease-in-out ${isSelected ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${fir.status === 'Critical' ? 'bg-red-500' : fir.status === 'Unusual' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{fir.title}</span>
                </div>
                <div className="text-sm text-gray-400">
                    {formatTimestamp(fir.timestamp).split(',')[0]}
                </div>
            </div>
            <div className={`text-xs mt-1 truncate ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
                {fir.details}
            </div>
        </div>
    );
};

const EFIRDetails = ({ fir, onSave }) => {
    const [localFir, setLocalFir] = useState(fir);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const isNew = fir && fir.id === 'new';

    useEffect(() => {
        setLocalFir(fir);
        setSuccess(false);
    }, [fir]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFir(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSave(localFir);
            setSuccess(true);
        } catch (error) {
            console.error('Error saving document: ', error);
        } finally {
            setSaving(false);
        }
    };

    if (!localFir) {
        return <div className="flex-1 flex items-center justify-center text-gray-400">Please select an E-FIR to view its details.</div>;
    }

    return (
        <div className="flex-1 overflow-auto p-8 bg-gray-800 rounded-lg shadow-inner m-4">
            <h1 className="text-2xl font-bold text-gray-200 mb-4">{isNew ? 'New E-FIR' : localFir.title}</h1>
            
            <div className="flex flex-col space-y-4">
                <label className="text-gray-400 font-semibold">
                    <span className="mb-1 block">Title</span>
                    <input
                        type="text"
                        name="title"
                        value={localFir?.title || ''}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Missing Tourist Report"
                    />
                </label>
                
                <label className="text-gray-400 font-semibold">
                    <span className="mb-1 block">Status</span>
                    <select
                        name="status"
                        value={localFir?.status || 'Active'}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Unusual">Unusual</option>
                        <option value="Critical">Critical</option>
                    </select>
                </label>

                <label className="text-gray-400 font-semibold">
                    <span className="mb-1 block">Details</span>
                    <textarea
                        name="details"
                        value={localFir?.details || ''}
                        onChange={handleChange}
                        className="w-full h-40 bg-gray-700 text-gray-200 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Provide details about the incident..."
                    ></textarea>
                </label>
                
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                            saving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : success ? 'Saved!' : 'Save E-FIR'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ onSelectMenu, selectedMenu, userId, onNewFIR, isMobileMenuOpen, toggleMobileMenu }) => {
    const MenuItems = [
        { name: 'E-FIR', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
        ) },
        { name: 'Dashboard', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        ) },
        { name: 'Security', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ) },
        { name: 'Users', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ) },
        { name: 'Messages', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ) },
        { name: 'Power', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-power"><path d="M12 21a9 9 0 1 0 0-18"/><path d="M12 3v9"/></svg>
        ) },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            <div className="w-64 bg-gray-900 text-gray-200 flex flex-col h-full shadow-lg">
                <div className="p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file text-indigo-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                        E-FIR System
                    </h2>
                    <button onClick={toggleMobileMenu} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-lg"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <div className="px-4 py-2 border-t border-b border-gray-700 text-center">
                    <p className="text-sm font-semibold">User ID:</p>
                    <p className="text-xs break-all">{userId || 'Loading...'}</p>
                </div>
                <nav className="flex-1 overflow-y-auto mt-4">
                    <ul>
                        {MenuItems.map((item) => (
                            <li key={item.name} className={`px-4 py-3 cursor-pointer transition-colors duration-200 ease-in-out ${selectedMenu === item.name ? 'bg-indigo-600' : 'hover:bg-gray-700'}`} onClick={() => onSelectMenu(item.name)}>
                                <span className="flex items-center gap-4">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={onNewFIR} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                         New E-FIR
                    </button>
                </div>
            </div>
        </aside>
    );
};

const Dashboard = ({ firs }) => {
    const totalFIRs = firs.length;
    const criticalFIRs = firs.filter(fir => fir.status === 'Critical').length;
    const activeFIRs = firs.filter(fir => fir.status === 'Active').length;
    const unusualFIRs = firs.filter(fir => fir.status === 'Unusual').length;

    return (
        <div className="p-8 bg-gray-800 rounded-lg shadow-inner m-4 flex-1 flex flex-col space-y-6">
            <h1 className="text-2xl font-bold text-gray-200">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-indigo-500">{totalFIRs}</h2>
                    <p className="text-gray-400 mt-2">Total E-FIRs</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-red-500">{criticalFIRs}</h2>
                    <p className="text-gray-400 mt-2">Critical Incidents</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-green-500">{activeFIRs}</h2>
                    <p className="text-gray-400 mt-2">Active Reports</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-yellow-500">{unusualFIRs}</h2>
                    <p className="text-gray-400 mt-2">Unusual Activities</p>
                </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-bold text-gray-200 mb-4">Recent Activity</h3>
                <ul className="space-y-2">
                    {firs.slice(0, 3).map(fir => (
                        <li key={fir.id} className="bg-gray-800 p-3 rounded-lg flex items-center justify-between">
                            <span className="text-gray-300 truncate">{fir.title}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                fir.status === 'Critical' ? 'bg-red-500' : fir.status === 'Unusual' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>{fir.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const MainContent = ({ firs, selectedFir, onSelectFir, onNewFIR, selectedMenu }) => {
    const renderContent = () => {
        switch (selectedMenu) {
            case 'Dashboard':
                return <Dashboard firs={firs} />;
            case 'E-FIR':
                return (
                    <div className="flex-1 flex flex-col md:flex-row bg-gray-800 overflow-hidden">
                        <div className="w-full md:w-1/3 flex flex-col border-r border-gray-700 overflow-y-auto">
                            <div className="px-4 py-3 border-b border-gray-700">
                                <h3 className="text-lg font-bold text-gray-200">E-FIRs</h3>
                            </div>
                            {firs.length > 0 ? (
                                firs.map(fir => (
                                    <EFIRListItem
                                        key={fir.id}
                                        fir={fir}
                                        onSelect={onSelectFir}
                                        isSelected={selectedFir && selectedFir.id === fir.id}
                                    />
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-400">
                                    No E-FIRs found. <button onClick={onNewFIR} className="text-indigo-400 hover:underline">Create a new one?</button>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            <EFIRDetails
                                fir={selectedFir}
                                onSave={onSelectFir}
                            />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <div className="p-8 text-center bg-gray-800 rounded-lg shadow-inner m-4">
                            <h2 className="text-2xl font-bold mb-2">Feature not available</h2>
                            <p>The "{selectedMenu}" feature is still in development. Please check back later!</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {renderContent()}
        </div>
    );
};

const App = () => {
    const [firs, setFirs] = useState(DUMMY_FIRS);
    const [selectedFir, setSelectedFir] = useState(DUMMY_FIRS.length > 0 ? DUMMY_FIRS[0] : null);
    const [userId, setUserId] = useState('dummy-user-123');
    const [selectedMenu, setSelectedMenu] = useState('E-FIR');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // This effect runs only on the client side after the initial render.
        setCurrentTime(new Date().toLocaleTimeString());
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSaveFir = (savedFir) => {
        if (savedFir.id === 'new') {
            const newFirWithId = { ...savedFir, id: crypto.randomUUID(), timestamp: new Date() };
            setFirs(prevFirs => [newFirWithId, ...prevFirs]);
            setSelectedFir(newFirWithId);
        } else {
            setFirs(prevFirs => prevFirs.map(fir => fir.id === savedFir.id ? savedFir : fir));
            setSelectedFir(savedFir);
        }
    };
    
    const handleNewFIR = () => {
        setSelectedFir({
            id: 'new',
            title: 'New E-FIR',
            details: '',
            status: 'Active',
            timestamp: new Date()
        });
    };

    const handleSelectFir = (fir) => {
        setSelectedFir(fir);
    };

    const handleSelectMenu = (menu) => {
        setSelectedMenu(menu);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col md:flex-row antialiased">
            <button onClick={toggleMobileMenu} className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <Sidebar onSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} userId={userId} onNewFIR={handleNewFIR} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="p-4 bg-gray-800 text-gray-200 flex items-center border-b border-gray-700 shadow-md">
                    <h1 className="text-xl relative left-15 font-bold">E-FIR Management</h1>
                    <Link href="/police"><h2 className="text-md relative left-20 font-bold hover:text-lg">Go Back</h2></Link>
                    <div className="text-sm text-gray-400 fixed right-6 hidden md:block">{currentTime}</div>
                </header>
                <MainContent
                    firs={firs}
                    selectedFir={selectedFir}
                    onSelectFir={handleSelectFir}
                    onNewFIR={handleNewFIR}
                    selectedMenu={selectedMenu}
                />
            </div>
        </div>
    );
};

export default App;
