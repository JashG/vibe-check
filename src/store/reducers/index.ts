import { combineReducers } from 'redux'
import {  FETCH_USER_DATA,
          SET_USER_DATA,
          FETCH_USER_PLAYLISTS,
          SET_USER_PLAYLISTS,
          FETCH_USER_RECENT_SONGS,
          SET_USER_RECENT_SONGS
        } from '../types';
import { UserData, Playlist, Track } from '../../constants/types';

const initialUserData = {
  fetching: false,
  userData: {} as UserData
}

const initialUserPlaylists = {
  fetching: false,
  playlists: [] as Playlist[]
}

const initialUserRecentSongs = {
  fetching: false,
  songs: [] as Track[]
}

function userDataReducer(state = initialUserData, action: {type: string; payload?: UserData; }) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        fetching: true,
        userData: {}
      }

    case SET_USER_DATA:
      return {
        ...state,
        fetching: false,
        userData: action.payload
      }
  }
    
    return state;
}

function userPlaylistsReducer(state = initialUserPlaylists, action: {type: string; payload?: Playlist[]; }) {
  switch(action.type) {
    case FETCH_USER_PLAYLISTS:
      return {
        ...state,
        fetching: true,
        playlists: []
      }

    case SET_USER_PLAYLISTS:
      return {
        ...state,
        fetching: false,
        playlists: action.payload
      }
  }
    
    return state;
}

function userRecentSongsReducer(state = initialUserRecentSongs, action: {type: string; payload?: Track[]; }) {
  switch(action.type) {
    case FETCH_USER_RECENT_SONGS:
      return {
        ...state,
        fetching: true,
        songs: []
      }

    case SET_USER_RECENT_SONGS:
      return {
        ...state,
        fetching: false,
        songs: action.payload
      }
  }
    
    return state;
}

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userPlaylists: userPlaylistsReducer,
  userRecentSongs: userRecentSongsReducer,
});