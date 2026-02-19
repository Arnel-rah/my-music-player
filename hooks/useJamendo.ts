import { useEffect, useState } from "react";
import {
  getFeaturedTracks,
  getTrendingTracks,
  getNewAlbums,
  JamendoTrack,
  JamendoAlbum,
} from "@/services/jamendo";

export function useHomeData() {
  const [featured, setFeatured] = useState<JamendoTrack[]>([]);
  const [trending, setTrending] = useState<JamendoTrack[]>([]);
  const [albums, setAlbums] = useState<JamendoAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [f, t, a] = await Promise.all([
          getFeaturedTracks(),
          getTrendingTracks(),
          getNewAlbums(),
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
  }, []);

  return { featured, trending, albums, loading };
}