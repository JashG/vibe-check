import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedSongFeatures } from '../../../store/actions';
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import SelectedSong from '../selected_song/SelectedSong';

interface OwnProps {
  song: TrackSnippet
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
    const { song } = this.props;
    const { song: oldSong } = prevProps;

    if (song['id'] !== oldSong['id']) {
      this.handleSongAudioFeatures();
    }
  }

  handleSongAudioFeatures = async () => {
    const { song } = this.props;

    if (song) {
      const songId = song['id'];
      const response = await this.getSongAudioFeatures(songId);
      console.log(response);
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
    const { song, selectedSongFeatures } = this.props;

    return(
      <SelectedSong song={this.props.song}/>
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