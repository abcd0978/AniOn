import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import DropDownContents from './DropDownContents';
import * as dropDownStore from '../../store/dropDownStore';
import useViewport from '../../hooks/useViewPort';
import { useSetAtom } from 'jotai';
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
  const dropDownOpenned = useSetAtom(dropDownStore.isDropDownOn);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleOutside(e: any) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        dropDownOpenned(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [dropDownRef, dropDownOpenned]);
  return (
    <StDropdownContainer ref={dropDownRef} $mediawidth={width}>
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
