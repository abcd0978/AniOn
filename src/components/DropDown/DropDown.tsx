import React, { useRef } from 'react';
import styled from 'styled-components';
import DropDownContents from './DropDownContents';
export type DropdownContentsType = {
  content: string;
  img_src?: string;
  func: () => void;
};
type Props = {
  children: DropdownContentsType[];
};
function DropDown({ children }: Props) {
  return (
    <StDropdownContainer>
      {children.map((child, index) => (
        <DropDownContents
          NumOfChildren={children.length}
          index={index + 1}
          key={index}
          data={child}
        />
      ))}
    </StDropdownContainer>
  );
}
const StDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 3;
  top: 30px;
`;
export default DropDown;
