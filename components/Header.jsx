"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
const HEADER_HEIGHT = 64;

export function Header({ menuOpen, setMenuOpen }) {
  return (
    <header
      className="fixed top-0 left-0 w-full flex items-center justify-between bg-white px-6 z-20"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex items-center gap-3 min-w-[200px]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`p-2 rounded-md hover:bg-gray-100 cursor-pointer transition ${
            menuOpen ? "bg-gray-200 hover:bg-gray-200" : ""
          }`}
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="text-orange-500 mr-1">🔥</span>SWATANTRA
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-md rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
        />
      </div>
      <div className="min-w-[200px] flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}