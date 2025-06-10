'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const SwatantraLanding = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex justify-between items-center px-4 sm:px-10 py-4">
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          <span className="text-orange-500 mr-2">🔥</span>SWATANTRA
        </div>
        <div className="space-x-2 sm:space-x-4">
          <button 
            onClick={() => handleNavigation('/sign-in')}
            className="text-gray-700 hover:text-indigo-600 transition font-medium hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-md"
          >
            Log in
          </button>
          <button 
            onClick={() => handleNavigation('/sign-up')}
            className="bg-indigo-600 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-md hover:bg-indigo-700 transition font-medium shadow-sm"
          >
            Sign up
          </button>
        </div>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mb-4 sm:mb-6">
          Crowdsourced Raw Footage Marketplace
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-8 sm:mb-10">
          Upload and sell your own real, unaltered footage to journalists, YouTubers, and the public.
        </p>
        <button 
          onClick={() => handleNavigation('/sign-in')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition shadow-lg"
        >
          Get Started
        </button>
      </main>
    </div>
  );
};

export default SwatantraLanding;