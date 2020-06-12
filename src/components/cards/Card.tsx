import React, { Component } from 'react';
import styled from 'styled-components'

const CardContainer = styled.div`
  background: white;
  color: black;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
`


class Card extends Component<any, any> {

  render() {
    return(
      <CardContainer>
        {this.props.children}
      </CardContainer>
    )
  }

}

export default Card;