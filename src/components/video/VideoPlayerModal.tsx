"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Maximize, Award, GraduationCap, Clock } from "lucide-react";
import { VideoItem } from "@/data/videos";

interface VideoPlayerModalProps {
  videos: VideoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentVideo = videos[currentIndex];

  const handlePrev = useCallback(() => {
    if (videos.length === 0) return;
    onNavigate((currentIndex - 1 + videos.length) % videos.length);
  }, [currentIndex, videos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (videos.length === 0) return;
    onNavigate((currentIndex + 1) % videos.length);
  }, [currentIndex, videos.length, onNavigate]);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === " " && document.activeElement !== videoRef.current) {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Focus modal on open
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // Reset playback when current video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [currentIndex]);

  if (!isOpen || !currentVideo) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={currentVideo.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider text-slate-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {currentIndex + 1} of {videos.length} Videos
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/30 text-amber-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
            {currentVideo.examTag}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            aria-label="Close Video Player"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      {videos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Video"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-30 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Video"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-30 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Video & Content Container */}
      <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center p-3 sm:p-6 z-20 overflow-y-auto">
        <div className="relative w-full max-w-[460px] sm:max-w-[480px] md:max-w-[500px] aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/15">
          <video
            ref={videoRef}
            src={currentVideo.videoSrc}
            poster={currentVideo.posterSrc}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Information Metadata Card */}
        <div className="mt-4 w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[var(--brand-primary)]/80 text-white text-[11px] font-bold uppercase tracking-wider">
                {currentVideo.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {currentVideo.duration}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{currentVideo.institution}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentVideo.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {currentVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
