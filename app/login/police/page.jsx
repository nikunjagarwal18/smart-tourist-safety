"use client";

import { useState } from 'react';
import Link from 'next/link';

// This is a self-contained component for the login/signup page.
// The Navbar and useRouter components have been removed as they are external dependencies.
export default function App() {
  const [loginType, setLoginType] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({ name: '', id: '', location: '', email: '', phone: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const LOCATION_OPTIONS = ['Barrackpore Division', 'Kolkata North Division', 'Howrah City Police', 'Kolkata Head Office', 'Darjeeling District Office', 'Siliguri Regional Office'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (type) => {
    setLoginType(type);
    setMessage({ text: '', type: '' });
    setFormData({ name: '', id: '', location: '', email: '', phone: '' });
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setIsLoading(true);

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (loginType === 'login') {
      if (!formData.id || !formData.email) {
        setMessage({ text: 'ID and Email are required for login.', type: 'error' });
        setIsLoading(false);
        return;
      }
      console.log('Login attempt with data:', formData);
      setMessage({ text: 'Login successful!', type: 'success' });
    } else { // signup
      if (!formData.name || !formData.id || !formData.email || !formData.phone) {
        setMessage({ text: 'All fields are required for signup.', type: 'error' });
        setIsLoading(false);
        return;
      }
      console.log('Signup attempt with data:', formData);
      setMessage({ text: 'Signup successful! You can now log in.', type: 'success' });
    }

    setIsLoading(false);
  };

  const formConfig = {
    login: {
      emailLabel: 'Email',
      idLabel: 'ID',
      locationLabel: 'Location',
    },
    signup: {
      nameLabel: 'DGP Full Name',
      idLabel: 'Choose an ID',
      locationLabel: 'Location',
      emailLabel: 'Email',
      phoneLabel: 'Phone Number',
    },
  };
  const currentConfig = formConfig[loginType];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Official Portal</h2>
        
        <div className="p-1 bg-gray-200 rounded-xl flex relative">
          <div 
            className="absolute top-1 left-1 bottom-1 bg-blue-500 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
            style={{
              width: 'calc(50% - 4px)',
              transform: loginType === 'login' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
          <button 
            onClick={() => handleTabChange('login')} 
            className={`flex-1 p-2 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${loginType === 'login' ? 'text-white' : 'text-gray-700'}`}
          >
            Login
          </button>
          <button 
            onClick={() => handleTabChange('signup')} 
            className={`flex-1 p-2 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${loginType === 'signup' ? 'text-white' : 'text-gray-700'}`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{currentConfig.emailLabel}</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              value={formData.email} 
              onChange={handleInputChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" 
              placeholder={`Enter your ${currentConfig.emailLabel.toLowerCase()}`} 
            />
          </div>
          
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">{currentConfig.idLabel}</label>
            <input 
              id="id" 
              name="id" 
              type="text" 
              required 
              value={formData.id} 
              onChange={handleInputChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" 
              placeholder={`Enter your ${currentConfig.idLabel.toLowerCase()}`}
            />
          </div>

          {loginType === 'signup' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{currentConfig.nameLabel}</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" 
                  placeholder={`Enter your ${currentConfig.nameLabel.toLowerCase()}`} 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{currentConfig.phoneLabel}</label>
                <input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200" 
                  placeholder={`Enter your ${currentConfig.phoneLabel.toLowerCase()}`}
                />
              </div>
            </>
          )}

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
              <option value="" disabled>Select a location...</option>
              {LOCATION_OPTIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          {message.text && (
            <p className={`text-sm text-center font-medium ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </p>
          )}
          
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              <Link href="/police" >{isLoading ? 'Processing...' : (loginType === 'login' ? 'Login' : 'Signup')}</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
