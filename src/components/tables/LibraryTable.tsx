import React, { Component } from 'react';
import { Table, Pagination } from 'semantic-ui-react'
import { Track, Playlist } from '../../constants/types';

import './LibraryTable.css';

type Props = {
  items: Track[] | Playlist[],
  itemType: 'track' | 'playlist'
}

class LibraryTable extends Component<Props, any> {

  renderTable = () => {
    const { items, itemType } = this.props;
    console.log(items)

    const tableRows = () => {
      if (itemType === 'track') {
        const displayArtistData = (artists: any[], fragmentKey: number) => {
          const items: React.ReactFragment[] = [];
          if (artists) {
            artists.forEach(artist => {
              items.push(
                <span key={artist['id']}>{artist['name']}</span>
              );
            });

            return(
              <React.Fragment key={fragmentKey}>{items}</React.Fragment>     
            )
          }

          return null;
        }

        const displayNameData = (name: String, duration: number, index: number) => {
          const items: React.ReactFragment[] = [];
          if (name) {
            items.push(
              <span>{name}</span>
            );
          }
          if (duration) {
            items.push(
              <span>{duration}</span>
            );
          }

          return (
            <React.Fragment key={index}>
              {items}
            </React.Fragment>
          )
        }

        const rows: React.ReactFragment[] = [];
        items.forEach((item: any, index: number) => {
          rows.push((
            <React.Fragment key={index}>
              <Table.Row key={item['name']}>
                <Table.Cell>{displayNameData(item['name'], item['duration'], index)}</Table.Cell>
                <Table.Cell>{displayArtistData(item['artists'], index)}</Table.Cell>
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
          <Table.Body>
            {tableRows()}
          </Table.Body>
        );
      }
    }

    return (
      <Table celled
      collapsing
      compact='very'
      style={{'border': 'none'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Song</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell>Played at</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {tableBody()}
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    )
  }

}

export default LibraryTable;