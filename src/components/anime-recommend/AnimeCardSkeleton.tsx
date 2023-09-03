import React from 'react';
import styled from 'styled-components';

interface Props {}

const AnimeCardSkeleton = () => {
  return (
    <CardDiv>
      <CardInfo>
        <ImgImitate />
        <CardTitle />
      </CardInfo>
      <CardGenres>
        <Genre />
        <Genre />
      </CardGenres>
    </CardDiv>
  );
};
const HoverDiv = styled.div`
  position: relative;
`;
const ImgImitate = styled.div`
  width: 100%;
  height: 320px;
  background-color: #d5d5d5;
  border-radius: 10px;
`;
const CardDiv = styled.div`
  position: relative; // hover 요소들을 absolute로 사용하기 위해 사용
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  height: 100%;
`;
const CardInfo = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 220px;
  height: 350px;
  @media (max-width: 540px) {
    width: 100%;
    height: 100%;
  }
`;

export const HoverInfo = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  z-index: 20;
  line-height: 25px;
  color: #ffffff;
  height: 90%;
  width: 86%;
  padding: 16px;
`;
const CardTitle = styled.div`
  width: 220px;
  height: 19px;
  background-color: #d5d5d5;
  font-weight: 600;
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Genre = styled.div`
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  height: 16px;
  width: 20px;
  background: #efefef;
  border-radius: 999px;
`;
const CardGenres = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export default AnimeCardSkeleton;
