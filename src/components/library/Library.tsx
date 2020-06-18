import React, { Component } from 'react';
import styled from 'styled-components'
import { Track, TrackAndAudio, TrackSnippet } from '../../constants/types';
import LibraryTable from './LibraryTable';
import Header from '../Header';

const tableOptions = [
  'Recently Played',
  'Your Playlists'
]

type Props = {
  title: string,
  items: Track[],
  itemType: 'track' | 'playlist',
  selectedItems: TrackAndAudio[],
  rowClickHandler: (song: TrackSnippet) => void,
  itemSelectHandler: (song: TrackSnippet) => void,
}

const LibraryContent = styled.div`
  display: flex;
  overflow: auto;
`

class Library extends Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTable: 'Recently Played'
    };
  }

  setActiveTable = (event: any, { text }: any) => {
    this.setState({
      activeTable: text
    });
  }

  render() {
    const { activeTable } = this.state;
    const { items, itemType, selectedItems, rowClickHandler, itemSelectHandler } = this.props;

    return(
      <div>
        <Header defaultText={activeTable}
        useDropdown
        dropdownOptions={tableOptions}
        dropdownOptionOnClick={this.setActiveTable}/>
        <LibraryContent>
          <LibraryTable
          items={items}
          itemType={itemType}
          selectedItems={selectedItems}
          rowClickHandler={rowClickHandler}
          itemSelectHandler={itemSelectHandler}/>
        </LibraryContent>
      </div>
    )
  }

}

export default Library;