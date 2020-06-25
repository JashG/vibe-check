import React from 'react';
import styled from 'styled-components';
import { TrackAndAudio } from '../../constants/types';
import Header from '../Header';
import SongBio from './SongBio';
import AudioFeaturesList from './AudioFeaturesList';
import Loading from '../page_elements/Loading';

type Props = {
  song: TrackAndAudio | undefined,
  loadingSong: boolean,
}

const SongDataContainer = styled.div`
  padding: 10px;
`

const SongInformation = (props: Props) => {

  const renderSongData = () => {
    const { song: songData, loadingSong: loading } = props;

    // If there is no selected song, render UI that shows placeholder text
    if (!songData) {
      // return (
      //   <Segment style={{'margin': '0'}}>
      //     <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      //   </Segment>
      // );
      return (
        <div>Click on a song to view more information!</div>
      )
    }

    // If there is a selected song, but we're loading its audio features, render loading icon
    if (loading) {
      return Loading;
    }

    const song = songData['song'];
    const audioFeatures = songData['audioFeatures'];
    // Render SongBio and SongFeatures components
    return (
      <SongDataContainer>
        <SongBio song={song}/>
        <AudioFeaturesList audioFeatures={audioFeatures}/>
      </SongDataContainer>
    ); 
  }

  return(
    <div>
      <Header defaultText='Song Information' icon='headphones'/>
      {renderSongData()}
    </div>
  );

}

export default SongInformation;