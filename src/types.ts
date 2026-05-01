export interface Event {
  id: string;
  title: string;
  category: string;
  teams: {
    home: string;
    away: string;
    homeLogo: string;
    awayLogo: string;
  };
  score?: {
    home: number;
    away: number;
  };
  status: "live" | "upcoming" | "finished";
  time: string;
  thumbnail: string;
  viewerCount?: string;

  // ✅ Multi-stream support
  streamUrls?: string[];
}