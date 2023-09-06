import React, { useRef } from 'react';
import styled from 'styled-components';
import DropDownContents from './DropDownContents';
import useViewport from '../../hooks/useViewPort';
export type DropdownContentsType = {
  content: string;
  img_src?: string;
  func: () => void;
};
type Props = {
  children: DropdownContentsType[];
};
function DropDown({ children }: Props) {
  const { width } = useViewport();
  return (
    <StDropdownContainer $mediawidth={width}>
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
const StDropdownContainer = styled.div<{ $mediawidth: number }>`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  z-index: 9;
  top: ${(props) => `${80 * (props.$mediawidth / 1920)}px`};
`;
export default DropDown;
