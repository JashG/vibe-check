export interface UserData {
  country: String,
  name: String,
  href: String,
  followers: Number,
  picture: String,
  uri: String,
}

export interface Playlist {
  name: String,
  images: String[],
  tracks: {
    url: String,
    num: Number
  },
  uri: String,
}

export interface Artist {
  name: String,
  id?: String,
}

export interface Album {
  artists: Artist[],
  externalUrl: String,
  images: AlbumImage[],
  name: String,
  releaseDate: String,
  numTracks: Number,
}

export interface AlbumImage {
  height: String,
  width: String,
  url: String,
}

export interface Track {
  externalUrl: String,
  playedAt: String,
  album: Album,
  artists: Artist[],
  duration: Number,
  name: String,
}

export interface PlayHistory {
  track: any, // TODO make interface for track
  playedAt: any // TODO figure out how to make ISO8601 timestamp into a type
  context: any
}