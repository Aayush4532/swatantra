// RelatedCard.jsx
import React from "react";

const RelatedCard = ({ thumbnail, title, uploader, duration }) => {
  return (
    <div className="flex cursor-pointer items-center bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition duration-200 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-28 h-16 flex-shrink-0 overflow-hidden rounded-l-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-opacity duration-200">
          <svg
            className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-200"
            fill="currentColor"
            viewBox="0 0 84 84"
          >
            <circle cx="42" cy="42" r="42" fill="currentColor" opacity="0.6" />
            <polygon points="34,28 34,56 58,42" fill="white" />
          </svg>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-1 right-1 bg-blue-800 bg-opacity-80 text-white text-[10px] px-1 rounded">
          {duration}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 px-3 py-2">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <div className="flex items-center mt-1">
          <svg
            className="w-4 h-4 text-blue-600 mr-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zM12 14.2c-3.3 0-9.8 1.7-9.8 5v2.2h19.6V19c0-3.3-6.5-5-9.8-5z" />
          </svg>
          <p className="text-[10px] text-blue-600 truncate">{uploader}</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedCard;