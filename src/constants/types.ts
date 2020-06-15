export interface UserData {
  country: string,
  name: string,
  href: string,
  followers: number,
  picture: string,
  uri: string,
}

export interface Playlist {
  name: string,
  images: string[],
  tracks: {
    url: string,
    num: number
  }[],
  uri: string,
}

export interface Artist {
  name: string,
  id?: string,
}

export interface Album {
  artists: Artist[],
  externalUrl: string,
  images: AlbumImage[],
  name: string,
  releaseDate: string,
  numTracks: number,
}

export interface AlbumImage {
  height: string,
  width: string,
  url: string,
}

export interface Track {
  externalUrl: string,
  playedAt: string,
  album: Album,
  artists: Artist[],
  duration: number,
  name: string,
  id: number,
}

export interface AudioFeatures { 
  duration: number,
  mode: number,
  timeSignature: number,
  acousticness: number,
  danceability: number,
  energy: number,
  instrumentalness: number,
  liveness: number,
  loudness: number,
  speechiness: number,
  valence: number,
  tempo: number,
}

export interface PlayHistory {
  track: any, // TODO make interface for track
  playedAt: any // TODO figure out how to make ISO8601 timestamp into a type
  context: any
}