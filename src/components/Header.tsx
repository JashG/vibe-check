import React from 'react';
import styled from 'styled-components'
import { Dropdown, Icon } from 'semantic-ui-react'
import { PRIMARY, TEXT_LIGHT } from '../constants/colors';

type Props = {
  defaultText: string,
  icon?: string,
  color?: string,
  useDropdown?: boolean,
  dropdownOptions?: string[],
  dropdownOptionOnClick?: (event: any, data: any) => void,
}

type HeadingProps = {
  backgroundColor?: string
}

const Heading = styled.div`
  height: 36px;
  padding: 8px 0 0 8px;
  font-size: 18px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  background-color: ${(props: HeadingProps) => (props.backgroundColor ? props.backgroundColor : PRIMARY)};
  color: ${TEXT_LIGHT};
  font-weight: 600;
`

const Header = (props: Props) => {
  const { defaultText, icon, color } = props;

  const headerContent = () => {
    if (props.useDropdown && props.dropdownOptions) {
      const dropdownItems: React.ReactFragment[] = [];
      props.dropdownOptions.forEach((item, index) => {
        dropdownItems.push(
          <Dropdown.Item text={item}
          onClick={props.dropdownOptionOnClick}
          key={index}
          />
        );
      });

      return (
        <Dropdown text={defaultText} defaultValue={defaultText}>
          <Dropdown.Menu>
            {dropdownItems}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <span>{defaultText}</span>
    );
  }

  return (
    <Heading color={color}>
      {icon ? <Icon className={icon} style={{'marginRight': '6px'}}/> : null}
      {headerContent()}
    </Heading>
  );
}

export default Header;