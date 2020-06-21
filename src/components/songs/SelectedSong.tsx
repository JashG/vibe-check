import React from 'react';
import styled from 'styled-components';
import { TrackSnippet, TrackAndAudio } from '../../constants/types';
import { PRIMARY, TEXT_LIGHT, DARK_ACCENT } from '../../constants/colors';

type Props = {
  song: TrackAndAudio,
  itemTextClickHandler: (song: TrackSnippet) => void,
  itemIconClickHandler: (song: TrackSnippet) => void,
}

const SelectedSongContainer = styled.div`
  display: flex;
  width: 190px;
  height: 50px;
  margin: 6px 0 0 6px;
  border-radius: 3px;
  background-color: ${PRIMARY};
  color: ${TEXT_LIGHT};
  -webkit-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);

  @media (max-width: 992px) {
    width: 120px;
  }
`

const SongImageContainer = styled.div`
  position: relative;
  width: 33%;

  @media (max-width: 992px) {
    display: none;
  }
`

type SongImageProps = {
  url: string
}

const SongImage = styled.div`
  height: 100%;

  // Fallback option
  background-image: url('${(props: SongImageProps) => props.url}');

  background: linear-gradient(to right, ${DARK_ACCENT}80, ${DARK_ACCENT}80), url('${(props: SongImageProps) => props.url}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const SongTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 4px;
  width: 50%;

  &:hover {
    cursor: pointer;
  }

  &:before {
    position: absolute;
    content: '';
    width: 95px;
    height: 50px;
    background-image: linear-gradient(to right,transparent 0% 75%, ${PRIMARY} 100%)
  }

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 992px) {
    width: 75%;
  }
`

const SongName = styled.span`
  font-size: 16px;
  font-weight: 600;
`

const RemoveSongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
`

const CloseIcon = styled.span`
  height: 20px;
  width: 20px;
  padding-right: 4px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  &:before, &:after {
    position: absolute;
    content: ' ';
    height: 20px;
    width: 3px;
    background-color: ${TEXT_LIGHT};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`

const SelectedSong = (props: Props) => {
  const { song, itemTextClickHandler, itemIconClickHandler } = props;
  const songData = song['song'];
  const songName = songData['name'];
  const image = songData['albumImage'];
  const artists = songData['artists'];

  return(
    <SelectedSongContainer>
      <SongImageContainer>
        <SongImage url={image}/>
      </SongImageContainer>
      <SongTextContainer onClick={() => itemTextClickHandler(songData)}>
        <SongName>{songName}</SongName>
        <span>{artists[0]['name']}</span>
      </SongTextContainer>
      <RemoveSongContainer>
        <CloseIcon onClick={() => itemIconClickHandler(songData)}/>
      </RemoveSongContainer>
    </SelectedSongContainer>
  );

}

export default SelectedSong;