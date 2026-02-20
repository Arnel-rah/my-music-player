import { useEffect, useState, useCallback } from "react";
import {
  getFeaturedTracks,
  getTrendingTracks,
  getNewAlbums,
  getTracksByGenre,
  JamendoTrack,
  JamendoAlbum,
} from "@/services/jamendo";

export function useJamendo(genre: string = "All") {
  const [featured, setFeatured] = useState<JamendoTrack[]>([]);
  const [trending, setTrending] = useState<JamendoTrack[]>([]);
  const [albums, setAlbums] = useState<JamendoAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      if (genre === "All") {
        const [f, t, a] = await Promise.all([
          getFeaturedTracks(),
          getTrendingTracks(),
          getNewAlbums(),
        ]);
        setFeatured(f);
        setTrending(t);
        setAlbums(a);
      } else {
        const tracks = await getTracksByGenre(genre.toLowerCase());
        setFeatured(tracks);
        setTrending([]);
        setAlbums([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [genre]);

  useEffect(() => {
    load();
  }, [load]);

  return { featured, trending, albums, loading, refetch: load };
}