import React from 'react';
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

type Props = {
  defaultText: string,
  useDropdown?: boolean,
  dropdownOptions?: string[],
  dropdownOptionOnClick?: (event: any, data: any) => void,
}

const Heading = styled.div`
  height: 36px;
  padding: 8px 0 0 8px;
  font-size: 18px;
  background: #F5E1EE;
  border-bottom: 2px solid rgba(184, 169, 179, 0.3);
`

const Header = (props: Props) => {
  const { defaultText } = props;

  const headerContent = () => {
    if (props.useDropdown) {
      if (props.dropdownOptions) {
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

      return null;
    }

    return (
      <span>{defaultText}</span>
    );
  }

  return (
    <Heading>
      {headerContent()}
    </Heading>
  );
}

export default Header;