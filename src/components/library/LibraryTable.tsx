import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Menu, Icon } from 'semantic-ui-react'
import { Track, Playlist } from '../../constants/types';

const defaultProps = {
  perPage: 10
}

// TODO: Look for more concise way to declare Props and DefaultProps types
type Props = {
  items: Track[] | Playlist[],
  itemType: 'track' | 'playlist',
  perPage: number,
}

type DefaultProps = Readonly<typeof defaultProps>

type State = {
  currentPage: number,
  numPages: number,
  activeRow: string, // Stores active song's ID
}

// Note: the !important tag only applies to instances of styled components, so this
// is a better approach than globally overriding Semantic UI's css
const TableCellSelectable = styled(Table.Cell)`
  padding: .4em .6em!important;

  &:hover {
    cursor: pointer;
    background: 
  }
`

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
    const { items, itemType, perPage } = this.props;

    const tableRows = () => {
      if (itemType === 'track') {
        const displaySongName = (name: string, fragmentKey: number) => {
          const items: React.ReactFragment[] = [];
          if (name) {
            items.push(
              <span key={name}>{name}</span>
            );
          }

          return (
            <React.Fragment key={fragmentKey}>
              {items}
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
          rows.push((
            <React.Fragment key={index}>
              <Table.Row key={songId + index} active={songId === activeRow}>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {displaySongName(item['name'], index)}
                </TableCellSelectable>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {displayArtistName(item['artists'], index)}
                </TableCellSelectable>
                <TableCellSelectable active={songId === activeRow} onClick={this.setActiveRow.bind(this, songId)}>
                  {item['album']['name']}
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
      style={{'border': 'none', 'width': '100%'}}>
        <Table.Header>
          <Table.Row>
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