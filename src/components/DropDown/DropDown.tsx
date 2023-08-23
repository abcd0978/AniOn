import React from "react";
import styled from "styled-components";
import DropDownContents from "./DropDownContents";
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
          index={index}
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
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
`;
export default DropDown;
