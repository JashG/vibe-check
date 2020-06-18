import React from 'react';
import styled from 'styled-components';
import { DARK_ACCENT, TEXT_LIGHT } from '../../constants/colors';

type Props = {
  name: string,
  min: number,
  max: number,
  value: number,
}

type PercentProps = {
  percentFill: number,
}

const FeatureContainer = styled.div`
  height: 60px;
`

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
    border-radius: 4px;
    background-color: ${DARK_ACCENT};
  }
`

const ValueContainer = styled.div`
  margin-top: 5px;
  margin-left: ${(props: PercentProps) => (props.percentFill < 92 ? props.percentFill + '%' : '92%')};
`

const Value = styled.span`
  padding: 2px 4px 2px 4px;
  font-size: 12px;
  border-radius: 3px;
  background-color: ${DARK_ACCENT};
  color: ${TEXT_LIGHT};
`

const AudioFeature = (props: Props) => {

  const getPercentFill = () => {
    const { min, max, value } = props;

    if (max > min && value > 0) {
      return (value / (max - min)) * 100;
    }

    return 0;
  }

  const getValueRounded = (val: number) => {
    return val.toFixed(2);
  }

  const { name, value } = props;

  return(
    <FeatureContainer>
      <FeatureName>{name}</FeatureName>
      <ValueBar percentFill={getPercentFill()}>
        <div/>
        <ValueContainer percentFill={getPercentFill()}>
          <Value>{getValueRounded(value)}</Value>
        </ValueContainer>
      </ValueBar>
    </FeatureContainer>
  );

}

export default AudioFeature;