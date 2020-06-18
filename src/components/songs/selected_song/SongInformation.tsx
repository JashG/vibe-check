import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { TrackAndAudio } from '../../../constants/types';
import Header from '../../Header';
import SongBio from '../SongBio';
import { isEmptyObject } from '../../../helpers/objects';
import SongAudioFeatures from '../SongAudioFeatures';

type Props = {
  song: TrackAndAudio | undefined,
}

const SongDataContainer = styled.div`
  padding: 10px;
`

const SongInformation = (props: Props) => {

  const renderSongData = () => {
    const { song: songData } = props;

    // If there is no selected song, render UI that shows placeholder text
    if (!songData) {
      return (
        <Segment style={{'margin': '0'}}>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
      );
    }

    // If there is a selected song, but we're fetching its audio features, render loading icon
    // if (fetchingAudioFeatures) {
    //   return (
    //     <Segment style={{'margin': '0'}}>
    //       <Dimmer active inverted>
    //         <Loader inverted>Loading</Loader>
    //       </Dimmer>

    //       <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    //     </Segment>
    //   );
    // }

    const song = songData['song'];
    const audioFeatures = songData['audioFeatures'];
    // Render SongBio and SongFeatures components
    return (
      <SongDataContainer>
        <SongBio song={song}/>
        <SongAudioFeatures audioFeatures={audioFeatures}/>
      </SongDataContainer>
    ); 
  }

  return(
    <div>
      <Header defaultText='Song Audio Features' color={'#feecdc'}/>
      {renderSongData()}
    </div>
  );

}

export default SongInformation;