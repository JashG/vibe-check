import React, { Component } from 'react';
import styled from 'styled-components';
import SongBio from '../components/songs/SongBio';
import SelectedSong from '../components/songs/SelectedSong';
import { TrackAndAudio } from '../constants/types';

type State = {
  // none, for now
}

type Props = {
  songs: TrackAndAudio[],
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 6px;
  background-color: rgb(255, 255, 255, 0.06);
`

const SelectedSongsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 80%;
  overflow: hidden;
`

class SearchBar extends Component<Props, {}> {

  renderSelectedSongs = () => {
    const { songs } = this.props;
    const selectedSongs: React.ReactFragment[] = [];

    songs.forEach(song => {
      selectedSongs.push(
        <SelectedSong key={song['song']['id']} song={song}/>
      );
    });

    return selectedSongs;
  }

  render() {
    return (
      <SearchBarContainer>
        <SelectedSongsContainer>
          {this.renderSelectedSongs()}
        </SelectedSongsContainer>
        <div>
          search button
        </div>
      </SearchBarContainer>
    );
  }

}

export default SearchBar;