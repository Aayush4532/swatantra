import React from "react";
import Link from "next/link";

const VideoCard = ({ id, title, views, timeAgo, thumbnail, duration }) => {
  return (
    <Link href={`/watch/${id}`}>
      <div className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
            {duration}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600">
            {views} • {timeAgo}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;