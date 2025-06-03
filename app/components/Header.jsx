"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
const HEADER_HEIGHT = 64;

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full flex items-center justify-between bg-gray-100 px-8 z-20 transition-height duration-300 border-b border-gray-100"
      style={{ height: HEADER_HEIGHT }}
    >
      {/* Logo */}
      <div className="flex items-center min-w-[180px]">
        <span
          className="text-3xl font-extrabold  text-gray-900 tracking-tight select-none"
          style={{ fontFamily: "fantasy" }}
        >
          Swatantra
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl shadow-sm">
          <input
            type="text"
            placeholder="Search Footages, Clips..."
            className="bg-transparent flex-1 outline-none text-lg px-2 placeholder-gray-500"
          />
          <button className="ml-2 text-white bg-pink-500 hover:bg-pink-600 rounded-full p-2 transition">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-3.5-3.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 ml-8">
        <a
          href="/explore"
          className="font-semibold text-gray-900 hover:text-pink-500 transition"
        >
          Explore
        </a>
        <a
          href="/hire"
          className="font-semibold text-gray-900 hover:text-pink-500 transition"
        >
          Hire a Designer
        </a>
        <a
          href="/jobs"
          className="font-semibold text-gray-900 hover:text-pink-500 transition"
        >
          Find Jobs
        </a>
        <a
          href="/blog"
          className="font-semibold text-gray-900 hover:text-pink-500 transition"
        >
          Blog
        </a>

        <div className="min-w-[200px] flex justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
}
