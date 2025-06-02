import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const EnhancedVideoPlayer = ({
  url,
  initialPlaying = false,
  initialVolume = 0.8,
  className = "",
}) => {
  const playerRef = useRef(null);    
  const containerRef = useRef(null); 
  const [playing, setPlaying] = useState(initialPlaying);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const handleDuration = (duration) => {
    setDurationSeconds(duration);
  };
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  const handleKeyDown = (e) => {
    const active = document.activeElement;
    if (
      active.tagName === "INPUT" ||
      active.tagName === "TEXTAREA" ||
      active.isContentEditable
    ) {
      return;
    }

    switch (e.key) {
      case " ":
      case "k":
      case "K":
        e.preventDefault();
        setPlaying((prev) => !prev);
        break;

      case "j":
      case "J":
        e.preventDefault();
        if (playerRef.current) {
          const newTime = Math.max(playedSeconds - 10, 0);
          playerRef.current.seekTo(newTime, "seconds");
        }
        break;

      case "l":
      case "L":
        e.preventDefault();
        if (playerRef.current) {
          const newTime = Math.min(playedSeconds + 10, durationSeconds);
          playerRef.current.seekTo(newTime, "seconds");
        }
        break;

      case "ArrowLeft":
        e.preventDefault();
        if (playerRef.current) {
          const newTime = Math.max(playedSeconds - 5, 0);
          playerRef.current.seekTo(newTime, "seconds");
        }
        break;

      case "ArrowRight":
        e.preventDefault();
        if (playerRef.current) {
          const newTime = Math.min(playedSeconds + 5, durationSeconds);
          playerRef.current.seekTo(newTime, "seconds");
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        setVolume((prev) => {
          const nv = Math.min(prev + 0.1, 1);
          return nv;
        });
        setMuted(false);
        break;

      case "ArrowDown":
        e.preventDefault();
        setVolume((prev) => {
          const nv = Math.max(prev - 0.1, 0);
          if (nv === 0) setMuted(true);
          return nv;
        });
        break;

      case "m":
      case "M":
        e.preventDefault();
        setMuted((prev) => !prev);
        break;

      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;

      case "Home":
        e.preventDefault();
        playerRef.current?.seekTo(0, "seconds");
        break;

      case "End":
        e.preventDefault();
        playerRef.current?.seekTo(durationSeconds, "seconds");
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playedSeconds, durationSeconds]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black overflow-hidden ${className}`}
      style={{ paddingTop: "56.25%" /* 16:9 ratio */ }}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        controls={true}
        loop={false}
        volume={volume}
        muted={muted}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {Math.floor(playedSeconds)}s / {Math.floor(durationSeconds)}s
      </div>
    </div>
  );
};

export default EnhancedVideoPlayer;