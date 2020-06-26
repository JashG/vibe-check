import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SelectedSong from './SelectedSong';
import { TrackSnippet, TrackAndAudio } from '../../constants/types';

type Props = {
  songs: TrackAndAudio[],
  itemTextClickHandler?: (song: TrackSnippet) => void,
  itemIconClickHandler?: (song: TrackSnippet) => void,
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

const SearchBar = (props: Props) => {

  const renderSelectedSongs = () => {
    const { songs, itemTextClickHandler, itemIconClickHandler } = props;
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

  const getQueryParams = () => {
    return '?songs=' + getSongIdsAsString();
  }

  const getSongIdsAsString = () => {
    const { songs } = props;

    const songIdsList: string[] = [];
    songs.forEach(song => {
      songIdsList.push(song['song']['id']);
    });

    return songIdsList.join();
  }

  return (
    <SearchBarContainer>
      <SelectedSongsContainer>
        {renderSelectedSongs()}
      </SelectedSongsContainer>
      <Link to={{
        pathname: '/recommendations',
        search: getQueryParams()
      }}>
        <button>
          search button
        </button>
      </Link>
    </SearchBarContainer>
  );

}

export default SearchBar;