import { Event } from "./types";

export const CATEGORIES = [
  { id: "all", name: "All Sports" },
  { id: "football", name: "Football" },
  { id: "basketball", name: "Basketball" },
  { id: "tennis", name: "Tennis" },
  { id: "f1", name: "F1" },
  { id: "boxing", name: "Boxing" },
];

const TEST_STREAMS = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
];

export const LIVE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Premier League: Arsenal vs Man City",
    category: "Football",
    teams: {
      home: "Arsenal",
      away: "Man City",
      homeLogo:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
      awayLogo:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
    },
    score: { home: 2, away: 1 },
    status: "live",
    time: "65'",
    thumbnail:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    streamUrls: TEST_STREAMS,
    viewerCount: "1.2M",
  },
  {
    id: "2",
    title: "NBA Finals: Lakers vs Celtics",
    category: "Basketball",
    teams: {
      home: "Lakers",
      away: "Celtics",
      homeLogo:
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=100&h=100&fit=crop",
      awayLogo:
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=100&h=100&fit=crop",
    },
    score: { home: 98, away: 95 },
    status: "live",
    time: "Q4 04:20",
    thumbnail:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    streamUrls: TEST_STREAMS,
    viewerCount: "850K",
  },
  {
    id: "3",
    title: "Wimbledon Final",
    category: "Tennis",
    teams: {
      home: "Alcaraz",
      away: "Djokovic",
      homeLogo:
        "https://images.unsplash.com/photo-1595435064219-4911440f3536?w=100&h=100&fit=crop",
      awayLogo:
        "https://images.unsplash.com/photo-1595435064219-4911440f3536?w=100&h=100&fit=crop",
    },
    score: { home: 2, away: 1 },
    status: "live",
    time: "Set 4",
    thumbnail:
      "https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?w=800&q=80",
    streamUrls: TEST_STREAMS,
    viewerCount: "450K",
  },
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "4",
    title: "La Liga: Real Madrid vs Barcelona",
    category: "Football",
    teams: {
      home: "Real Madrid",
      away: "Barcelona",
      homeLogo:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
      awayLogo:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop",
    },
    status: "upcoming",
    time: "21:00",
    thumbnail:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    streamUrls: TEST_STREAMS,
  },
  {
    id: "5",
    title: "Monaco Grand Prix",
    category: "F1",
    teams: {
      home: "Red Bull",
      away: "Ferrari",
      homeLogo:
        "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=100&h=100&fit=crop",
      awayLogo:
        "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=100&h=100&fit=crop",
    },
    status: "upcoming",
    time: "Tomorrow",
    thumbnail:
      "https://images.unsplash.com/photo-1530681957458-53dec4c4458e?w=800&q=80",
    streamUrls: TEST_STREAMS,
  },
];