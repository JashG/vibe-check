import React from 'react';
import styled from 'styled-components';
import { TrackSnippet } from '../../constants/types';

type Props = {
  song: TrackSnippet,
}

const SongBioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`

const SongImage = styled.img`
  height: 75px;
  margin-right: 8px;
  -webkit-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 6px -2px rgba(0,0,0,0.75);

  @media (min-width: 768px) and (max-width: 992px) {
    height: 60px;
  }
`

const SongTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SongName = styled.span`
  font-size: 18px;
  font-weight: 700;

  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 16px;
  }
`

const SongBio = (props: Props) => {

  const { song } = props;
  const songName = song['name'];
  const albumName = song['albumName'];
  const image = song['albumImage'];
  const artists = song['artists'];

  return(
    <SongBioContainer>
      <SongImage src={image} alt={albumName}/>
      <SongTextContainer>
        <SongName>{songName}</SongName>
        <span>By: {artists[0]['name']}</span>
      </SongTextContainer>
    </SongBioContainer>
  );

}

export default SongBio;