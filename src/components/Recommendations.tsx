import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface Props extends RouteComponentProps<any> {
  // props
}

type State = {
  //
}

const SelectedSongsDisplay = () => {
  return (
    <div>Songs you selected</div>
  )
}

class Recommendations extends Component<Props, State> {

  componentDidMount = () => {
    this.handleRecommendations();
  }

  handleRecommendations = async () => {
    const { location } = this.props;
    if (!location.search) return;

    const songIds = this.getSongIdsFromParam(location.search);
    if (!songIds) return;

    const recommendations = await this.getRecommendations(songIds);

    console.log(recommendations);

  }

  getSongIdsFromParam = (param: string) => {
    const items = param.split('=');
    if (items.length !== 2) return '';

    return items[1];
  }

  getRecommendations = (songIds: string) => {
    return axios.get('/api/recommendations/' + songIds);
  }

  render = () => {
    return (
      <Container style={{'marginTop': '10px'}}>
        <Row>
          Row 1
        </Row>

        <Row>
          Row 2
        </Row>
      </Container>
    )
  }
}

export default Recommendations;