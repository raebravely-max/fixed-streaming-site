import { NavLink } from "react-router-dom";
import {
  Home,
  Trophy,
  Calendar,
  Settings,
  Heart,
  TrendingUp,
  Tv
} from "lucide-react";

interface SidebarProps {
  onUpgradeClick: () => void;
}

export const Sidebar = ({ onUpgradeClick }: SidebarProps) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-[#0a0a0b] border-r border-white/10 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 mb-8 cursor-pointer"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Trophy className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            SportStream
          </span>
        </NavLink>

        <nav className="space-y-1">
          <NavLink to="/" className={linkClasses}>
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </NavLink>

          <NavLink to="/live" className={linkClasses}>
            <Tv className="w-5 h-5" />
            <span className="font-medium">Live Now</span>
          </NavLink>

          <NavLink to="/schedule" className={linkClasses}>
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Schedule</span>
          </NavLink>

          <NavLink to="/tournaments" className={linkClasses}>
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Tournaments</span>
          </NavLink>

          <NavLink to="/favorites" className={linkClasses}>
            <Heart className="w-5 h-5" />
            <span className="font-medium">Favorites</span>
          </NavLink>

          <NavLink to="/trending" className={linkClasses}>
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Trending</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl relative overflow-hidden">
          <p className="text-sm font-semibold text-white mb-1">
            Upgrade to Pro
          </p>
          <p className="text-xs text-blue-100 mb-3">
            Get ad-free streaming and 4K quality
          </p>

          {/* ✅ Upgrade Button Connected */}
          <button
            onClick={onUpgradeClick}
            className="w-full py-2 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Pro
          </button>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};