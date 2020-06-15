import React from 'react';
import styled from 'styled-components';
import Header from '../../Header';
import SongBio from '../SongBio';

type Props = {
  songId: string
}

const SelectedSong = (props: Props) => {
  const { songId } = props;

  return(
    <div>
      <Header defaultText='Selected Song' color={'#feecdc'}/>
      {songId ? songId : 'no song selected'}
      <SongBio/>
    </div>
  );

}

export default SelectedSong;