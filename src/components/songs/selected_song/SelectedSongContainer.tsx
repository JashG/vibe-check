import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchSelectedSongFeatures, setSelectedSongFeatures, addSelectedSongToCache } from '../../../store/actions';
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import SelectedSong from '../selected_song/SelectedSong';
import { isEmptyObject } from '../../../helpers/objects';

interface OwnProps {
  song: TrackSnippet
}

interface ReduxProps {
  audioFeatures: AudioFeatures,
  fetching: boolean,
  songCache: {song: TrackSnippet, audioFeatures: AudioFeatures}[]
}

interface DispatchProps {
  fetchSelectedSongFeatures: () => void,
  setSelectedSongFeatures: (payload: AudioFeatures) => void,
  addSelectedSongToCache: (payload: {song: TrackSnippet, audioFeatures: AudioFeatures}) => void,
}

type Props = OwnProps & ReduxProps & DispatchProps;

class SelectedSongContainer extends Component<Props, {}> {

  componentDidMount = () => {
    this.handleSongAudioFeatures();
  }

  componentDidUpdate = (prevProps: Props) => {
    const { song } = this.props;
    const { song: oldSong } = prevProps;

    if (song['id'] !== oldSong['id']) {
      this.handleSongAudioFeatures();
    }
  }

  handleSongAudioFeatures = async () => {
    const { song } = this.props;

    if (!isEmptyObject(song)) {
      const songId = song['id'];
      const existingSong = this.getSongFromCache(songId);

      // Check Redux cache to see if we already have this song's audio features
      if (existingSong) {
        const audioFeatures = existingSong['audioFeatures'];
        this.props.setSelectedSongFeatures(audioFeatures);
      } else {
        this.props.fetchSelectedSongFeatures();
        const response = await this.getSongAudioFeatures(songId);

        if (response['status'] === 200) {
          const features: AudioFeatures = response.data;
          this.props.setSelectedSongFeatures(features);
          this.props.addSelectedSongToCache({song: song, audioFeatures: features});
        } else {
          this.props.setSelectedSongFeatures({} as AudioFeatures);
        }
      }
    }
  }

  getSongFromCache = (songId: string): {song: TrackSnippet, audioFeatures: AudioFeatures} | undefined => {
    const { songCache } = this.props;

    const existingSong = songCache.find(song => {
      const id = song['song']['id'];
      if (songId === id) {
        return song;
      }
    })

    return existingSong;
  }

  getSongAudioFeatures = (songId: string) => {
    return axios.get('/api/audio-features/' + songId);
  }

  render() {
    const { song, audioFeatures, fetching } = this.props;

    return(
      <SelectedSong song={song}
      audioFeatures={audioFeatures}
      fetchingAudioFeatures={fetching}/>
    )
  }

}

// Note: Type of 'state' should be interface for Redux state
const mapStateToProps = (state: any, ownProps?: OwnProps): ReduxProps => {
  return {
    audioFeatures: state.selectedSong.audioFeatures,
    fetching: state.selectedSong.fetchingAudioFeatures,
    songCache: state.selectedSongCache.songs,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    fetchSelectedSongFeatures: () => dispatch(fetchSelectedSongFeatures()),
    setSelectedSongFeatures: (payload: AudioFeatures) => dispatch(setSelectedSongFeatures(payload)),
    addSelectedSongToCache: (payload: {song: TrackSnippet, audioFeatures: AudioFeatures}) => dispatch(addSelectedSongToCache(payload.song, payload.audioFeatures)),
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SelectedSongContainer);