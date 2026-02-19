import { useEffect, useState, useCallback } from "react";
import { getFeaturedTracks, getTrendingTracks, getNewAlbums } from "@/services/jamendo";

export function useJamendo(genre: string = "All") {
  const [featured, setFeatured] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const refetch = useCallback(() => {
    setRefreshSignal(prev => prev + 1);
  }, []);

  useEffect(() => {
    const loadData = async () => {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [genre, refreshSignal]);

  return { featured, trending, albums, loading, refetch };
}