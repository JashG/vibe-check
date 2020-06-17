import React from 'react';
import AudioFeature from '../components/songs/AudioFeature';

export default { title: 'AudioFeature' }

const props = {
  name: 'Feature',
  min: 0,
  max: 1,
  value: 0.25,
}

const { name, min, max, value } = props;

export const audioFeature = () => (
  <div style={{padding: '10px'}}>
    <AudioFeature name={name}
    min={min}
    max={max}
    value={value}/>
  </div>
)