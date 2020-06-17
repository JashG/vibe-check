import { combineReducers } from 'redux'
import {  FETCH_USER_DATA,
          SET_USER_DATA,
          FETCH_USER_PLAYLISTS,
          SET_USER_PLAYLISTS,
          FETCH_USER_RECENT_SONGS,
          SET_USER_RECENT_SONGS,
          ADD_SELECTED_SONG,
          REMOVE_SELECTED_SONG,
          ADD_SONG_TO_CACHE,
        } from '../types';
import { UserData, Playlist, Track, TrackAndAudio } from '../../constants/types';

const initialUserData = {
  fetching: false,
  userData: {} as UserData,
}

const initialUserPlaylists = {
  fetching: false,
  playlists: [] as Playlist[],
}

const initialUserRecentSongs = {
  fetching: false,
  songs: [] as Track[],
}

const initialSelectedSongs = {
  songs: [] as TrackAndAudio[],
}

// Caches songs' audio features so we don't have to fetch them each time a user
// clicks on a song
const songAudioFeaturesCache = {
  songs: [] as TrackAndAudio[],
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

function selectedSongsReducer(state = initialSelectedSongs, action: {type: string, payload: TrackAndAudio | string }) {
  switch(action.type) {
    case ADD_SELECTED_SONG:
      return {
        songs: [...state.songs, action.payload]
      }

    case REMOVE_SELECTED_SONG:
      return {
        songs: state.songs.filter((song: TrackAndAudio) => song.song.id !== action.payload)
      }

  }

  return state;
}

function audioFeaturesCacheReducer(state = songAudioFeaturesCache, action: {type: string, payload: TrackAndAudio }) {
  switch(action.type) {
    case ADD_SONG_TO_CACHE:
      return {
        songs: [...state.songs, action.payload]
      }
    }

  return state;
}


export const rootReducer = combineReducers({
  userData: userDataReducer,
  userPlaylists: userPlaylistsReducer,
  userRecentSongs: userRecentSongsReducer,
  selectedSongs: selectedSongsReducer,
  songCache: audioFeaturesCacheReducer,
});