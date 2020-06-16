import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import Header from '../../Header';
import SongBio from '../SongBio';
import { isEmptyObject } from '../../../helpers/objects';
import SongAudioFeatures from '../SongAudioFeatures';

type Props = {
  song: TrackSnippet,
  audioFeatures: AudioFeatures,
  fetchingAudioFeatures: boolean,
}

const SongDataContainer = styled.div`
  padding: 10px;
`

const SelectedSong = (props: Props) => {

  const renderSongData = () => {
    const { song, audioFeatures, fetchingAudioFeatures } = props;

    // If there is no selected song, render UI that shows placeholder text
    if (isEmptyObject(song)) {
      return (
        <Segment style={{'margin': '0'}}>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      );
    }

    // If there is a selected song, but we're fetching its audio features, render loading icon
    if (fetchingAudioFeatures) {
      return (
        <Segment style={{'margin': '0'}}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      );
    }

    // Render SongBio and SongFeatures components
    return (
      <SongDataContainer>
        <SongBio snippet={song}/>
        <SongAudioFeatures audioFeatures={audioFeatures}/>
      </SongDataContainer>
    ); 
  }

  return(
    <div>
      <Header defaultText='Selected Song' color={'#feecdc'}/>
      {renderSongData()}
    </div>
  );

}

export default SelectedSong;