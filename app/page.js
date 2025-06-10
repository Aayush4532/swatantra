'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import SwatantraLanding from './Pages/SwatantraPage';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!isLoaded || !showContent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isSignedIn ? <Home /> : <SwatantraLanding />;
}