import React, { Component } from 'react';
import styled from 'styled-components'
import Card from './Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface UserDataProps {
  mainHeading?: boolean
}

const data = {
  name: 'Jash Gulabrai',
  followers: {
    total: 17
  },
  playlists: 3,
  picture: 'https://i.scdn.co/image/ab6775700000ee85f6fa78d66f50ac65d779a336',
}

const UserHeadline = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  height: 125px;
  padding: 10px;
`

const UserImage = styled.img`
  height: 100px;
  border-radius: 50px;
`

const UserDataContainer = styled.div`
  padding-left: 5px;
`

const UserData = styled.span`
  display: block;
  font-size: ${(props: UserDataProps) => (props.mainHeading ? '20px' : '16px')};
`


class UserCard extends Component<any, any> {

  render() {
    return(
      <Container style={{margin: '20px'}}>
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <UserHeadline>
                <UserImage src={data.picture} alt=""/>
                <UserDataContainer>
                  <UserData mainHeading>{data.name}</UserData>
                  <UserData>Followers: {data.followers.total}</UserData>
                  <UserData>Playlists: {data.playlists}</UserData>
                </UserDataContainer>
              </UserHeadline>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            stuff
          </Col>
        </Row>
      </Container>
    )
  }

}

export default UserCard;