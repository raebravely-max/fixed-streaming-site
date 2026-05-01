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

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentStream);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, () => {
        if (
          event.streamUrls &&
          currentStreamIndex < event.streamUrls.length - 1
        ) {
          setCurrentStreamIndex((prev) => prev + 1);
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = currentStream;
    }
  }, [currentStreamIndex, currentStream, event.streamUrls]);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h2 className="font-bold text-lg">{event.title}</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full max-h-[75vh]"
        />

        {/* ✅ Stream Switching */}
        {event.streamUrls && event.streamUrls.length > 1 && (
          <div className="flex flex-col items-center gap-3 mt-4">

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
            ) : user ? (
              <button
                onClick={onLoginRequired}
                className="px-5 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
              >
                Upgrade to Pro to switch streams
              </button>
            ) : (
              <button
                onClick={onLoginRequired}
                className="px-5 py-2 bg-blue-600 font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Login to unlock stream switching
              </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;