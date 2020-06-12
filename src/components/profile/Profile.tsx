import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { UserData, Playlist, Track, Album, Artist } from '../../constants/types';
import { fetchUserData, setUserData, fetchUserPlaylists, setUserPlaylists } from '../../store/actions';
import Card from '../Card';
import Library from '../Library';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface OwnProps {
  // none, as of now
}

interface ReduxProps {
  userData: UserData,
  userPlaylists: Playlist[]
}

interface DispatchProps {
  setUserDataAction: (payload: UserData) => void,
  fetchUserDataAction: () => void,
  setUserPlaylistsAction: (payload: Playlist[]) => void,
  fetchUserPlaylistsAction: () => void,
}

type Props = OwnProps & ReduxProps & DispatchProps

type State = {
  recentlyPlayed: any[]
}

class Profile extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      recentlyPlayed: []
    }
  }

  componentDidMount() {
    this.handleInitialData();
  }

  handleInitialData = async () => {
    // Data that we need when component mounts; calls will be made in parallel
    const userDataApiCalls = [
      this.getUserProfile(),
      this.getUserRecentlyPlayed()
    ]
    const responses = await Promise.all(userDataApiCalls);

    this.setInitialState(responses)
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
          const tracks: Track[] = [];
          console.log(items);
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
              externalUrl: item['context']['external_urls']['spotify'],
              playedAt: item['played_at'],
              album: album,
              artists: trackData['artists'],
              duration: trackData['duration_ms'],
              name: trackData['name'],
            }

            tracks.push(track);
          });

          this.setState({
            recentlyPlayed: tracks
          });
        }
      }
    });
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
    const { recentlyPlayed } = this.state;
    return(
      <Container>
        <Row>
          <Col xs={12} sm={12} md={9} >
            Your Library
            <Card>
              <Library title="Recently Played"
              items={recentlyPlayed}
              itemType='track'/>
              {/* <Library title="Your Playlists"/> */}
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
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    setUserDataAction: (payload: UserData) => dispatch(setUserData(payload)),
    fetchUserDataAction: () => dispatch(fetchUserData()),
    setUserPlaylistsAction: (payload: Playlist[]) => dispatch(setUserPlaylists(payload)),
    fetchUserPlaylistsAction: () => dispatch(fetchUserPlaylists()),
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Profile);