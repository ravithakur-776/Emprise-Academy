"use client";

import React from "react";
import Image from "next/image";
import { Play, Clock, Award, GraduationCap } from "lucide-react";
import { VideoItem } from "@/data/videos";

interface VideoCardProps {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(video);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPlay(video)}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/50 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
      aria-label={`Play video: ${video.title}`}
    >
      {/* Video Poster Thumbnail Container */}
      <div className="relative w-full aspect-[3/4] bg-slate-900 overflow-hidden">
        <Image
          src={video.posterSrc}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={false}
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wide shadow-sm">
            <Award className="w-3 h-3 text-[var(--brand-accent)]" />
            <span>{video.examTag}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{video.duration}</span>
          </span>
        </div>

        {/* Central Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[var(--brand-accent)] group-hover:border-[var(--brand-accent)] transition-all duration-300">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5 text-white" />
          </div>
        </div>

        {/* Bottom Card Identity Strip on Image */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/20 mb-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{video.institution}</span>
          </div>
          <h3 className="text-white text-base font-bold leading-snug line-clamp-2 drop-shadow-sm group-hover:text-amber-200 transition-colors">
            {video.title}
          </h3>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {video.description}
        </p>

        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
            {video.studentName}
          </span>
          <span className="text-[var(--brand-primary)] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Watch Video →
          </span>
        </div>
      </div>
    </div>
  );
};
