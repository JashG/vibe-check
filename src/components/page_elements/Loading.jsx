import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Loading = (
  <Segment style={{'margin': '0'}}>
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
);

export default Loading;