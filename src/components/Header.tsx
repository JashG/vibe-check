import React from 'react';
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

type Props = {
  defaultText: string,
  color?: string,
  useDropdown?: boolean,
  dropdownOptions?: string[],
  dropdownOptionOnClick?: (event: any, data: any) => void,
}

type HeadingProps = {
  color?: string
}

const Heading = styled.div`
  height: 36px;
  padding: 8px 0 0 8px;
  font-size: 18px;
  background:${(props: HeadingProps) => (props.color ? props.color : '#F5E1EE')};
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
`

const Header = (props: Props) => {
  const { defaultText, color } = props;

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
      {headerContent()}
    </Heading>
  );
}

export default Header;