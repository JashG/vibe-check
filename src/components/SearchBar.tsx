import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SelectedSong from '../components/songs/SelectedSong';
import { TrackSnippet, TrackAndAudio } from '../constants/types';

type State = {
  // none, for now
}

type Props = {
  songs: TrackAndAudio[],
  itemTextClickHandler: (song: TrackSnippet) => void,
  itemIconClickHandler: (song: TrackSnippet) => void,
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
  width: 85%;
  overflow: hidden;
`

class SearchBar extends Component<Props, {}> {

  renderSelectedSongs = () => {
    const { songs, itemTextClickHandler, itemIconClickHandler } = this.props;
    const selectedSongs: React.ReactFragment[] = [];

    songs.forEach(song => {
      selectedSongs.push(
        <SelectedSong key={song['song']['id']}
        song={song}
        itemTextClickHandler={itemTextClickHandler}
        itemIconClickHandler={itemIconClickHandler}/>
      );
    });

    return selectedSongs;
  }

  handleRecommendations = async () => {
    const { songs } = this.props;
    if (!songs.length) return;

    const songIdsList: string[] = [];
    songs.forEach(song => {
      songIdsList.push(song['song']['id']);
    });
    const songIds = songIdsList.join();

    const recommendations = await this.getRecommendations(songIds);

    console.log(recommendations);

  }

  getRecommendations = (songIds: string) => {
    return axios.get('/api/recommendations/' + songIds);
  }

  render() {
    return (
      <SearchBarContainer>
        <SelectedSongsContainer>
          {this.renderSelectedSongs()}
        </SelectedSongsContainer>
        <button onClick={this.handleRecommendations}>
          search button
        </button>
      </SearchBarContainer>
    );
  }

}

export default SearchBar;