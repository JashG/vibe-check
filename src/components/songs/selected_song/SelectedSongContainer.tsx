import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedSongFeatures } from '../../../store/actions';
import { AudioFeatures } from '../../../constants/types';
import SelectedSong from '../selected_song/SelectedSong';

interface OwnProps {
  songId: string
}

interface ReduxProps {
  selectedSongFeatures: AudioFeatures,
}

interface DispatchProps {
  setSelectedSongFeatures: (payload: AudioFeatures) => void,
}

type Props = OwnProps & ReduxProps & DispatchProps;

class SelectedSongContainer extends Component<Props, {}> {

  componentDidMount = () => {
    this.handleSongAudioFeatures();
  }

  componentDidUpdate = (prevProps: Props) => {
    const { songId } = this.props;
    const { songId: oldSongId } = prevProps;

    if (songId !== oldSongId) {
      this.handleSongAudioFeatures();
    }
  }

  handleSongAudioFeatures = async () => {
    const { songId } = this.props;

    if (songId) {
      const response = await this.getSongAudioFeatures(songId);
      if (response) {
        const features: AudioFeatures = response.data;
        this.props.setSelectedSongFeatures(features);
      }
    }
  }

  getSongAudioFeatures = (songId: string) => {
    return axios.get('/api/audio-features/' + songId);
  }

  render() {
    return(
      <SelectedSong songId={this.props.songId}/>
    )
  }

}

// Note: Type of 'state' should be interface for Redux state
const mapStateToProps = (state: any, ownProps?: OwnProps): ReduxProps => {
  return {
    selectedSongFeatures: state.selectedSong.audioFeatures,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps): DispatchProps => {
  return {
    setSelectedSongFeatures: (payload: AudioFeatures) => dispatch(setSelectedSongFeatures(payload)),
  }
};

export default connect<ReduxProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SelectedSongContainer);