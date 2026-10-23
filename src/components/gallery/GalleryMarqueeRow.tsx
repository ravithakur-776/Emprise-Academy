"use client";

import React from "react";
import { GalleryImage } from "@/data/gallery";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { cn } from "@/lib/utils";

export interface GalleryMarqueeRowProps {
  images: GalleryImage[];
  direction?: "left" | "right";
  onImageClick: (image: GalleryImage) => void;
  className?: string;
  speedClass?: string;
}

export const GalleryMarqueeRow: React.FC<GalleryMarqueeRowProps> = ({
  images,
  direction = "left",
  onImageClick,
  className,
}) => {
  if (!images || images.length === 0) return null;

  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden pause-on-hover py-1.5 focus-within:[&_.animate-marquee-left]:[animation-play-state:paused] focus-within:[&_.animate-marquee-right]:[animation-play-state:paused]",
        className
      )}
    >
      <div className={cn("flex gap-3 sm:gap-4.5 will-change-transform", animationClass)}>
        {/* Set 1 */}
        <div className="flex gap-3 sm:gap-4.5 shrink-0">
          {images.map((img, idx) => (
            <GalleryCard
              key={`set1-${img.id}`}
              image={img}
              onClick={() => onImageClick(img)}
              priority={false}
            />
          ))}
        </div>

        {/* Set 2 (Duplicate for Seamless Continuous Looping) */}
        <div className="flex gap-3 sm:gap-4.5 shrink-0" aria-hidden="true">
          {images.map((img) => (
            <GalleryCard
              key={`set2-${img.id}`}
              image={img}
              onClick={() => onImageClick(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
