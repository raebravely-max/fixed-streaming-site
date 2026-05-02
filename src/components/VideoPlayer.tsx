import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { X } from "lucide-react";
import { Event } from "../types";
import { useAuth } from "../context/AuthContext";

interface Props {
  event: Event;
  onClose: () => void;
  onLoginRequired: () => void;
}

const VideoPlayer = ({ event, onClose, onLoginRequired }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const { user } = useAuth();

  const currentStream = event.streamUrls?.[currentStreamIndex];

  useEffect(() => {
    if (!currentStream || !videoRef.current) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(currentStream);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = currentStream;
    }

    return () => {
      if (hls) hls.destroy();
      video.pause();
      video.src = "";
    };
  }, [currentStream]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">

      {/* Modal Container */}
      <div className="w-[90%] max-w-5xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="font-bold text-lg text-white">
            {event.title}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Video */}
        <div className="p-6 flex flex-col items-center">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full max-h-[65vh] rounded-lg"
          />

          {/* Stream Switching */}
          {event.streamUrls && event.streamUrls.length > 1 && (
            <div className="mt-6 flex flex-col items-center gap-3">

              {user?.isPro ? (
                <div className="flex gap-3">
                  {event.streamUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStreamIndex(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                        currentStreamIndex === index
                          ? "bg-blue-600"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      Stream {index + 1}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={onLoginRequired}
                  className="px-5 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
                >
                  {user
                    ? "Upgrade to Pro to switch streams"
                    : "Login to unlock stream switching"}
                </button>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;