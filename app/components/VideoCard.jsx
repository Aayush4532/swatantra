import React, { useRef, useState, useEffect, useCallback } from "react";

const VideoCard = ({ title, views, timeAgo, thumbnail, duration, videoSrc }) => {
  const videoRef = useRef(null);
  const hoverRef = useRef(false);       // track करता है कि अभी भी hover हो रहा है या नहीं
  const timeoutRef = useRef(null);     // delayed play के timeout के लिए

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // hover शुरू होते ही 200ms बाद play करें, अगर अभी भी hover है तो
  const handleMouseEnter = () => {
    hoverRef.current = true;

    // पहले से कोई timeout चल रहा हो तो उसे cancel कर दें
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // अगर अभी भी hover में है, तभी प्ले करें
      if (hoverRef.current && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200); // 200ms delay
  };

  // hover छोड़ते ही वीडियो रोक दें और timeout cancel करें
  const handleMouseLeave = () => {
    hoverRef.current = false;
    clearTimeout(timeoutRef.current);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true; // हमेशा mute कर दें hover छोड़ने पर
    }
    setIsPlaying(false);
    setIsMuted(true);
  };

  // mute/unmute toggle (button या keyboard से)
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMute = !isMuted;
      videoRef.current.muted = newMute;
      setIsMuted(newMute);
    }
  }, [isMuted]);

  // Keyboard shortcut: M दबाने पर mute/unmute toggle हो
  useEffect(() => {
    const handleKeyDown = (e) => {
      // अगर कोई input या textarea में फ़ोकस हो, तो ignore करें
      const active = document.activeElement;
      if (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable
      ) {
        return;
      }
      if (e.key.toLowerCase() === "m") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMute]);

  return (
    <div
      className="relative rounded overflow-hidden shadow hover:shadow-lg transition duration-200 cursor-pointer bg-white"
    >
      <div
        className="relative aspect-video bg-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* अगर वीडियो नहीं चल रहा तो थंबनेल दिखाएँ */}
        {!isPlaying && (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        )}

        {/* वीडियो प्ले कराएँ जब isPlaying true हो */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            isPlaying ? "block" : "hidden"
          }`}
        />

        {/* Duration label */}
        <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
          {duration}
        </span>

        {/* Mute/Unmute Button (केवल तब दिखाएँ जब वीडियो चल रहा हो) */}
        {isPlaying && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // parent hover event block न हो
              toggleMute();
            }}
            className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded hover:bg-opacity-90 transition"
          >
            {isMuted ? "Unmute 🔇" : "Mute 🔊"}
          </button>
        )}
      </div>

      {/* नीचे title, views और timeAgo */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">
          {views} • {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;