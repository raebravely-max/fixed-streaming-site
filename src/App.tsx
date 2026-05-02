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

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      upgradeToPro();
      window.history.replaceState({}, document.title, "/");
    }
  }, [searchParams, upgradeToPro]);

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
      <Sidebar onUpgradeClick={() => setShowUpgrade(true)} />

      <main className="pl-64">
        <Header
          onSearch={setSearchTerm}
          onLoginClick={() => setShowLogin(true)}
        />

        <div className="p-8 max-w-[1600px] mx-auto">
          <Routes>
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
          </Routes>
        </div>
      </main>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />

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
    </div>
  );
}