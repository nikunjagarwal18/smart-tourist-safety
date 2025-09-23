"use client";

import K from './components/k';
import Link from 'next/link';


// Reusable component for both login cards
const LoginCard = ({ title, description, link, buttonColor, icon }) => (
  <Link href={link} className="block p-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    {icon}
    <h3 className="mt-4 text-2xl font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
    <button className={`mt-6 w-full py-3 px-4 hover:cursor-pointer border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-${buttonColor}-600 hover:bg-${buttonColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${buttonColor}-500 transition-all`}>
      Login as {title}
    </button>
  </Link>
);




export default function LandingPage() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen w-full text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg py-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold tracking-wide">Smart Tourist Safety System</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Advanced Monitoring & <br /> Rapid Response
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            A unified platform for ensuring tourist safety through real-time tracking, instant alerts, and streamlined incident management.
          </p>
        </section>

        {/* Feature Cards Section */}
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <K hd="Real-Time Geofencing" tp="map" txt="Monitor tourist clusters within a 20km radius and receive alerts for any deviations from safe zones." />
            <K hd="Instant Panic Alerts" tp="alert" txt="Receive high-priority SOS signals with live locations, enabling immediate dispatch and support." />
            <K hd="Incident Reporting" tp="report" txt="Manage and respond to tourist-reported incidents, complete with images and precise coordinates." />
          </div>
        </section>

        {/* Login Cards Section */}
        <section className="py-8 md:py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Login</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <LoginCard
              title="Police"
              description="Access the system for law enforcement personnel."
              link="/login/police"
              buttonColor="blue"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                  <circle cx="12" cy="11" r="4" />
                </svg>
              )}
            />
            <LoginCard
              title="Tourism Admin"
              description="Access the system for tourism department officials."
              link="/login/tourism"
              buttonColor="green"
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-600 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
