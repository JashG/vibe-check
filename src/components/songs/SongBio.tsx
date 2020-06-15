import React from 'react';
import styled from 'styled-components';

const SongBioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const MainInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SongBio = (props: any) => {

  return(
    <SongBioContainer>
      image
      <MainInfoTextContainer>
        <span>Song</span>
        <span>Artist</span>
      </MainInfoTextContainer>
    </SongBioContainer>
  );

}

export default SongBio;