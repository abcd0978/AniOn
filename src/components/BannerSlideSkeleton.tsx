import styled from 'styled-components';
// import Banner from '../components/Banner';
import React from 'react';
import { ReactNode, CSSProperties } from 'react';
const imgStyle: CSSProperties = {
  zIndex: -1,
};

const BannerSlideSkeleton = () => {
  return (
    <SlideContainer>
      <StSlideInfoContainer>
        <StSlideInfos>
          <StSlideTitleandDescContainer>
            <StAnionAndRecommend />
            <StAniTitle />
          </StSlideTitleandDescContainer>
          <StText />
        </StSlideInfos>
        <StSlideButton />
      </StSlideInfoContainer>
      <StGredient />
    </SlideContainer>
  );
};

export default BannerSlideSkeleton;

const StGredient = styled.div`
  z-index: 5;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
`;
const SlideContainer = styled.div`
  background: #d5d5d5;
  height: 100%;
`;
const StSlideInfoContainer = styled.div`
  position: relative;
  background-color: transparent;
  left: 237px;
  top: 319px;
  z-index: 6;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
const StSlideInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
const StSlideButton = styled.button`
  display: flex;
  padding: 12px 12px 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;
  border-radius: 999px;
  background: var(--achromatic-colors-white, #fff);
  cursor: pointer;
  height: 50px;
  width: 126px;
  background-color: #fff;
`;
const StSlideButtonType = styled.p`
  color: var(--achromatic-colors-black, #050505);
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.27px;
`;
const StSlideTitleandDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StAniTitle = styled.div`
  color: #fff;
  /* 대타이틀/1 */
  font-family: 'Cafe24Ssurround';
  font-size: 44px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background-color: #a5a5a5;
  height: 60px;
  border-radius: 14px;
  width: 300px;
`;
const StAnionTypo = styled.p`
  color: var(--achromatic-colors-white, #fff);
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;
const StAnionAndRecommend = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
  height: 30px;
  border-radius: 14px;
  background-color: #d5d5d5;
`;
const StText = styled.p`
  /* 소타이틀/2 */
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.3px;
  background-color: #a5a5a5;
  border-radius: 13px;
  height: 20px;
  width: 350px;
`;
