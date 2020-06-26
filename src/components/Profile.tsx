import axios, { AxiosResponse } from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { Album, Playlist, TrackSnippet, UserData, TrackAndAudio, AudioFeatures } from '../constants/types';
import { fetchUserData, fetchUserPlaylists, fetchUserRecentSongs, setUserData, setUserPlaylists, setUserRecentSongs, addSelectedSong, removeSelectedSong, addSongToCache } from '../store/actions';
import Card from './cards/Card';
import Library from './library/Library';
import SongInformation from './songs/SongInformation';
import SelectedSongsPane from './songs/SelectedSongsPane';

// Maximum number of songs user can select before searching for new music
export const MAX_SELECTED_SONGS = 5;

interface OwnProps {
  // none, as of now
}

interface ReduxProps {
  userData: UserData,
  userPlaylists: Playlist[],
  userRecentSongs: TrackSnippet[],
  selectedSongs: TrackAndAudio[],
  fetchingSelectedSongs: boolean,
  songCache: TrackAndAudio[],
}

interface DispatchProps {
  setUserDataAction: (payload: UserData) => void,
  fetchUserDataAction: () => void,
  setUserPlaylistsAction: (payload: Playlist[]) => void,
  fetchUserPlaylistsAction: () => void,
  setUserRecentSongs: (payload: TrackSnippet[]) => void,
  fetchUserRecentSongs: () => void,
  addSelectedSong: (payload: TrackAndAudio) => void,
  removeSelectedSong: (payload: string) => void,
  addSongToCache: (payload: TrackAndAudio) => void,
}

type Props = OwnProps & ReduxProps & DispatchProps

type State = {
  activeSong: TrackAndAudio | undefined, // Song that the user has clicked to view more information
  loadingActiveSong: boolean, // Whether or not we are loading active song's information
                              // True when we need to fetch it's audio features from backend
}

const StickyRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 2;
`

class Profile extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activeSong: undefined,
      loadingActiveSong: false,
    }
  }

  componentDidMount = () => {
    this.handleInitialData();
  }

  handleInitialData = async () => {
    // Data that we need when component mounts; calls will be made in parallel
    const userDataApiCalls = [
      this.getUserProfile(),
      this.getUserRecentlyPlayed(),
    ]
    const responses = await Promise.all(userDataApiCalls);

    this.setInitialState(responses);
  }

  setInitialState = (responses: AxiosResponse<any>[]) => {
    responses.forEach(response => {
      const data = response.data;
      const type = data.responseType;

      if (type === 'profile') {
        const userData: UserData = {
          country: data['country'],
          name: data['display_name'],
          href: data['href'],
          followers: data['followers']['total'],
          picture: data['images'] ? data['images'][0]['url'] : '',
          uri: data['uri'],
        }
        this.props.setUserDataAction(userData);
      } else if (type === 'recently-played') {
        const items: [] = data.items;
        if (items) {
          const tracks: TrackSnippet[] = [];
          items.forEach(item => {
            const trackData = item['track'];
            const albumData: Album = item['track']['album'];

            const track: TrackSnippet = {
              externalUrl: item['context'] ? item['context']['external_urls']['spotify'] : '',
              playedAt: item['played_at'],
              albumName: albumData['name'],
              albumImage: albumData['images'] ? albumData['images'][0]['url'] : '',
              artists: trackData['artists'],
              name: trackData['name'],
              id: trackData['id'],
              duration: trackData['duration_ms'],
            }

            tracks.push(track);
          });

          this.props.setUserRecentSongs(tracks);
        }
      }
    });
  }

  setActiveSong = (song: TrackSnippet) => {
    const { activeSong } = this.state;
    const songId = song['id'];

    if ((!activeSong) || (activeSong['song']['id'] !== songId)) {
      // Check Redux cache to see if we already have this song's audio features
      // If not, we'll make an API request to retrieve them
      const existingSongData = this.getSongFromCache(songId);

      if (existingSongData) {
        this.setState({
          activeSong: existingSongData
        });
      } else {
        this.setState({
          loadingActiveSong: true
        });

        this.handleFetchingSongAudioFeatures(songId).then(audioFeatures => {
          if (audioFeatures) {
            const songData: TrackAndAudio = {
              song: song,
              audioFeatures: audioFeatures
            }
            this.setState({
              activeSong: songData,
              loadingActiveSong: false,
            });
            this.props.addSongToCache(songData);
          } else {
            this.setState({
              loadingActiveSong: false
            });
          }
        }).catch(error => {
          this.setState({
            loadingActiveSong: false
          });
        })
      }
    }
  }

  addOrRemoveSelectedSong = (song: TrackSnippet) => {
    const { selectedSongs } = this.props;

    // First, check if we are trying to remove this song
    const songId = song['id'];
    const matchingSongIds = selectedSongs.filter(s => s['song']['id'] === songId);
  
    if (matchingSongIds.length > 0) {
      this.props.removeSelectedSong(songId);
    } else {
      // If we are trying to add this song to our list of selected songs,
      // first ensure that we haven't reached our limit for number of songs
      if (selectedSongs.length >= MAX_SELECTED_SONGS) return;

      // Now, we need to retrieve its TrackAndAudio representation from either 
      // Redux cache or via API call
      const existingSongData = this.getSongFromCache(songId);
  
      if (existingSongData) {
        this.props.addSelectedSong(existingSongData);
      } else {
        this.handleFetchingSongAudioFeatures(songId).then(audioFeatures => {
          if (audioFeatures) {
            const selectedSong: TrackAndAudio = {
              song: song,
              audioFeatures: audioFeatures
            }

            this.props.addSelectedSong(selectedSong);
            this.props.addSongToCache(selectedSong);
          }
        });
      }
    }
  }

  getSongFromCache = (songId: string): TrackAndAudio | undefined => {
    const { songCache } = this.props;

    const existingSong = songCache.find(song => {
      const id = song['song']['id'];
      if (songId === id) {
        return song;
      }
    });

    return existingSong;
  }

  handleFetchingSongAudioFeatures = async (songId: string) => {
    const response = await this.getSongAudioFeatures(songId);

    if (response['status'] === 200) {
      const audioFeatures: AudioFeatures = response.data;
      return audioFeatures;
    }
    
    return undefined;
  }

  getUserPlaylists = () => {
    return axios.get('/api/playlists');
  }

  getUserProfile = () => {
    return axios.get('/api/profile');
  }

  getUserRecentlyPlayed = () => {
    return axios.get('/api/recently-played');
  }

  getSongAudioFeatures = (songId: string) => {
    return axios.get('/api/audio-features/' + songId);
  }

  render = () => {
    const { activeSong, loadingActiveSong } = this.state;
    const { userRecentSongs, selectedSongs, fetchingSelectedSongs } = this.props;

    return(
      <Container style={{'marginTop': '10px'}}>
        <StickyRow>
          <Col xs={{span: 12, order: 1}} md={{span: 8, order:1}}>
            <SelectedSongsPane
            songs={selectedSongs}
            itemTextClickHandler={this.setActiveSong}
            itemIconClickHandler={this.addOrRemoveSelectedSong}/>
          </Col>
        </StickyRow>

        <Row>
          <Col xs={{span: 12, order: 1}} md={{span: 8, order:1}}>
            <Card>
              <Library defaultText="Recently Played"
              tableOptions={['Recently Played', 'Your Playlists']}
              items={userRecentSongs || []}
              fetchingItems={fetchingSelectedSongs}
              selectedItems={selectedSongs}
              rowClickHandler={this.setActiveSong}
              itemSelectHandler={this.addOrRemoveSelectedSong}/>
            </Card>
          </Col>
          <Col xs={{span: 12, order: 2}} md={{span: 4, order: 2}}>
            <Card>
              <SongInformation song={activeSong} loadingSong={loadingActiveSong}/>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}

// Note: Type of 'state' should be interface for Redux state
const mapStateToProps = (state: any, ownProps?: OwnProps): ReduxProps => {
  return {
    userData: state.userData.userData,
    userPlaylists: state.userPlaylists.playlists,
    userRecentSongs: state.userRecentSongs.songs,
    selectedSongs: state.selectedSongs.songs,
    fetchingSelectedSongs: state.selectedSongs.fetching,
    songCache: state.songCache.songs,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    setUserDataAction: (payload: UserData) => dispatch(setUserData(payload)),
    fetchUserDataAction: () => dispatch(fetchUserData()),
    setUserPlaylistsAction: (payload: Playlist[]) => dispatch(setUserPlaylists(payload)),
    fetchUserPlaylistsAction: () => dispatch(fetchUserPlaylists()),
    setUserRecentSongs: (payload: TrackSnippet[]) => dispatch(setUserRecentSongs(payload)),
    fetchUserRecentSongs: () => dispatch(fetchUserRecentSongs()),
    addSelectedSong: (payload: TrackAndAudio) => dispatch(addSelectedSong(payload)),
    removeSelectedSong: (payload: string) => dispatch(removeSelectedSong(payload)),
    addSongToCache: (payload: TrackAndAudio) => dispatch(addSongToCache(payload)),
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Profile);