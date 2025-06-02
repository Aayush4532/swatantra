"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  HiOutlineHome,
  HiOutlineCollection,
  HiOutlineLibrary,
  HiOutlineShoppingCart,
  HiOutlineFolder,
  HiOutlineChat,
  HiOutlineCog,
} from "react-icons/hi";

const SIDEBAR_WIDTH_COLLAPSED = 64;
const SIDEBAR_WIDTH_EXPANDED = 260;

const navItems = [
  { label: "Dashboard", icon: <HiOutlineHome size={24} />, href: "/" },
  {
    label: "Browse",
    icon: <HiOutlineCollection size={24} />,
    href: "/browse/latest",
  },
  { label: "Library", icon: <HiOutlineLibrary size={24} />, href: "/library" },
  {
    label: "Purchases",
    icon: <HiOutlineShoppingCart size={24} />,
    href: "/purchases",
  },
  {
    label: "Collections",
    icon: <HiOutlineFolder size={24} />,
    href: "/collections",
  },
  { label: "Messages", icon: <HiOutlineChat size={24} />, href: "/messages" },
  {
    label: "Settings",
    icon: <HiOutlineCog size={24} />,
    href: "/settings/profile",
  },
];

const LeftSideBar = () => {
  const { signOut } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Keyboard shortcut: collapse/expand with [
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "[") setIsExpanded((v) => !v);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        className={`fixed top-[64px] left-0 z-30 h-[calc(100vh-64px)] 
    bg-gradient-to-br from-pink-100 to-white
    shadow-lg flex flex-col transition-all duration-300 ease-in-out
    ${
      isExpanded ? "w-[260px]" : "w-16"
    } rounded-3xl m-2 border border-gray-100`}
        style={{
          minWidth: isExpanded
            ? SIDEBAR_WIDTH_EXPANDED
            : SIDEBAR_WIDTH_COLLAPSED,
          maxWidth: isExpanded
            ? SIDEBAR_WIDTH_EXPANDED
            : SIDEBAR_WIDTH_COLLAPSED,
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="flex items-center justify-center mt-3 mb-2 mx-2 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Toggle sidebar"
        >
          <svg
            className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center ${
                isExpanded ? "justify-start px-2" : "justify-center px-0"
              } py-3 rounded-xl mx-2 my-1 hover:bg-indigo-50 transition font-medium group`}
              title={item.label}
              style={{
                minHeight: 48,
              }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: isExpanded ? 40 : "100%",
                  height: 40,
                }}
              >
                {item.icon}
              </span>
              <span
                className={`text-gray-900 text-base transition-all duration-200 ${
                  isExpanded
                    ? "opacity-100 ml-2"
                    : "opacity-0 ml-[-8px] pointer-events-none"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto mb-4 flex flex-col items-center">
          <button
            onClick={handleLogoutClick}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl mx-2 w-full hover:bg-red-50 transition font-semibold text-red-600
              ${isExpanded ? "justify-start" : "justify-center"}
            `}
            title="Logout"
          >
            <svg
              className="h-6 w-6 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            <span
              className={`transition-all duration-200
                ${
                  isExpanded
                    ? "opacity-100 ml-1"
                    : "opacity-0 ml-[-8px] pointer-events-none"
                }
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative w-80 p-7 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fade-in">
            <div className="flex justify-center mb-3">
              <div className="bg-red-100 p-2 rounded-full">
                <img src="/alert.png" alt="alert" className="w-[25px]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
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
        aside {
          box-shadow: 0 4px 32px 0 rgba(80, 80, 180, 0.08);
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
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
        .icon-placeholder {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #e5e7eb;
        }
      `}</style>
    </>
  );
};

export default LeftSideBar;
