import React, { Component } from 'react';
import axios from 'axios';
import SelectedSong from '../selected_song/SelectedSong';

type Props = {
  songId: string
}

class SelectedSongContainer extends Component<Props, any> {

  componentDidMount = async () => {
    const { songId } = this.props;

    if (songId) {
      // const features = await this.getSongAudioFeatures(songId);
      // set redux state
    }
  }

  getSongAudioFeatures = (songId: string) => {
    return axios.get('/api/audio-features/' + songId);
  }

  render() {
    return(
      <SelectedSong/>
    )
  }

}

export default SelectedSongContainer;