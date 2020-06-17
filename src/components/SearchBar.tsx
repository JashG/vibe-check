import React, { Component } from 'react';
import styled from 'styled-components';
import SongBio from '../components/songs/SongBio';
import { TrackSnippet } from '../constants/types';

type State = {
  
}

type Props = {
  song: TrackSnippet,
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  width: 100%;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255, 0.04);
  border: 2px solid rgb(0, 0, 0, 0.08);
  border-radius: 6px;
`

class SearchBar extends Component<Props, {}> {

  render() {
    return (
      <SearchBarContainer>
        <div>
          thing1
        </div>
        <div>
          thing2
        </div>
        <div>
          thing3
        </div>
      </SearchBarContainer>
    );
  }

}

export default SearchBar;