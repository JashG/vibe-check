import { FETCH_USER_DATA,
  SET_USER_DATA,
  FETCH_USER_PLAYLISTS,
  SET_USER_PLAYLISTS,
  FETCH_USER_RECENT_SONGS,
  SET_USER_RECENT_SONGS,
  ADD_SELECTED_SONG,
  ADD_SONG_TO_CACHE,
  REMOVE_SELECTED_SONG,
} from '../types';
import { UserData, Playlist, TrackSnippet, TrackAndAudio } from '../../constants/types';

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA,
  }
}

export function setUserData(userData: UserData) {
  return {
    type: SET_USER_DATA,
    payload: userData,
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
    payload: playlists,
  }
}

export function fetchUserRecentSongs() {
  return {
    type: FETCH_USER_RECENT_SONGS,
  }
}

export function setUserRecentSongs(songs: TrackSnippet[]) {
  return {
    type: SET_USER_RECENT_SONGS,
    payload: songs,
  }
}

export function addSelectedSong(song: TrackAndAudio) {
  return {
    type: ADD_SELECTED_SONG,
    payload: song,
  }
}

export function removeSelectedSong(songId: string) {
  return {
    type: REMOVE_SELECTED_SONG,
    payload: songId,
  }
}

export function addSongToCache(song: TrackAndAudio) {
  return {
    type: ADD_SONG_TO_CACHE,
    payload: song,
  }
}