"use client";
import React, { useState } from "react";

const VideoLicenseCard = () => {
  const [showLicenseDetails, setShowLicenseDetails] = useState(false);

  return (
    <div className="h-[28.3vh] max-w-[1120px] mx-auto overflow-hidden p-2">
      <div className="h-full bg-white rounded-xl shadow border border-gray-200 flex">
        {/* Left: Video Info */}
        <div className="w-2/3 px-4 py-2 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zM12 14.2c-3.3 0-9.8 1.7-9.8 5v2.2H21.8v-2.2c0-3.3-6.5-5-9.8-5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-800">John Doe</div>
                <div className="text-gray-500">Videographer</div>
              </div>
            </div>
            <div className="text-gray-500">Mar 10, 2024</div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold mb-1">Mountain Sunset Footage</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 text-[10px] mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Nature
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Landscape
            </span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Sunset
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
              Mountains
            </span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-1 text-[10px] mb-2">
            <div className="bg-gray-50 p-1 rounded text-gray-700">
              MP4 (1080p@30fps)
            </div>
            <div className="bg-gray-50 p-1 rounded text-gray-700">800 MB</div>
            <div className="bg-gray-50 p-1 rounded text-gray-700">02:14</div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 text-[10px] mt-1">
            <button className="text-blue-600">Share</button>
            <button className="text-blue-600">Save</button>
            <button className="text-blue-600">Contact</button>
          </div>
        </div>

        {/* Right: License */}
        <div className="w-1/3 bg-gray-50 px-4 py-2 overflow-y-auto text-[10px]">
          {/* License Type */}
          <div className="mb-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">LICENSE</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                NO ATTRIBUTION
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">Free</div>
          </div>

          {/* Toggle Details */}
          <button
            onClick={() => setShowLicenseDetails(!showLicenseDetails)}
            className="text-blue-600 text-[10px] mb-1"
          >
            {showLicenseDetails ? "Hide Details" : "View Details"}
          </button>

          {showLicenseDetails && (
            <ul className="mb-2 space-y-1">
              <li>✅ Commercial use</li>
              <li>❌ Redistribution</li>
              <li>✅ Modification w/ credit</li>
              <li>✅ Worldwide perpetual</li>
            </ul>
          )}

          {/* Download Button */}
          <button className="w-full bg-blue-600 text-white text-[10px] py-1 rounded mb-1 hover:bg-blue-700">
            Download Free
          </button>
          <div className="text-[8px] text-gray-500 text-center mb-2">
            No payment required
          </div>

          {/* Other Licenses */}
          <div className="mb-2">
            <div className="font-medium text-gray-700 mb-1">Other Options:</div>
            <div className="flex justify-between mb-1">
              <span>Standard</span>
              <span className="font-bold">$49</span>
            </div>
            <div className="flex justify-between">
              <span>Extended</span>
              <span className="font-bold">$149</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-[8px] text-gray-500 text-right">
            ID: V-1289 | L-FREE-1289
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLicenseCard;