import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const VideoCard = ({
  id,
  title,
  views,
  timeAgo,
  thumbnail,
  duration,
  videoSrc,
}) => {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === "m" || e.key === "M") && isHovered) {
        setIsMuted((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch(() => {
        });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <Link href={`/watch/${id}`}>
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition duration-300 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full aspect-video bg-black">
          {!isHovered ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
            />
          )}
          <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-[10px] md:text-xs px-2 py-0.5 rounded-lg">
            {duration}
          </span>
          {isHovered && (
            <button
              onClick={toggleMute}
              className="absolute bottom-3 left-3 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition duration-200 p-2 rounded-full flex items-center justify-center focus:outline-none"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 9v6h4l5 5V4l-5 5h-4z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 9v6h4l5 5V4l-5 5h-4z" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                  <path d="M17.07 6.93a9 9 0 010 10.14" />
                </svg>
              )}
            </button>
          )}
        </div>
        <div className="px-4 py-3 bg-white">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            {views} • {timeAgo}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
