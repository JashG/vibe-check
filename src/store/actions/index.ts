import {  FETCH_USER_DATA,
  SET_USER_DATA,
  FETCH_USER_PLAYLISTS,
  SET_USER_PLAYLISTS
} from '../types';
import { UserData, Playlist } from '../../constants/types';

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