import React from "react";
import { SignUp } from "@clerk/nextjs"; // Clerk NextJS ke liye yeh import sahi hai

const SignUpPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f7f8fc] overflow-hidden px-4">
      {/* Decorative geometric-style gradient effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(at top left, rgba(194, 225, 255, 0.3) 0%, transparent 40%), radial-gradient(at bottom right, rgba(189, 217, 255, 0.3) 0%, transparent 40%)",
          zIndex: 0,
        }}
      />

      {/* Clerk SignUp Box */}
      <div className="w-full max-w-md z-10">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;