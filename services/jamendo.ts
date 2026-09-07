const CLIENT_ID = "ceeaf031";
const BASE = "https://api.jamendo.com/v3.0";

const getRandomOffset = () => Math.floor(Math.random() * 100);

export interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_name: string;
  album_image: string;
  audio: string;
  shareurl: string;
}

export interface JamendoAlbum {
  id: string;
  name: string;
  artist_name: string;
  image: string;
  releasedate: string;
}

interface JamendoResponse<T> {
  results?: T[];
}

const fetchJamendo = async <T>(
  endpoint: "tracks" | "albums",
  params: Record<string, string | number | undefined>
): Promise<T[]> => {
  const searchParams = new URLSearchParams({
    client_id: CLIENT_ID,
    format: "json",
  });

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const res = await fetch(`${BASE}/${endpoint}/?${searchParams.toString()}`);

  if (!res.ok) {
    throw new Error(`Jamendo API error (${endpoint}): ${res.status} ${res.statusText}`);
  }

  const data: JamendoResponse<T> = await res.json();
  return data.results ?? [];
};

export const getFeaturedTracks = (tag?: string): Promise<JamendoTrack[]> =>
  fetchJamendo<JamendoTrack>("tracks", {
    limit: 10,
    boost: "popularity_total",
    tags: tag,
    offset: getRandomOffset(),
  });

export const getNewAlbums = (tag?: string): Promise<JamendoAlbum[]> =>
  fetchJamendo<JamendoAlbum>("albums", {
    limit: 10,
    orderby: "releasedate_desc",
    tags: tag,
    offset: getRandomOffset(),
  });

export const getTrendingTracks = (tag?: string): Promise<JamendoTrack[]> =>
  fetchJamendo<JamendoTrack>("tracks", {
    limit: 10,
    boost: "popularity_week",
    tags: tag,
    offset: getRandomOffset(),
  });

export const getTracksByGenre = (genre: string): Promise<JamendoTrack[]> =>
  fetchJamendo<JamendoTrack>("tracks", {
    limit: 20,
    tags: genre,
    boost: "popularity_total",
    offset: getRandomOffset(),
  });

export const searchTracks = (query: string): Promise<JamendoTrack[]> =>
  fetchJamendo<JamendoTrack>("tracks", {
    limit: 20,
    search: query,
  });