"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';

// Component for the new login page
export default function LoginPage() {
    const router = useRouter();
    const VALID_IDS = { POLICE: 'BKP001', TOURISM: 'TWB01' };
    const LOCATION_OPTIONS = {
      police: ['Barrackpore Division', 'Kolkata North Division', 'Howrah City Police'],
      tourism: ['Kolkata Head Office', 'Darjeeling District Office', 'Siliguri Regional Office'],
    };
    const [loginType, setLoginType] = useState('police'); // 'police' or 'tourism'
    const [formData, setFormData] = useState({ name: '', id: '', location: LOCATION_OPTIONS.police[0] });
    const [error, setError] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleTabChange = (type) => {
      setLoginType(type);
      setError('');
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
        router.push('/police');
      } else {
        setError('Invalid ID. Please try again.');
      }
    };
    
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
      <>
      <Navbar />

      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-900">Official Login</h2>
        
        <div className="mt-6 p-1 bg-gray-200 rounded-xl flex relative">
          <div 
            className="absolute top-1 left-1 bottom-1 bg-blue-500 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
            style={{
              width: 'calc(50% - 4px)',
              transform: loginType === 'police' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
          <button 
            onClick={() => handleTabChange('police')} 
            className={`flex-1 p-2 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${loginType === 'police' ? 'text-white' : 'text-gray-700'}`}
          >
            Police
          </button>
          <button 
            onClick={() => handleTabChange('tourism')} 
            className={`flex-1 p-2 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${loginType === 'tourism' ? 'text-white' : 'text-gray-700'}`}
          >
            Tourism Dept.
          </button>
        </div>
  
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{currentConfig.nameLabel}</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" placeholder={currentConfig.namePlaceholder} />
          </div>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">{currentConfig.idLabel}</label>
            <input id="id" name="id" type="text" required value={formData.id} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" placeholder={currentConfig.idPlaceholder} />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">{currentConfig.locationLabel}</label>
            <select 
              id="location" 
              name="location" 
              required 
              value={formData.location} 
              onChange={handleInputChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
            >
              {LOCATION_OPTIONS[loginType].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            >
              Access Dashboard
            </button>
          </div>
        </form>
      </div>
    </>
    )
  }