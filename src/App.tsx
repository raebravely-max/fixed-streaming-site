import { useState, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PromoBanner } from "./components/PromoBanner";
import { LiveEventCard } from "./components/LiveEventCard";
import { ScheduleCard } from "./components/ScheduleCard";
import VideoPlayer from "./components/VideoPlayer";
import { LoginModal } from "./components/LoginModal";
import { UpgradeModal } from "./components/UpgradeModal";
import { LIVE_EVENTS, UPCOMING_EVENTS } from "./data";
import { Event } from "./types";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [activeStream, setActiveStream] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { user, upgradeToPro } = useAuth();
  const [searchParams] = useSearchParams();

  // ✅ Detect Stripe successful payment redirect
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      upgradeToPro();

      // remove ?success=true from URL after upgrading
      window.history.replaceState({}, document.title, "/");
    }
  }, [searchParams, upgradeToPro]);

  // ✅ Persistent Favorites
  const [favorites, setFavorites] = useState<Event[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (event: Event) => {
    setFavorites((prev) => {
      const exists = prev.find((e) => e.id === event.id);

      const updated = exists
        ? prev.filter((e) => e.id !== event.id)
        : [...prev, event];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredEvents = LIVE_EVENTS.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ✅ LOGIN MODAL */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      {/* ✅ UPGRADE MODAL */}
      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />

      {/* ✅ VIDEO MODAL */}
      {activeStream && (
        <VideoPlayer
          event={activeStream}
          onClose={() => setActiveStream(null)}
          onLoginRequired={() => {
            if (!user) {
              setShowLogin(true);
            } else {
              setShowUpgrade(true);
            }
          }}
        />
      )}

      <Sidebar onUpgradeClick={() => setShowUpgrade(true)} />

      <main className="pl-64">
        <Header
          onSearch={setSearchTerm}
          onLoginClick={() => setShowLogin(true)}
        />

        <div className="p-8 max-w-[1600px] mx-auto">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <PromoBanner
                    onWatch={() => setActiveStream(LIVE_EVENTS[0])}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mt-10">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setActiveStream(event)}
                      >
                        <LiveEventCard
                          event={event}
                          onFavorite={() => toggleFavorite(event)}
                          isFavorited={favorites.some(
                            (e) => e.id === event.id
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </>
              }
            />

            {/* LIVE */}
            <Route
              path="/live"
              element={
                <div className="space-y-8">
                  <h2 className="text-3xl font-black">Currently Live</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {LIVE_EVENTS.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setActiveStream(event)}
                      >
                        <LiveEventCard
                          event={event}
                          onFavorite={() => toggleFavorite(event)}
                          isFavorited={favorites.some(
                            (e) => e.id === event.id
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* SCHEDULE */}
            <Route
              path="/schedule"
              element={
                <div className="space-y-8">
                  <h2 className="text-3xl font-black">Upcoming Events</h2>

                  <div className="space-y-4">
                    {UPCOMING_EVENTS.map((event) => (
                      <ScheduleCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              }
            />

            {/* TOURNAMENTS */}
            <Route
              path="/tournaments"
              element={
                <div className="space-y-10">
                  <h2 className="text-3xl font-black">Tournaments</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-2">
                        Champions League
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Europe’s elite football competition.
                      </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-2">NBA Playoffs</h3>
                      <p className="text-gray-400 text-sm">
                        Battle for basketball supremacy.
                      </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-2">
                        Formula 1 Championship
                      </h3>
                      <p className="text-gray-400 text-sm">
                        High-speed global racing action.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            {/* TRENDING */}
            <Route
              path="/trending"
              element={
                <div className="space-y-8">
                  <h2 className="text-3xl font-black">Trending Now</h2>

                  <p className="text-gray-400 text-sm">
                    Most watched live events right now.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {LIVE_EVENTS.slice(0, 6).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setActiveStream(event)}
                      >
                        <LiveEventCard
                          event={event}
                          onFavorite={() => toggleFavorite(event)}
                          isFavorited={favorites.some(
                            (e) => e.id === event.id
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* FAVORITES */}
            <Route
              path="/favorites"
              element={
                <div className="space-y-8">
                  <h2 className="text-3xl font-black">
                    Your Favorite Events
                  </h2>

                  {favorites.length === 0 ? (
                    <div className="text-gray-500 py-20 text-center">
                      No favorite events yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {favorites.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => setActiveStream(event)}
                        >
                          <LiveEventCard
                            event={event}
                            onFavorite={() => toggleFavorite(event)}
                            isFavorited={true}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <div className="text-center py-40 text-gray-500">
                  Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}