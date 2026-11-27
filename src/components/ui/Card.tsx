import React from "react";
import { Play } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  type?: "playlist" | "artist";
  coverGradient: string;
  onPlay?: () => void;
}

export function Card({
  title,
  description,
  type = "playlist",
  coverGradient,
  onPlay,
}: CardProps) {
  return (
    <div className="group bg-spotify-elevated hover:bg-spotify-highlight p-4 rounded-xl transition-colors duration-200 cursor-pointer border border-transparent hover:border-border-subtle">
      <div className="relative mb-4">
        <div
          className={`w-full aspect-square bg-gradient-to-br ${coverGradient} shadow-lg flex items-center justify-center ${
            type === "artist" ? "rounded-full" : "rounded-lg"
          }`}
        >
          <span className="text-white/85 font-bold text-2xl select-none tracking-wider">
            {title.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
          aria-label={`Play ${title}`}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-accent text-black flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 hover:bg-spotify-accent-hover focus-visible:opacity-100"
        >
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
      </div>

      <h3 className="font-bold text-content-primary truncate">{title}</h3>
      <p className="text-sm text-content-secondary line-clamp-2 mt-1">
        {description}
      </p>
    </div>
  );
}