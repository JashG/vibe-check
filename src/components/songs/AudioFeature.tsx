import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string,
  min: number,
  max: number,
  value: number,
  // color: string,
}

type ValueBarProps = {
  percentFill: number,
}

const ValueBar = styled.div`
  height: 18px;
  width: 100%;
  border: 2px solid black;
  border-radius: 4px;

  > div {
    height: 100%;
    width: ${(props: ValueBarProps) => (props.percentFill + '%')};
    background-color: black;
  }
`

const AudioFeature = (props: Props) => {

  const getPercentFill = () => {
    const { min, max, value } = props;

    if (max > min && value > 0) {
      return (value / (max - min)) * 100;
    }

    return 0;
  }

  return(
    <ValueBar percentFill={getPercentFill()}>
      <div></div>
    </ValueBar>
  );

}

export default AudioFeature;