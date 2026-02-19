const CLIENT_ID = "ceeaf031";
const BASE = "https://api.jamendo.com/v3.0";

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

export const getFeaturedTracks = async (tag?: string): Promise<JamendoTrack[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&boost=popularity_total&include=musicinfo${genreFilter}`
  );
  const data = await res.json();
  return data.results ?? [];
};

export const getNewAlbums = async (tag?: string): Promise<JamendoAlbum[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/albums/?client_id=${CLIENT_ID}&format=json&limit=10&orderby=releasedate_desc${genreFilter}`
  );
  const data = await res.json();
  return data.results ?? [];
};

export const getTrendingTracks = async (tag?: string): Promise<JamendoTrack[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&boost=popularity_week&include=musicinfo${genreFilter}`
  );
  const data = await res.json();
  return data.results ?? [];
};