"use client";
import React, { useState } from "react";
import { Header } from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Main from "../components/Main";
const HEADER_HEIGHT = 64;
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div style={{ marginTop: HEADER_HEIGHT }} className="flex flex-1">
        {/* Always render the sidebar */}
        <LeftSideBar />
        <Main />
      </div>
      {/* Floating Upload Button */}
      <button
        onClick={() => (window.location.href = "/upload")}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-pink-600 hover:bg-pink-400 text-white px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 font-semibold text-base"
        style={{ boxShadow: "0 8px 24px rgba(80, 80, 180, 0.18)" }}
        aria-label="Upload Footage"
      >
        <svg
          className="h-6 w-6"
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
        <span className="hidden sm:inline">Upload Your Footage</span>
      </button>
    </div>
  );
}
