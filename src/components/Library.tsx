import React, { Component } from 'react';
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
import { Track, Playlist } from '../constants/types';
import Table from './tables/LibraryTable';

type Props = {
  title: string,
  items: Track[] | Playlist[],
  itemType: 'track' | 'playlist'
}

const Heading = styled.div`
  height: 36px;
  padding: 8px 0 0 8px;
  font-size: 18px;
  background: #F5E1EE;
  border-bottom: 2px solid rgba(184, 169, 179, 0.3);
`

const LibraryContent = styled.div`
  // height: 300px;
`

class Library extends Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      source: 'Recently Played'
    };
  }

  setSource = (event: any, data: any) => {
    this.setState({
      source: data.text
    })
  }

  renderDropdown = () => {
    const { source } = this.state;

    return (
      <Heading>
        <Dropdown text={source} defaultValue={source}>
          <Dropdown.Menu>
            <Dropdown.Item text='Recently Played' onClick={this.setSource}/>
            <Dropdown.Item text='Your Playlists' onClick={this.setSource}/>
          </Dropdown.Menu>
        </Dropdown>
      </Heading>
    )
  }

  render() {
    const { items, itemType } = this.props;

    return(
      <div>
        {this.renderDropdown()}
        <LibraryContent>
          <Table items={items} itemType={itemType}/>
        </LibraryContent>
      </div>
    )
  }

}

export default Library;