import { useEffect, useState } from "react";
import {
  getFeaturedTracks,
  getTrendingTracks,
  getNewAlbums,
  JamendoTrack,
  JamendoAlbum,
} from "@/services/jamendo";

export function useHomeData(genre: string = "All") {
  const [featured, setFeatured] = useState<JamendoTrack[]>([]);
  const [trending, setTrending] = useState<JamendoTrack[]>([]);
  const [albums, setAlbums] = useState<JamendoAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const tag = genre === "All" ? undefined : genre.toLowerCase();
        const [f, t, a] = await Promise.all([
          getFeaturedTracks(tag),
          getTrendingTracks(tag),
          getNewAlbums(tag),
        ]);
        setFeatured(f);
        setTrending(t);
        setAlbums(a);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [genre]);

  return { featured, trending, albums, loading };
}