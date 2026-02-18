
export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number;
  cover: string;
  url: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  artist: Artist;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  albums: Album[];
}

export interface Playlist {
  id: string;
  title: string;
  cover?: string;
  songs: Song[];
  createdAt: Date;
}