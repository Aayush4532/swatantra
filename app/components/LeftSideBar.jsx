'use client';
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";

const LeftSideBar = () => {
  const { signOut } = useAuth();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const sidebarRef = useRef(null);
  const scrollbarTimeout = useRef(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsSidebarHovered(true);
      if (scrollbarTimeout.current) {
        clearTimeout(scrollbarTimeout.current);
      }
    };
    const handleMouseLeave = () => {
      scrollbarTimeout.current = setTimeout(() => {
        setIsSidebarHovered(false);
      }, 3000);
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('mouseenter', handleMouseEnter);
      sidebar.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (sidebar) {
        sidebar.removeEventListener('mouseenter', handleMouseEnter);
        sidebar.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (scrollbarTimeout.current) {
        clearTimeout(scrollbarTimeout.current);
      }
    };
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirmation(true);
  };
  const handleConfirmLogout = () => {
    signOut();
    setShowLogoutConfirmation(false);
  };
  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className="w-64 border-r border-gray-200 bg-white flex flex-col px-2"
        style={{ marginTop: "4px", height: "calc(100vh - 80px)" }}
      >
        <nav
          className={`flex-1 overflow-y-auto custom-scrollbar ${isSidebarHovered ? "hovered" : ""}`}
        >
          {/* Dashboard */}
          <div className="mt-2">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Dashboard
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h18v18H3V3z"
                    />
                  </svg>
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Browse Footage */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Browse Footage
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/browse/latest"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Latest Uploads
                </a>
              </li>
              <li>
                <a
                  href="/browse/trending"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  Trending
                </a>
              </li>
              <li>
                <a
                  href="/browse/categories"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/browse/locations"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                    />
                  </svg>
                  Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Upload Footage */}
          <div className="mt-4">
            <button
              onClick={() => (window.location.href = "/upload")}
              className="w-full flex items-center justify-center bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition font-medium shadow-sm hover:shadow-md"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4M16 3l-4 4-4-4"
                />
              </svg>
              Upload Footage
            </button>
          </div>

          {/* My Library */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              My Library
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/library"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m7-7v14"
                    />
                  </svg>
                  My Footage
                </a>
              </li>
            </ul>
          </div>

          {/* Purchases */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Purchases
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/purchases"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h18v4H3V3zm0 6h18v12H3V9z"
                    />
                  </svg>
                  My Purchases
                </a>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Collections
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/collections"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h16v16H4V4z"
                    />
                  </svg>
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Messages */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Messages
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/messages"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                    />
                  </svg>
                  Inbox
                </a>
              </li>
            </ul>
          </div>

          {/* Settings */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Settings
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/settings/profile"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 15c3.866 0 7.387 1.567 10.207 4.093M15.536 5.464A6 6 0 1112 7a6.005 6.005 0 013.536-1.536z"
                    />
                  </svg>
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/settings/payment"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a4 4 0 00-8 0v2M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Payment Info
                </a>
              </li>
              <li>
                <a
                  href="/settings/preferences"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707m15.556 0ल-.707-.707M4.222 19.778ल-.707-.707"
                    />
                  </svg>
                  Preferences
                </a>
              </li>
              <li>
                <a
                  href="/settings/security"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 00-7.071 17.071L12 22l7.071-2.929A10 10 0 0012 2z"
                    />
                  </svg>
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Help / FAQ */}
          <div className="mt-4">
            <h2 className="text-gray-500 uppercase text-xs font-semibold mb-1">
              Help / FAQ
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/help"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M3 7a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact-support"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636ल-1.414 1.414M5.636 18.364ल1.414-1.414M18.364 18.364ल-1.414-1.414M5.636 5.636ल1.414 1.414"
                    />
                  </svg>
                  Contact Support
                </a>
              </li>
              {/* Logout Button */}
              <li className="mt-4">
                <button
                  onClick={handleLogoutClick}
                  className="flex w-full items-center text-red-600 hover:text-white transition hover:bg-red-500 py-2 px-2 rounded-md"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16ल4-4m0 0ल-4-4m4 4H7म6 4्व1a2 2 0 002 2ह4a2 2 0 002-2व-1म-8-8V7a2 2 0 012-2ह4a2 2 0 012 2व1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative w-80 p-6 bg-black rounded-2xl shadow-2xl border border-white/30 animate-fade-in">
            <div className="flex justify-center mb-3">
              <div className="bg-red-100 p-2 rounded-full">
                <img src="/alert.png" alt="alert" className="w-[25px]"/>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-200 text-center mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg text-gray-100 hover:bg-gray-200 hover:bg-opacity-20 transition duration-200 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar-idle::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        .custom-scrollbar-idle::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        .custom-scrollbar-hover::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        .custom-scrollbar-hover::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 3px;
          margin-top: 2px;
          margin-bottom: 2px;
          transition: background-color 0.3s ease;
        }
        .custom-scrollbar-hover:hover::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
        }

        /* Firefox */
        .custom-scrollbar-hover {
          scrollbar-width: thin;
          scrollbar-color: white transparent;
        }
        .custom-scrollbar-idle {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default LeftSideBar;