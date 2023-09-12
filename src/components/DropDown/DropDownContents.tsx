import React from 'react';
import styled from 'styled-components';
import useViewport from '../../hooks/useViewPort';
import type { DropdownContentsType } from './DropDown';
import { isDropDownOn } from '../../store/dropDownStore';
type Props = {
  data: DropdownContentsType;
  NumOfChildren: number;
  index: number;
};

function DropDownContents({ data, NumOfChildren, index }: Props) {
  const { width } = useViewport();
  const processOrder = (): number => {
    if (NumOfChildren === 1 && index === 1) {
      //처음인데 하나밖에 없을때
      return 2;
    }
    if (index === 1) {
      //처음인데 하나이상있을때
      return 0;
    } else if (NumOfChildren === index) {
      //끝에있을때
      return -1;
    }
    //중간에 있을때
    return 1;
  };
  return (
    <StDropdownMenu
      $mediawidth={width >= 786 ? width : 786}
      order={processOrder()}
      onClick={() => {
        data.func();
      }}
    >
      {data.img_src && <img src={data.img_src} alt="img" />} {data.content}
    </StDropdownMenu>
  );
}
const StDropdownMenu = styled.div<{ order: number; $mediawidth: number }>`
  display: flex;
  width: ${(props) => 156 * (props.$mediawidth / 1920)}px;
  height: ${(props) => 56 * (props.$mediawidth / 1920)}px;

  padding: ${(props) => {
    return `${13 * (props.$mediawidth / 1920)}px ${
      16 * (props.$mediawidth / 1920)
    }px `;
  }};
  align-items: center;
  //justify-content:space-between;
  cursor: pointer;
  place-content: center;
  gap: 8px;
  & :hover {
    background: #dfdfdf;
  }
  background: var(--achromatic-colors-white, #fff);

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
    ${(props) => {
      if (props.order === 0) {
        //처음시작하는애
        return `border-radius: 10px 10px 0px 0px;  box-shadow: 0px -20px 40px 0px rgba(0, 0, 0, 0.1);`;
      } else if (props.order === 1) {
        //중간에 끼어있는애
        return ``; //z-index:10;box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.1), -1px 0px 10px 0px rgba(0, 0, 0, 0.1);`;
      } else if (props.order === 2) {
        //혼자있는애
        return `border-radius: 10px 10px 10px 10px;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);`;
      } else {
        //마지막에 있는애
        return `border-radius: 0px 0px 10px 10px; box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);`;
      }
    }}
  }

  ${(props) => {
    if (props.order === 0) {
      return `border-radius: ${(14 * props.$mediawidth) / 1920}px ${
        (14 * props.$mediawidth) / 1920
      }px 0px 0px;`;
    } else if (props.order === 1) {
      return ``;
    } else if (props.order === 2) {
      return `border-radius: ${(14 * props.$mediawidth) / 1920}px ${
        (14 * props.$mediawidth) / 1920
      }px ${(14 * props.$mediawidth) / 1920}px ${
        (14 * props.$mediawidth) / 1920
      }px;`;
    } else {
      return `border-radius: 0px 0px ${(14 * props.$mediawidth) / 1920}px ${
        (14 * props.$mediawidth) / 1920
      }px;`;
    }
  }}
  z-index:9;
`;
export default DropDownContents;
