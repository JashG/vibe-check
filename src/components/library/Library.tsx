import React, { Component } from 'react';
import styled from 'styled-components'
import { Track, Playlist } from '../../constants/types';
import LibraryTable from './LibraryTable';
import Header from '../Header';

const tableOptions = [
  'Recently Played',
  'Your Playlists'
]

type Props = {
  title: string,
  items: Track[] | Playlist[],
  itemType: 'track' | 'playlist'
}

const LibraryContent = styled.div`
  // height: 300px;
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
    })
  }

  render() {
    const { activeTable } = this.state;
    const { items, itemType } = this.props;

    return(
      <div>
        <Header defaultText={activeTable}
        useDropdown
        dropdownOptions={tableOptions}
        dropdownOptionOnClick={this.setActiveTable}/>
        <LibraryContent>
          <LibraryTable items={items} itemType={itemType}/>
        </LibraryContent>
      </div>
    )
  }

}

export default Library;