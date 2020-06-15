import { FETCH_USER_DATA,
  SET_USER_DATA,
  FETCH_USER_PLAYLISTS,
  SET_USER_PLAYLISTS,
  FETCH_USER_RECENT_SONGS,
  SET_USER_RECENT_SONGS,
  SET_SELECTED_SONG_ID,
  SET_SELECTED_SONG_FEATURES,
} from '../types';
import { UserData, Playlist, Track, AudioFeatures } from '../../constants/types';

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA
  }
}

export function setUserData(userData: UserData) {
  return {
    type: SET_USER_DATA,
    payload: userData
  }
}

export function fetchUserPlaylists() {
  return {
    type: FETCH_USER_PLAYLISTS,
  }
}

export function setUserPlaylists(playlists: Playlist[]) {
  return {
    type: SET_USER_PLAYLISTS,
    payload: playlists
  }
}

export function fetchUserRecentSongs() {
  return {
    type: FETCH_USER_RECENT_SONGS,
  }
}

export function setUserRecentSongs(songs: Track[]) {
  return {
    type: SET_USER_RECENT_SONGS,
    payload: songs
  }
}

export function setSelectedSongId(songId: string) {
  return {
    type: SET_SELECTED_SONG_ID,
    payload: songId
  }
}

export function setSelectedSongFeatures(features: AudioFeatures) {
  return {
    type: SET_SELECTED_SONG_FEATURES,
    payload: features
  }
}