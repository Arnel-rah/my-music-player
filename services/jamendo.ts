const CLIENT_ID = "ceeaf031";
const BASE = "https://api.jamendo.com/v3.0";

const getRandomOffset = () => Math.floor(Math.random() * 100);

export const getFeaturedTracks = async (tag?: string): Promise<any[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&boost=popularity_total${genreFilter}&offset=${getRandomOffset()}`
  );
  const data = await res.json();
  return data.results ?? [];
};

export const getNewAlbums = async (tag?: string): Promise<any[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/albums/?client_id=${CLIENT_ID}&format=json&limit=10&orderby=releasedate_desc${genreFilter}&offset=${getRandomOffset()}`
  );
  const data = await res.json();
  return data.results ?? [];
};

export const getTrendingTracks = async (tag?: string): Promise<any[]> => {
  const genreFilter = tag ? `&tags=${tag}` : "";
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&boost=popularity_week${genreFilter}&offset=${getRandomOffset()}`
  );
  const data = await res.json();
  return data.results ?? [];
};