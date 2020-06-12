import { combineReducers } from 'redux'
import {  FETCH_USER_DATA,
          SET_USER_DATA,
          FETCH_USER_PLAYLISTS,
          SET_USER_PLAYLISTS
        } from '../types';
import { UserData, Playlist } from '../../constants/types';

const initialUserData = {
  fetching: false,
  userData: {} as UserData
}

const initialUserPlaylists = {
  fetching: false,
  playlists: [] as Playlist[]
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

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userPlaylists: userPlaylistsReducer,
});