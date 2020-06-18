import React from 'react';
import styled from 'styled-components';
import { TrackAndAudio } from '../../constants/types';
import { PRIMARY, TEXT_LIGHT } from '../../constants/colors';

type Props = {
  song: TrackAndAudio,
}

const SelectedSongContainer = styled.div`
  display: flex;
  width: 165px;
  height: 50px;
  margin: 6px 0 0 6px;
  border-radius: 3px;
  background-color: ${PRIMARY};
  color: ${TEXT_LIGHT};
  -webkit-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
`

const SongImageContainer = styled.div`
  width: 33%;
`

const SongImage = styled.img`
  height: 100%;
  margin-right: 4px;
`

const SongTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const SongName = styled.span`
  font-size: 16px;
  font-weight: 600;
`

const SelectedSong = (props: Props) => {
  const { song } = props;
  const songData = song['song'];
  const songName = songData['name'];
  const albumName = songData['albumName'];
  const image = songData['albumImage'];
  const artists = songData['artists'];
  const audioFeatures = song['audioFeatures'];

  return(
    <SelectedSongContainer>
      <SongImageContainer>
        <SongImage src={image} alt={albumName}/>
      </SongImageContainer>
      <SongTextContainer>
        <SongName>{songName}</SongName>
        <span>{artists[0]['name']}</span>
      </SongTextContainer>
    </SelectedSongContainer>
  );

}

export default SelectedSong;