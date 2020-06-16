import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import Header from '../../Header';
import SongBio from '../SongBio';
import { isEmptyObject } from '../../../helpers/objects';

type Props = {
  song: TrackSnippet,
  audioFeatures: AudioFeatures,
  fetchingAudioFeatures: boolean,
}

const SelectedSong = (props: Props) => {

  const renderSongSnippet = () => {
    const { song, audioFeatures, fetchingAudioFeatures } = props;

    if (!isEmptyObject(song)) {
      if (fetchingAudioFeatures) {
        return (
          <Segment style={{'margin': '0'}}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
  
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>
        );
      } else {
        return (
          <SongBio snippet={song}/>
        );  
      }
    }

    // UI that shows placeholder text
    return (
      <Segment style={{'margin': '0'}}>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    );
  }

  return(
    <div>
      <Header defaultText='Selected Song' color={'#feecdc'}/>
      {renderSongSnippet()}
    </div>
  );

}

export default SelectedSong;