import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Menu, Icon, Checkbox } from 'semantic-ui-react'
import { AlbumImage, Track, TrackSnippet, Playlist } from '../../constants/types';

const defaultProps = {
  perPage: 10
}

// TODO: Look for more concise way to declare Props and DefaultProps types
type Props = {
  items: Track[] | Playlist[],
  itemType: 'track' | 'playlist',
  perPage: number,
  rowClickHandler: (song: TrackSnippet) => void,
  itemSelectHandler: (song: TrackSnippet) => void,
}

type DefaultProps = Readonly<typeof defaultProps>

type State = {
  currentPage: number,
  numPages: number,
  activeRow: string, // Stores active song's ID
}

const TableCellSelectable = styled(Table.Cell)`
  padding: .4em .6em!important;

  &:hover {
    cursor: pointer;
    background: 
  }
`

type DisplayAlbumProps = {
  img: string,
  name: string,
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const AlbumImg = styled.img`
  height: 50px;
  margin-right: 5px;
  -webkit-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.75);

  @media (max-width: 768px) {
    height: 40px;
  }
`

const DisplayAlbum = (props: DisplayAlbumProps) => {

  return (
    <Container>
      <AlbumImg src={props.img} alt={props.name} />
      <span>{props.name}</span>
    </Container>
  );
}

class LibraryTable extends Component<Props, State> {

  static defaultProps: DefaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      numPages: 2,
      activeRow: '',
    }
  }

  componentDidMount = () => {
    const { items, perPage } = this.props;
  
    if (items.length) {
      const numItems = items.length;
      this.setState({
        numPages: this.calcNumPages(numItems, perPage)
      });
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    const { items: prevItems } = prevProps;
    const { items, perPage } = this.props;

    if (items.length) {
      if (!prevItems.length || (items[0].name !== prevItems[0].name)) {
        this.setState({
          numPages: this.calcNumPages(items.length, perPage)
        })
      }
    }
  }

  calcNumPages = (numItems: number, perPage: number): number => {
    const numItemsPerPage = perPage;
    return Math.ceil(numItems / numItemsPerPage);
  }

  handlePageLeftClick = () => {
    const { currentPage } = this.state;

    if (currentPage !== 1) {
      this.setState({
        currentPage: currentPage - 1
      });
    }
  }

  handlePageRightClick = () => {
    const { currentPage, numPages } = this.state;

    if (currentPage !== numPages) { 
      this.setState({
        currentPage: currentPage + 1
      });
    }
  }

  handlePageNumberClick = (e: any, { children }: any) => {
    const { currentPage } = this.state;
    const item: number = +children;

    if (currentPage !== item) {
      this.setState({
        currentPage: item
      });
    }
  }

  setActiveRow = (songId: string) => {
    const { activeRow } = this.state;

    if (songId !== activeRow) {
      this.setState({
        activeRow: songId
      });
    }
  }

  renderPagination = () => {
    const { currentPage, numPages } = this.state;

    const renderPageNumbers = () => {
      const items: React.ReactFragment[] = [];
      
      for (let i = 1; i <= numPages; i++) {
        items.push(
          <Menu.Item as='a'
          active={currentPage === i}
          onClick={this.handlePageNumberClick}
          key={i}>
            {i}
          </Menu.Item>
        );
      }

      return items;
    }

    return (
      <Table.Row>
        <Table.HeaderCell colSpan='4'>
          <Menu floated='right' pagination>
            <Menu.Item as='a'
            icon
            onClick={this.handlePageLeftClick}>
              <Icon name='chevron left' />
            </Menu.Item>
            {renderPageNumbers()}
            <Menu.Item as='a'
            icon
            onClick={this.handlePageRightClick}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  renderTable = () => {
    const { currentPage, activeRow } = this.state;
    const { items, itemType, perPage, rowClickHandler, itemSelectHandler } = this.props;

    const tableRows = () => {
      if (itemType === 'track') {
        const displaySongName = (name: string, fragmentKey: number) => {
          // If song name includes featured artists (ex: '(feat. <artists>)'),
          // remove that part
          let songNameSplit = name.split('(feat.');
          const songName = songNameSplit[0];

          return (
            <React.Fragment key={fragmentKey}>
              <span key={name}>{songName}</span>
            </React.Fragment>
          );
        }

        const displayArtistName = (artists: any[], fragmentKey: number) => {
          const items: React.ReactFragment[] = [];
          if (artists) {
            artists.forEach((artist, index) => {
              if (index === 0) {
                items.push(
                  <span key={index}>{artist['name']}</span>
                );
              } else {
                // If the song has multiple artists, include comma before the additional artists' names
                items.push(
                  <span key={index}>, {artist['name']}</span>
                )
              }
            });

            return(
              <React.Fragment key={fragmentKey}>{items}</React.Fragment>     
            );
          }

          return null;
        }

        const rows: React.ReactFragment[] = [];
        const startIdx = (currentPage - 1) * perPage;
        const itemsToDisplay = items.slice(startIdx, startIdx + perPage);

        itemsToDisplay.forEach((item: any, index: number) => {
          const songId: string = item['id'];
          const albumName: string = item['album']['name'];
          const albumImages: AlbumImage[] = item['album']['images'];
          let albumImg = '';
          if (albumImages.length > 1) {
            albumImg = albumImages[1]['url'];
          } else if (albumImages.length === 1) {
            albumImg = albumImages[0]['url'];
          }

          const trackSnippet: TrackSnippet = {
            albumName: albumName,
            albumImage: albumImg,
            artists: item['artists'],
            name: item['name'],
            id: songId,
          }

          rows.push((
            <React.Fragment key={index}>
              <Table.Row key={songId + index}
              active={songId === activeRow}
              onClick={rowClickHandler.bind(this, trackSnippet)}>
                <Table.Cell collapsing onClick={itemSelectHandler.bind(this, trackSnippet)}>
                  <Checkbox />
                </Table.Cell>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {displaySongName(item['name'], index)}
                </TableCellSelectable>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {displayArtistName(item['artists'], index)}
                </TableCellSelectable>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  <DisplayAlbum name={albumName} img={albumImg}/>
                </TableCellSelectable>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {item['playedAt']}
                </TableCellSelectable>
              </Table.Row>
            </React.Fragment>
          ));
        });

        return rows;
      }
    }

    const tableBody = () => {
      if (items) {
        return (
          tableRows()
        );
      }
    }

    return (
      <Table celled
      selectable
      collapsing
      compact='very'
      unstackable
      style={{'border': 'none', 'width': '100%'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Select</Table.HeaderCell>
            <Table.HeaderCell>Song</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell>Played at</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableBody()}
        </Table.Body>

        <Table.Footer>
          {this.renderPagination()}
        </Table.Footer>
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }

}

export default LibraryTable;