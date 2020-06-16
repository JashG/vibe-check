import axios, { AxiosResponse } from 'axios';
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { Album, Playlist, Track, TrackSnippet, UserData } from '../constants/types';
import { fetchUserData, fetchUserPlaylists, fetchUserRecentSongs, setUserData, setUserPlaylists, setUserRecentSongs, setSelectedSong } from '../store/actions';
import Card from './cards/Card';
import Library from './library/Library';
import SelectedSongContainer from './songs/selected_song/SelectedSongContainer';

interface OwnProps {
  // none, as of now
}

interface ReduxProps {
  userData: UserData,
  userPlaylists: Playlist[],
  userRecentSongs: Track[],
  selectedSong: TrackSnippet,
}

interface DispatchProps {
  setUserDataAction: (payload: UserData) => void,
  fetchUserDataAction: () => void,
  setUserPlaylistsAction: (payload: Playlist[]) => void,
  fetchUserPlaylistsAction: () => void,
  setUserRecentSongs: (payload: Track[]) => void,
  fetchUserRecentSongs: () => void,
  setSelectedSong: (payload: TrackSnippet) => void,
}

type Props = OwnProps & ReduxProps & DispatchProps

class Profile extends Component<Props, {}> {

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

  // TODO: In our backend, we will re-format data from Spotify API to match the types
  // we've declared so we don't have to do any formatting on the frontend
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
        console.log(items);
        if (items) {
          const tracks: Track[] = [];
          items.forEach(item => {
            const trackData = item['track'];
            const albumData = item['track']['album'];
            const album: Album = {
              artists: albumData['artists'],
              externalUrl: albumData['external_urls']['spotify'],
              images: albumData['images'],
              name: albumData['name'],
              releaseDate: albumData['release_date'],
              numTracks: albumData['total_tracks'],
            }
            const track: Track = {
              externalUrl: item['context'] ? item['context']['external_urls']['spotify'] : '',
              playedAt: item['played_at'],
              album: album,
              artists: trackData['artists'],
              duration: trackData['duration_ms'],
              name: trackData['name'],
              id: trackData['id'],
            }

            tracks.push(track);
          });

          this.props.setUserRecentSongs(tracks);
        }
      }
    });
  }

  setSelectedSong = (song: TrackSnippet) => {
    const { selectedSong } = this.props;

    if ((!selectedSong) || (song['id'] !== selectedSong['id'])) {
      this.props.setSelectedSong(song);
    }
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

  render() {
    const { selectedSong } = this.props;

    return(
      <Container>
        <Row>
          <Col xs={{span: 12, order: 1}} md={{span: 8, order:1}}>
            Your Library
            <Card>
              <Library title="Recently Played"
              items={this.props.userRecentSongs || []}
              itemType='track'
              itemClickHandler={this.setSelectedSong}/>
            </Card>
          </Col>
          <Col xs={{span: 12, order: 2}} md={{span: 4, order: 2}}>
            Selected Song
            <Card>
              <SelectedSongContainer song={selectedSong}/>
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
    selectedSong: state.selectedSong.song,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    setUserDataAction: (payload: UserData) => dispatch(setUserData(payload)),
    fetchUserDataAction: () => dispatch(fetchUserData()),
    setUserPlaylistsAction: (payload: Playlist[]) => dispatch(setUserPlaylists(payload)),
    fetchUserPlaylistsAction: () => dispatch(fetchUserPlaylists()),
    setUserRecentSongs: (payload: Track[]) => dispatch(setUserRecentSongs(payload)),
    fetchUserRecentSongs: () => dispatch(fetchUserRecentSongs()),
    setSelectedSong: (payload: TrackSnippet) => dispatch(setSelectedSong(payload))
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Profile);