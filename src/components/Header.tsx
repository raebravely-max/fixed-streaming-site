import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0F19]">

      {/* Logo */}
      <div className="text-white text-xl font-bold">
        SportStream
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {user && (
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">

            {/* Email */}
            <div className="text-sm text-white">
              {user.email}
            </div>

            {/* Trial Badge */}
            {user.isTrialing && user.trialDaysRemaining !== null && (
              <div
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  user.trialDaysRemaining <= 2
                    ? "bg-red-600 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                Trial: {user.trialDaysRemaining} day
                {user.trialDaysRemaining !== 1 && "s"} left
              </div>
            )}

            {/* Paid PRO Badge */}
            {!user.isTrialing && user.isPro && (
              <div className="text-xs font-bold px-3 py-1 rounded-full bg-green-600 text-white">
                PRO MEMBER
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={signOut}
              className="ml-2 text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Header;