import { Search, Bell, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
interface HeaderProps {
  onSearch: (term: string) => void;
  onLoginClick: () => void;
}

export const Header = ({ onSearch, onLoginClick }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 border-b border-white/10 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">

      {/* ================= SEARCH ================= */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for sports, teams or events..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0b]"></span>
        </button>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* User Info */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-white truncate max-w-[140px]">
                {user.email}
              </span>

              {user.isPro && (
                <span className="text-xs text-yellow-400 font-bold tracking-wide">
                  PRO MEMBER
                </span>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-xs px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-5 py-2 rounded-full bg-blue-600 font-semibold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};