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
        {menuOpen && (
          <LeftSideBar />
        )}
        <Main />
      </div>
    </div>
  );
}