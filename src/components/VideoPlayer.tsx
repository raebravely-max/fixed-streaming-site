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
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const loadStream = async () => {
      if (!videoRef.current) return;

      if (!session) {
        onLoginRequired();
        return;
      }

      try {
        const response = await fetch("/api/stream", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          alert(err.error || "PRO subscription required");
          onClose();
          return;
        }

        const { streamUrl } = await response.json();

        if (!isMounted || !videoRef.current) return;

        const video = videoRef.current;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hlsRef.current = hls;

          hls.loadSource(streamUrl);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
            setLoading(false);
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS error:", data);
          });

        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;

          video.addEventListener("loadedmetadata", () => {
            video.play();
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Stream load error:", error);
        alert("Error loading stream");
        onClose();
      }
    };

    loadStream();

    return () => {
      isMounted = false;

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    };
  }, [session]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
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
        <div className="p-6 flex flex-col items-center relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10">
              Loading stream...
            </div>
          )}

          <video
            ref={videoRef}
            controls
            className="w-full max-h-[65vh] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;