import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string,
  min: number,
  max: number,
  value: number,
}

type PercentProps = {
  percentFill: number,
}

const FeatureName = styled.span`
  text-transform: capitalize;
`

const ValueBar = styled.div`
  height: 18px;
  width: 100%;
  border: 2px solid rgba(0,0,0,0.08);
  border-radius: 6px;

  > div:first-child {
    height: 100%;
    width: ${(props: PercentProps) => (props.percentFill + '%')};
    background-color: #DCECFE;
  }
`

const ValueTooltip = styled.div`
  margin-left: ${(props: PercentProps) => (props.percentFill + '%')};
`

const AudioFeature = (props: Props) => {

  const getPercentFill = () => {
    const { min, max, value } = props;

    if (max > min && value > 0) {
      return (value / (max - min)) * 100;
    }

    return 0;
  }

  const { name, value } = props;

  return(
    <div>
      <FeatureName>{name}</FeatureName>
      <ValueBar percentFill={getPercentFill()}>
        <div/>
        <ValueTooltip percentFill={getPercentFill()}>{value}</ValueTooltip>
      </ValueBar>
    </div>
  );

}

export default AudioFeature;