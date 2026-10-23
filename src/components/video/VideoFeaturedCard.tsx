"use client";

import React from "react";
import Image from "next/image";
import { Play, Sparkles, Clock, Award, GraduationCap, CheckCircle2 } from "lucide-react";
import { VideoItem } from "@/data/videos";
import { Button } from "@/components/ui/button/Button";

interface VideoFeaturedCardProps {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
}

export const VideoFeaturedCard: React.FC<VideoFeaturedCardProps> = ({ video, onPlay }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#071D36] via-[#0D2F57] to-[#1456B8] border border-blue-400/25 shadow-2xl text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
        {/* Left Column: Video Poster Preview (Interactive) */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onPlay(video)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPlay(video);
              }
            }}
            aria-label={`Play featured video: ${video.title}`}
            className="group relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 hover:border-amber-400/80 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
          >
            <Image
              src={video.posterSrc}
              alt={video.title}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

            {/* Glowing Big Play Trigger */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <span>DIRECTOR'S OFFICE</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{video.duration}</span>
              </span>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-xs font-bold text-emerald-300">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>{video.institution}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FEATURED ACADEMY PRODUCTION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {video.title}
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            {video.description}
          </p>

          {/* Key Discussion Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="block text-white font-semibold">Strategic Routine</strong>
                <span className="text-slate-300">How Shobhit balanced 14+ hours of self-study & testing.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="block text-white font-semibold">Doubt Clearance</strong>
                <span className="text-slate-300">Direct mentoring and personal feedback from Directors.</span>
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={() => onPlay(video)}
              leftIcon={<Play className="w-5 h-5 fill-white" />}
              className="font-bold text-sm sm:text-base shadow-lg shadow-orange-500/20"
            >
              Watch Full Interview ({video.duration})
            </Button>

            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Authentic felicitation inside Emprise Academy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
