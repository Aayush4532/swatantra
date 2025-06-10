"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const VideoPlayer = ({ src, poster, tracks = [], chapters = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [pipActive, setPipActive] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState(true);
  const [hoverThumbnailUrl, setHoverThumbnailUrl] = useState(null);
  const [hoverThumbnailPos, setHoverThumbnailPos] = useState({ left: 0, top: 0 });
  const [hoverPreviewTime, setHoverPreviewTime] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [overlayIcon, setOverlayIcon] = useState({ type: "play", visible: false });

  const overlayTimeout = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeout = useRef(null);
  const idleCursorTimeout = useRef(null);
  const progressBarRef = useRef(null);
  const stateRef = useRef();

  // Update state ref on every render
  useEffect(() => {
    stateRef.current = {
      volume,
      duration,
      playbackRate,
      pipActive,
      isFullscreen,
      isPlaying,
      activeSubtitle
    };
  });

  const defaultChapters = [
    { time: 0, title: "Intro" },
    { time: 30, title: "Getting Started" },
    { time: 75, title: "Deep Dive" },
    { time: 150, title: "Summary & Outro" },
  ];
  const chapterList = chapters.length ? chapters : defaultChapters;

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const resetCursorIdle = useCallback(() => {
    setShowCursor(true);
    clearTimeout(idleCursorTimeout.current);
    idleCursorTimeout.current = setTimeout(() => {
      setShowCursor(false);
    }, 1500);
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
      setOverlayIcon({ type: "pause", visible: true });
    } else {
      vid.pause();
      setIsPlaying(false);
      setOverlayIcon({ type: "play", visible: true });
    }
    showControlsTemporarily();
    resetCursorIdle();

    clearTimeout(overlayTimeout.current);
    overlayTimeout.current = setTimeout(() => {
      setOverlayIcon((prev) => ({ ...prev, visible: false }));
    }, 500);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
    if (!vid.muted && volume === 0) {
      setVolume(0.2);
      vid.volume = 0.2;
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const vid = videoRef.current;
    if (vid) {
      vid.volume = newVol;
      if (newVol > 0 && vid.muted) {
        vid.muted = false;
        setIsMuted(false);
      }
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    const vid = videoRef.current;
    if (vid) {
      const dur = vid.duration || duration;
      if (dur > 0) {
        vid.currentTime = (newProgress / 100) * dur;
      }
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  const skip = (seconds) => {
    const vid = videoRef.current;
    if (!vid) return;
    const dur = vid.duration || duration;
    if (dur > 0) {
      vid.currentTime = Math.min(
        Math.max(0, vid.currentTime + seconds),
        dur
      );
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  const changePlaybackRate = (rate) => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.playbackRate = rate;
    setPlaybackRate(rate);
    showControlsTemporarily();
    resetCursorIdle();
  };

  const toggleSubtitles = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const track = vid.textTracks[0];
    if (track) {
      const newMode = track.mode === "showing" ? "hidden" : "showing";
      track.mode = newMode;
      setActiveSubtitle(newMode === "showing");
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  const togglePIP = async () => {
    const vid = videoRef.current;
    if (!vid || !document.pictureInPictureEnabled) return;
    try {
      if (pipActive) {
        await document.exitPictureInPicture();
        setPipActive(false);
      } else {
        await vid.requestPictureInPicture();
        setPipActive(true);
      }
      showControlsTemporarily();
      resetCursorIdle();
    } catch {}
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    if (!isFullscreen) {
      if (player.requestFullscreen) player.requestFullscreen();
      else if (player.webkitRequestFullscreen) player.webkitRequestFullscreen();
      else if (player.msRequestFullscreen) player.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
    showControlsTemporarily();
    resetCursorIdle();
  };

  const handleKeyDown = useCallback((e) => {
    // Skip if focused on form elements
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') {
      return;
    }
    
    const vid = videoRef.current;
    if (!vid) return;
    
    const state = stateRef.current;
    const { duration } = state;

    switch (e.code) {
      case "Space":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (duration > 0) skip(5);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (duration > 0) skip(-5);
        break;
      case "ArrowUp":
        e.preventDefault();
        handleVolumeChange({ target: { value: Math.min(1, state.volume + 0.05) } });
        break;
      case "ArrowDown":
        e.preventDefault();
        handleVolumeChange({ target: { value: Math.max(0, state.volume - 0.05) } });
        break;
      case "KeyM":
        toggleMute();
        break;
      case "KeyJ":
        if (duration > 0) skip(-10);
        break;
      case "KeyL":
        if (duration > 0) skip(10);
        break;
      case "KeyK":
        togglePlay();
        break;
      case "Comma":
        changePlaybackRate(Math.max(0.5, state.playbackRate - 0.25));
        break;
      case "Period":
        changePlaybackRate(Math.min(2, state.playbackRate + 0.25));
        break;
      case "KeyP":
        togglePIP();
        break;
      case "KeyF":
        toggleFullscreen();
        break;
      case "Slash":
        if (e.shiftKey) {
          setShowShortcutHelp((prev) => !prev);
        }
        break;
      case "KeyS":
        toggleSubtitles();
        break;
      default:
        // Number keys 0–9 for 0%–90%
        if (/Digit[0-9]/.test(e.code) && duration > 0) {
          const num = parseInt(e.code.slice(5), 10);
          vid.currentTime = (num / 10) * duration;
        }
        break;
    }
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onLoadedMetadata = () => setDuration(vid.duration);
    const onTimeUpdate = () => {
      setCurrentTime(vid.currentTime);
      if (vid.duration > 0) setProgress((vid.currentTime / vid.duration) * 100);
      const bf = vid.buffered;
      if (bf.length) {
        const bufferedEnd = bf.end(bf.length - 1);
        setBufferedProgress((bufferedEnd / vid.duration) * 100);
      }
    };
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    vid.addEventListener("loadedmetadata", onLoadedMetadata);
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("waiting", onWaiting);
    vid.addEventListener("playing", onPlaying);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onEnded);

    // initialize settings
    vid.volume = volume;
    vid.muted = isMuted;
    vid.playbackRate = playbackRate;

    const onFsChange = () => {
      const fsElem =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fsElem);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("msfullscreenchange", onFsChange);

    return () => {
      vid.removeEventListener("loadedmetadata", onLoadedMetadata);
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("waiting", onWaiting);
      vid.removeEventListener("playing", onPlaying);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      document.removeEventListener("msfullscreenchange", onFsChange);
      clearTimeout(controlsTimeout.current);
      clearTimeout(overlayTimeout.current);
    };
  }, [volume, isMuted, playbackRate]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onMouseMove = () => {
      showControlsTemporarily();
      resetCursorIdle();
    };
    player.addEventListener("mousemove", onMouseMove);
    return () => {
      player.removeEventListener("mousemove", onMouseMove);
      clearTimeout(controlsTimeout.current);
      clearTimeout(idleCursorTimeout.current);
    };
  }, [showControlsTemporarily, resetCursorIdle]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleProgressHover = (e) => {
    const barRect = progressBarRef.current.getBoundingClientRect();
    const hoverX = e.clientX - barRect.left;
    const percentage = Math.min(Math.max(0, hoverX / barRect.width), 1);
    const hoverTime = percentage * duration;
    setHoverPreviewTime(hoverTime);
    setHoverThumbnailUrl(
      `https://via.placeholder.com/160x90.png?text=${Math.floor(hoverTime)}s`
    );
    setHoverThumbnailPos({ left: hoverX - 80, top: -100 });
  };

  const clearPreview = () => setHoverThumbnailUrl(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    showControlsTemporarily();
    resetCursorIdle();
  };

  const handleChapterSelect = (e) => {
    const time = parseFloat(e.target.value);
    const vid = videoRef.current;
    if (!vid) return;
    const dur = vid.duration || duration;
    if (dur > 0) {
      vid.currentTime = time;
      setProgress((time / dur) * 100);
    }
    showControlsTemporarily();
    resetCursorIdle();
  };

  return (
    <div
      ref={playerRef}
      className={`relative w-[1120px] h-[630px] ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } overflow-hidden shadow-2xl rounded-br-xl rounded-bl-none ${
        showCursor ? "" : "cursor-none"
      } focus:outline-none`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        src={src}
        poster={poster}
        onClick={togglePlay}
      >
        {tracks.map((t) => (
          <track
            key={t.src}
            src={t.src}
            kind="subtitles"
            srcLang={t.lang}
            label={t.label}
            default={t.default}
          />
        ))}
      </video>

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-600"></div>
        </div>
      )}

      {/* Overlay Icon */}
      {overlayIcon.visible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-overlay flex items-center justify-center">
            {overlayIcon.type === "play" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Shortcut Help Overlay */}
      {showShortcutHelp && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } text-sm rounded-lg p-4 max-w-md mx-auto shadow-lg`}
          >
            <h3 className="text-lg font-semibold mb-2">Keyboard Shortcuts</h3>
            <ul className="space-y-1">
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">Space</kbd>{" "}
                Play/Pause
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">J</kbd>{" "}
                Skip -10s
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">K</kbd>{" "}
                Play/Pause
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">L</kbd>{" "}
                Skip +10s
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">←</kbd>{" "}
                Skip -5s
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">→</kbd>{" "}
                Skip +5s
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">↑</kbd> Vol
                +0.05
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">↓</kbd> Vol
                -0.05
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">M</kbd>{" "}
                Mute/Unmute
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">,</kbd>{" "}
                Speed -0.25×
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">.</kbd>{" "}
                Speed +0.25×
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">S</kbd>{" "}
                Subtitles On/Off
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">P</kbd> PiP
                On/Off
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">F</kbd>{" "}
                Fullscreen On/Off
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">?</kbd>{" "}
                Toggle this Help
              </li>
              <li>
                <kbd className="bg-gray-600 text-white px-1 rounded">0–9</kbd>{" "}
                Seek to 0%–90%
              </li>
            </ul>
            <button
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              onClick={() => setShowShortcutHelp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`
          absolute inset-0 
          flex flex-col justify-end 
          bg-gradient-to-t from-black/90 to-transparent 
          transition-opacity duration-300 
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Hover‐to‐Preview Thumbnail */}
        {hoverThumbnailUrl && (
          <img
            src={hoverThumbnailUrl}
            alt="Preview"
            className="absolute w-[160px] h-[90px] rounded-md shadow-lg"
            style={{
              left: hoverThumbnailPos.left,
              top: hoverThumbnailPos.top,
            }}
          />
        )}

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="relative w-full h-px cursor-pointer"
          onMouseMove={handleProgressHover}
          onMouseLeave={clearPreview}
        >
          <div className="absolute w-full h-px bg-gray-700 z-10">
            <div
              className="h-full bg-gray-600"
              style={{ width: `${bufferedProgress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute w-full h-px opacity-0 z-20 cursor-pointer"
          />
          <div
            className="absolute h-px bg-sky-500 z-20"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-sky-400 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Mute/Volume */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-sky-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-px accent-sky-500 cursor-pointer"
                aria-label="Volume"
              />
            </div>

            <div
              className={`text-sm font-mono ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Subtitles Toggle */}
            <button
              onClick={toggleSubtitles}
              className="text-white hover:text-sky-400 transition-colors"
              aria-label="Toggle Subtitles"
            >
              {activeSubtitle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm1 2h12v2H4V6zm0 4h8v2H4v-2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h14 a1 1 0 001-1V5a1 1 0 00-1-1H3zm2 6h2v2H5v-2zm0-4h10v2H5V6zm0 8h6v2H5v-2z" />
                </svg>
              )}
            </button>

            {/* Chapter Dropdown */}
            <select
              onChange={handleChapterSelect}
              className={`text-xs rounded px-2 py-1 hover:bg-gray-700 transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              aria-label="Chapters"
              defaultValue=""
            >
              <option value="" disabled>
                Chapters
              </option>
              {chapterList.map((ch, idx) => (
                <option key={idx} value={ch.time}>
                  {ch.title} ({formatTime(ch.time)})
                </option>
              ))}
            </select>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => skip(-10)}
              className="text-white hover:text-sky-400 transition-colors hidden md:block"
              aria-label="Skip backward 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white hover:text-sky-400 transition-colors hidden md:block"
              aria-label="Skip forward 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </button>

            <button
              onClick={togglePIP}
              className="text-white hover:text-sky-400 transition-colors hidden md:block"
              aria-label={pipActive ? "Exit PiP" : "Enter PiP"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    pipActive
                      ? "M5 17h14M5 12h14M5 7h14"
                      : "M4 4h16v16H4V4z M8 16h8V8H8v8z"
                  }
                />
              </svg>
            </button>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-sky-400 transition-colors hidden md:block"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M4 4h6v2H6v4H4V4zm16 0v6h-2V6h-4V4h6zm0 16h-6v-2h4v-4h2v6zM4 20v-6h2v4h4v2H4z" />
                </svg>
              )}
            </button>

            <select
              value={playbackRate}
              onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
              className={`text-xs rounded px-2 py-1 hover:bg-gray-700 transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              aria-label="Playback Speed"
            >
              <option value={0.5}>0.5×</option>
              <option value={0.75}>0.75×</option>
              <option value={1}>1×</option>
              <option value={1.25}>1.25×</option>
              <option value={1.5}>1.5×</option>
              <option value={2}>2×</option>
            </select>

            <button
              onClick={toggleTheme}
              className="text-white hover:text-sky-400 transition-colors hidden md:block"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-9h-1M3 12H2m15.364-7.364l-.707.707M6.343 17.657l-.707.707m0-13.414l.707.707M17.657 17.657l.707.707M12 5a7 7 0 000 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes overlay-anim {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          10% {
            opacity: 1;
            transform: scale(1.2);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        .animate-overlay {
          animation: overlay-anim 600ms ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;