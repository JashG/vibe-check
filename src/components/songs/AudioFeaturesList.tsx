import React from 'react';
// import styled from 'styled-components';
import { AudioFeatures } from '../../constants/types';
import AudioFeature from '../songs/AudioFeature';

type Props = {
  audioFeatures: AudioFeatures,
}

const desiredAudioFeatures = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
]

const AudioFeaturesList = (props: Props) => {

  const renderAudioFeatures = () => {
    const { audioFeatures } = props;
    let features: React.ReactFragment[] = [];

    Object.keys(audioFeatures).forEach(key => {
      if (desiredAudioFeatures.includes(key)) {
        const value = audioFeatures[key];
        features.push(
          <React.Fragment key={key}>
            <AudioFeature name={key}
            min={0}
            max={1}
            value={value}/>
          </React.Fragment>
        );
      }
    });

    return features;
    
  }

  return (
    <div>
      {renderAudioFeatures()}
    </div>
  );

}

export default AudioFeaturesList;