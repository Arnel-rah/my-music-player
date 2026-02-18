import { create } from "zustand";
import { Song } from "../types/music";

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  progress: number;

  play: (song: Song) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setQueue: (songs: Song[]) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  progress: 0,

  play: (song) => set({ currentSong: song, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  next: () => {
    const { queue, currentSong } = get();
    const index = queue.findIndex((s) => s.id === currentSong?.id);
    const nextSong = queue[index + 1];
    if (nextSong) set({ currentSong: nextSong });
  },
  previous: () => {
    const { queue, currentSong } = get();
    const index = queue.findIndex((s) => s.id === currentSong?.id);
    const prevSong = queue[index - 1];
    if (prevSong) set({ currentSong: prevSong });
  },
  setQueue: (songs) => set({ queue: songs }),
}));