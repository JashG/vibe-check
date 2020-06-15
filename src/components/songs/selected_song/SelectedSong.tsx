import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { TrackSnippet, AudioFeatures } from '../../../constants/types';
import Header from '../../Header';
import SongBio from '../SongBio';
import { isEmptyObject } from '../../../helpers/objects';

type Props = {
  song: TrackSnippet,
  audioFeatures: AudioFeatures
}

const SelectedSong = (props: Props) => {

  const renderSongSnippet = () => {
    const { song, audioFeatures } = props;
    const haveSong = !isEmptyObject(song);
    const haveAudioFeatures = !isEmptyObject(audioFeatures);

    if (haveSong && haveAudioFeatures) {
      return (
        <div>we have everything</div>
      )
    }

    // If we have a selected song but are waiting for audio features
    // TODO: since audio features are stored in redux, NEED to add a 'fetching' field
    // to Redux instead of checking like this
    if (haveSong && !haveAudioFeatures) {
      return (
        <Segment style={{'margin': '0'}}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      );
    }

    if (!haveSong) {
      return (
        <Segment style={{'margin': '0'}}>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      )
    }
  }

  return(
    <div>
      <Header defaultText='Selected Song' color={'#feecdc'}/>
      {renderSongSnippet()}
    </div>
  );

}

export default SelectedSong;