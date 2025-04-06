import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, VolumeX, Volume2, Maximize, Minimize } from "react-feather";

function FullVideoPlayer({ chapter, onVideoComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);
    const handleLoadedMetadata = () => setDuration(videoElement.duration);
    const handleVideoEnd = () => {
      setIsPlaying(false);
      if (onVideoComplete) {
        onVideoComplete(chapter);
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [chapter, onVideoComplete]);

  useEffect(() => {
    if (!isPlaying) return;
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);

    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      } else {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const videoSrc = chapter?.video?.url;

  if (!videoSrc) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg">
        <p className="text-gray-400">No video available</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
      <div
        className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden group"
        onMouseMove={() => {
          setShowControls(true);
          if (controlsTimeoutRef.current && isPlaying) {
            clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
          }
        }}
      >
        <video ref={videoRef} src={videoSrc} className="w-full h-full" onClick={togglePlay} />

        {/* Play/Pause Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <Play size={40} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                <motion.button onClick={togglePlay} className="text-white hover:text-gray-300 transition">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>

                <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>

                <motion.button onClick={toggleMute} className="text-white hover:text-gray-300 transition">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </motion.button>

                <motion.button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition ml-auto">
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default FullVideoPlayer;
