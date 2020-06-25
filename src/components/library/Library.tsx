import React, { Component } from 'react';
import styled from 'styled-components'
import { TrackSnippet, TrackAndAudio } from '../../constants/types';
import SongLibraryTable from './SongLibraryTable';
import Header from '../Header';

type Props = {
  defaultText: string,
  items: TrackSnippet[],
  fetchingItems: boolean,
  selectedItems: TrackAndAudio[],
  rowClickHandler: (song: TrackSnippet) => void,
  itemSelectHandler: (song: TrackSnippet) => void,
  tableOptions?: string[],
}

const LibraryContent = styled.div`
  display: flex;
  overflow: auto;
`

class Library extends Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTable: ''
    };
  }

  setActiveTable = (event: any, { text }: any) => {
    this.setState({
      activeTable: text
    });
  }

  render() {
    const { activeTable } = this.state;
    const { defaultText, tableOptions, items, fetchingItems, selectedItems, rowClickHandler, itemSelectHandler } = this.props;

    return(
      <div>
        <Header defaultText={defaultText}
        activeText={activeTable.length ? activeTable : defaultText}
        icon='music'
        useDropdown
        dropdownOptions={tableOptions}
        dropdownOptionOnClick={this.setActiveTable}/>
        <LibraryContent>
          <SongLibraryTable
          items={items}
          fetchingItems={fetchingItems}
          itemType='track'
          selectedItems={selectedItems}
          rowClickHandler={rowClickHandler}
          itemSelectHandler={itemSelectHandler}/>
        </LibraryContent>
      </div>
    )
  }

}

export default Library;