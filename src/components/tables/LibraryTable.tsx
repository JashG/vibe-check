import React, { Component } from 'react';
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
}

class LibraryTable extends Component<Props, State> {

  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      numPages: 2,
    }
  }

  componentDidMount = () => {
    const { items, perPage } = this.props;
  
    if (items.length) {
      const numItems = items.length;
      this.setState({
        numPages: this.getNumPages(numItems, perPage)
      });
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    const { items: prevItems } = prevProps;
    const { items, perPage } = this.props;

    if (items.length) {
      if (!prevItems.length || (items[0].name !== prevItems[0].name)) {
        this.setState({
          numPages: this.getNumPages(items.length, perPage)
        })
      }
    }
  }

  getNumPages = (numItems: number, perPage: number): number => {
    const numItemsPerPage = perPage;
    return Math.ceil(numItems / numItemsPerPage);
  }

  handlePageLeftClick = () => {
    const { currentPage } = this.state;

    if (currentPage === 1) return;

    this.setState({
      currentPage: currentPage - 1
    });
  }

  handlePageRightClick = () => {
    const { currentPage, numPages } = this.state;

    if (currentPage === numPages) return;

    this.setState({
      currentPage: currentPage + 1
    });
  }

  handlePageNumberClick = (e: any, { name }: any) => {
    const { currentPage } = this.state;
    const item: number = +name;

    if (currentPage === item) return;

    this.setState({
      currentPage: item
    });
  }

  renderPagination = () => {
    const { numPages } = this.state;

    const renderPageNumbers = () => {
      const items: React.ReactFragment[] = [];
      
      for (let i = 1; i <= numPages; i++) {
        items.push(
          <Menu.Item as='a' onClick={this.handlePageNumberClick}>{i}</Menu.Item>
        );
      }

      return items;
    }

    return (
      <Table.Row>
        <Table.HeaderCell colSpan='4'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon onClick={this.handlePageLeftClick}>
              <Icon name='chevron left' />
            </Menu.Item>
            {renderPageNumbers()}
            <Menu.Item as='a' icon onClick={this.handlePageRightClick}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  renderTable = () => {
    const { currentPage } = this.state;
    const { items, itemType, perPage } = this.props;

    const tableRows = () => {
      if (itemType === 'track') {
        const displaySongName = (name: String, fragmentKey: number) => {
          const items: React.ReactFragment[] = [];
          if (name) {
            items.push(
              <span>{name}</span>
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
          rows.push((
            <React.Fragment key={index}>
              <Table.Row key={item['name']}>
                <Table.Cell>{displaySongName(item['name'], index)}</Table.Cell>
                <Table.Cell>{displayArtistName(item['artists'], index)}</Table.Cell>
                <Table.Cell>{item['album']['name']}</Table.Cell>
                <Table.Cell>{item['playedAt']}</Table.Cell>
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