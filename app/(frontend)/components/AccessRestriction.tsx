"use client";

import React, { useEffect } from "react";

export default function AccessRestriction() {
  useEffect(() => {
    // Disable scroll on body
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 selection:bg-red-500 selection:text-white">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center">
        {/* Lock Icon */}
        <div className="w-16 h-16 bg-red-950/50 border border-red-500/30 rounded-full flex items-center justify-center text-red-500 mb-6 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
          Access Restricted
        </h1>
        
        <p className="text-zinc-400 text-sm leading-relaxed">
          Access to this website has been temporarily restricted.
        </p>
      </div>
    </div>
  );
}
