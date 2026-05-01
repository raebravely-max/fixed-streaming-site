import { Play, Users, Heart } from "lucide-react";
import { Event } from "../types";

interface LiveEventCardProps {
  event: Event;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export const LiveEventCard = ({
  event,
  onFavorite,
  isFavorited,
}: LiveEventCardProps) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
      
      {/* FAVORITE BUTTON */}
      {onFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>
      )}

      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-red-600 text-[10px] font-bold text-white px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Live
          </span>
          <span className="bg-black/50 backdrop-blur-md text-[10px] font-bold text-white px-2 py-1 rounded uppercase tracking-wider">
            {event.category}
          </span>
        </div>

        {event.viewerCount && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1.5">
            <Users className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-white">
              {event.viewerCount}
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-600/40">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={event.teams.homeLogo}
              alt={event.teams.home}
              className="w-8 h-8 rounded-full border border-white/10"
            />
            <span className="text-sm font-bold text-white uppercase">
              {event.teams.home}
            </span>
          </div>

          <div className="px-3 py-1 bg-white/10 rounded text-blue-400 font-mono text-sm font-bold">
            {event.score
              ? `${event.score.home} - ${event.score.away}`
              : "VS"}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white uppercase">
              {event.teams.away}
            </span>
            <img
              src={event.teams.awayLogo}
              alt={event.teams.away}
              className="w-8 h-8 rounded-full border border-white/10"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 font-medium truncate pr-4">
            {event.title}
          </p>
          <span className="text-xs text-blue-500 font-bold whitespace-nowrap">
            {event.time}
          </span>
        </div>
      </div>
    </div>
  );
};