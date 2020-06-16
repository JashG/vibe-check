import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchSelectedSongFeatures, setSelectedSongFeatures } from '../../../store/actions';
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import SelectedSong from '../selected_song/SelectedSong';
import { isEmptyObject } from '../../../helpers/objects';

interface OwnProps {
  song: TrackSnippet
}

interface ReduxProps {
  selectedSongFeatures: AudioFeatures,
  fetching: boolean,
}

interface DispatchProps {
  fetchSelectedSongFeatures: () => void,
  setSelectedSongFeatures: (payload: AudioFeatures) => void,
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
      this.props.fetchSelectedSongFeatures();
      const response = await this.getSongAudioFeatures(songId);

      if (response['status'] === 200) {
        const features: AudioFeatures = response.data;
        this.props.setSelectedSongFeatures(features);
      } else {
        this.props.setSelectedSongFeatures({} as AudioFeatures);
      }
    }
  }

  getSongAudioFeatures = (songId: string) => {
    return axios.get('/api/audio-features/' + songId);
  }

  render() {
    const { song, selectedSongFeatures, fetching } = this.props;

    return(
      <SelectedSong song={song}
      audioFeatures={selectedSongFeatures}
      fetchingAudioFeatures={fetching}/>
    )
  }

}

// Note: Type of 'state' should be interface for Redux state
const mapStateToProps = (state: any, ownProps?: OwnProps): ReduxProps => {
  return {
    selectedSongFeatures: state.selectedSong.audioFeatures,
    fetching: state.selectedSong.fetchingAudioFeatures,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    fetchSelectedSongFeatures: () => dispatch(fetchSelectedSongFeatures()),
    setSelectedSongFeatures: (payload: AudioFeatures) => dispatch(setSelectedSongFeatures(payload)),
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SelectedSongContainer);