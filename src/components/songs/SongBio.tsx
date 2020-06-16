import React from 'react';
import styled from 'styled-components';
import { TrackSnippet, AudioFeatures } from '../../constants/types';

type Props = {
  snippet: TrackSnippet,
  audioFeatures: AudioFeatures,
}

const SongBioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
`

const SongImage = styled.img`
  height: 75px;
  padding-right: 8px;

  @media (min-width: 768px) and (max-width: 992px) {
    height: 60px;
  }
`

const SongTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SongBio = (props: Props) => {

  const { snippet: song, audioFeatures } = props;
  const name = song['albumName'];
  const image = song['albumImage'];

  return(
    <SongBioContainer>
      <SongImage src={image} alt={name}/>
      <SongTextContainer>
        <span>Song</span>
        <span>Artist</span>
      </SongTextContainer>
    </SongBioContainer>
  );

}

export default SongBio;