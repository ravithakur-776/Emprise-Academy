"use client";

import React, { useState, useMemo } from "react";
import { Search, Film, Sparkles, Filter, PlayCircle, Trophy, BookOpen } from "lucide-react";
import { OFFICIAL_VIDEOS, VIDEO_CATEGORIES, VideoCategory, VideoItem } from "@/data/videos";
import { VideoCard } from "@/components/video/VideoCard";
import { VideoFeaturedCard } from "@/components/video/VideoFeaturedCard";
import { VideoPlayerModal } from "@/components/video/VideoPlayerModal";
import { Button } from "@/components/ui/button/Button";

export const VideoGalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  // The featured video is the 5-minute Director Interview
  const featuredVideo = useMemo(() => {
    return OFFICIAL_VIDEOS.find((v) => v.isFeatured) || OFFICIAL_VIDEOS[0];
  }, []);

  // Filtered videos based on category and search query
  const filteredVideos = useMemo(() => {
    return OFFICIAL_VIDEOS.filter((video) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.studentName.toLowerCase().includes(query) ||
        video.institution.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.examTag.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Standard collection videos excluding the featured one when in 'all' view without search
  const gridVideos = useMemo(() => {
    if (selectedCategory === "all" && !searchQuery.trim()) {
      return OFFICIAL_VIDEOS.filter((v) => !v.isFeatured);
    }
    return filteredVideos;
  }, [selectedCategory, searchQuery, filteredVideos]);

  // Handle Play Modal Opening
  const handlePlayVideo = (video: VideoItem) => {
    const idx = OFFICIAL_VIDEOS.findIndex((v) => v.id === video.id);
    setActiveVideoIndex(idx !== -1 ? idx : 0);
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {VIDEO_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[var(--brand-primary)] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat.id === "all"
                    ? OFFICIAL_VIDEOS.length
                    : OFFICIAL_VIDEOS.filter((v) => v.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, IIT, AIIMS..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Featured Video Spotlight (Shown when viewing all videos or director sessions and no active search) */}
      {!searchQuery.trim() && (selectedCategory === "all" || selectedCategory === "director-sessions") && (
        <section aria-label="Featured Academy Video">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              FEATURED PRODUCTION & SPECIAL SESSION
            </h2>
          </div>
          <VideoFeaturedCard video={featuredVideo} onPlay={handlePlayVideo} />
        </section>
      )}

      {/* Main Video Collection Grid */}
      <section aria-label="Video Archives">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[var(--brand-primary)]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {searchQuery.trim()
                ? `Search Results (${filteredVideos.length})`
                : selectedCategory === "all"
                ? `Archived Video Chronicles (${gridVideos.length})`
                : `${VIDEO_CATEGORIES.find((c) => c.id === selectedCategory)?.label} (${filteredVideos.length})`}
            </h2>
          </div>

          <span className="text-xs text-slate-500">
            Showing {searchQuery.trim() ? filteredVideos.length : gridVideos.length} of {OFFICIAL_VIDEOS.length} Videos
          </span>
        </div>

        {/* Video Cards Grid */}
        {gridVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridVideos.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 border border-slate-200 max-w-lg mx-auto">
            <Film className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No videos found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No videos matched your filter &ldquo;{searchQuery}&rdquo;. Try another name, exam, or clear the search.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Modal Lightbox Video Player */}
      <VideoPlayerModal
        videos={OFFICIAL_VIDEOS}
        currentIndex={activeVideoIndex ?? 0}
        isOpen={activeVideoIndex !== null}
        onClose={() => setActiveVideoIndex(null)}
        onNavigate={(newIdx) => setActiveVideoIndex(newIdx)}
      />
    </div>
  );
};
