import { Play } from "lucide-react";

interface PromoBannerProps {
  onWatch: () => void;
}

export const PromoBanner = ({ onWatch }: PromoBannerProps) => {
  return (
    <div className="relative h-80 rounded-[2rem] overflow-hidden mb-8 group">
      <img
        src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=1600&q=80"
        alt="Featured"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-[0.2em]">
            Featured Event
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              Live Now
            </span>
          </span>
        </div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Champions League <br />
          <span className="text-blue-500">Final Showdown</span>
        </h1>

        <p className="text-gray-300 text-lg mb-8 max-w-md">
          Experience the thrill of Europe's elite football competition in
          stunning 4K resolution.
        </p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onWatch()}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Stream
          </button>

          <button
            type="button"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all backdrop-blur-md"
          >
            View Stats
          </button>
        </div>
      </div>
    </div>
  );
};