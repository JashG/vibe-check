import React from 'react';
import styled from 'styled-components';
import { TrackSnippet, /**AudioFeatures*/ } from '../../../constants/types';
import Header from '../../Header';
import SongBio from '../SongBio';

type Props = {
  song: TrackSnippet,
  // audioFeatures: AudioFeatures
}

const SelectedSong = (props: Props) => {
  const { song, /**audioFeatures*/ } = props;

  return(
    <div>
      <Header defaultText='Selected Song' color={'#feecdc'}/>
      {song ? song['id'] : 'no song selected'}
      <SongBio/>
    </div>
  );

}

export default SelectedSong;