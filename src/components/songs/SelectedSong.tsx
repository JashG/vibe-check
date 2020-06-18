import React from 'react';
import styled from 'styled-components';
import { TrackAndAudio } from '../../constants/types';

type Props = {
  song: TrackAndAudio,
}

const SelectedSongContainer = styled.div`
  display: flex;
  width: 165px;
  height: 50px;
  margin: 6px 0 0 6px;
  overflow: hidden;
  border-radius: 3px;
  background-color: orange;
  -webkit-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
`

const SongImage = styled.img`
  height: 100%;
`

const SelectedSong = (props: Props) => {
  const { song } = props;
  const songData = song['song'];
  const audioFeatures = song['audioFeatures'];


  return(
    <SelectedSongContainer>
      <SongImage src={songData['albumImage']} alt={songData['albumName']}/>
        item
    </SelectedSongContainer>
  );

}

export default SelectedSong;