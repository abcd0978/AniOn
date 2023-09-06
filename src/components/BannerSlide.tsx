import styled from 'styled-components';
// import Banner from '../components/Banner';
import React from 'react';
import { ReactNode, CSSProperties } from 'react';
// import jusul from '../assets/jusul.svg';
import goTest from '../assets/goTest.svg';

const imgStyle: CSSProperties = {
  zIndex: -1,
};

type Props = {
  image: string;
  name: string;
  title: string;
  desc: string;
  buttonText: string;
  onClick: () => void;
};

const BannerSlide = (props: Props) => {
  return (
    <SlideContainer image={props.image}>
      <StSlideInfoContainer>
        <StSlideInfos>
          <StSlideTitleandDescContainer>
            <StAnionAndRecommend>
              <StAnionTypo>{props.name}</StAnionTypo>
              <StText> 의 추천</StText>
            </StAnionAndRecommend>
            <StAniTitle>{props.title}</StAniTitle>
          </StSlideTitleandDescContainer>
          <StText>{props.desc}</StText>
        </StSlideInfos>
        <StSlideButton onClick={props.onClick}>
          <StSlideButtonType>{props.buttonText}</StSlideButtonType>
          <img src={goTest} alt="" />
        </StSlideButton>
      </StSlideInfoContainer>
      <StGredient />
    </SlideContainer>
  );
};

export default BannerSlide;

const StGredient = styled.div`
  z-index: 5;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    89deg,
    #000 0%,
    rgba(0, 0, 0, 0.02) 36.46%,
    rgba(0, 0, 0, 0) 67.19%,
    #000 100%
  );
`;
const SlideContainer = styled.div<{ image?: string }>`
  ${(props) =>
    props.image
      ? `background-image: url(${props.image});background-size: 100%;`
      : `background:#424242;`}
  //background-image: ${(props) => `url(${props.image});`};
  height: 100%;
  position: relative;
`;
const StSlideInfoContainer = styled.div`
  position: absolute;

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
`;
const StText = styled.p`
  color: var(--achromatic-colors-white, #fff);
  /* 소타이틀/2 */
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.3px;
`;
