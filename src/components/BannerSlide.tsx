import styled from 'styled-components';
// import Banner from '../components/Banner';
import React from 'react';
// import { ReactNode, CSSProperties } from 'react';
import useViewport from '../hooks/useViewPort';
import goTest from '../assets/goTest.svg';

// const imgStyle: CSSProperties = {
//   zIndex: -1,
// };

type Props = {
  image: string;
  name: string;
  title: string;
  desc: string;
  buttonText: string;
  onClick: () => void;
};

const BannerSlide = (props: Props) => {
  const { width, isMobile } = useViewport();
  return (
    <SlideContainer image={props.image} isMobile={isMobile}>
      <StSlideInfoContainer mediaWidth={width <= 1200 ? 1200 : width}>
        <StSlideInfos mediaWidth={width <= 1200 ? 1200 : width}>
          <StSlideTitleandDescContainer
            mediaWidth={width <= 1200 ? 1200 : width}
          >
            <StAnionAndRecommend>
              <StAnionTypo mediaWidth={width <= 1200 ? 1200 : width}>
                {props.name}
              </StAnionTypo>
              <StText mediaWidth={width <= 1200 ? 1200 : width}>의 추천</StText>
            </StAnionAndRecommend>
            <StAniTitle mediaWidth={width <= 1200 ? 1200 : width}>
              {props.title}
            </StAniTitle>
          </StSlideTitleandDescContainer>
          <StText mediaWidth={width <= 1200 ? 1200 : width}>
            {props.desc}
          </StText>
        </StSlideInfos>
        <StSlideButton
          mediaWidth={width <= 1200 ? 1200 : width}
          onClick={props.onClick}
        >
          <StSlideButtonType mediaWidth={width <= 1200 ? 1200 : width}>
            {props.buttonText}
          </StSlideButtonType>
          <img
            style={{
              width: `${
                width <= 1200 ? (25 * 1200) / 1920 : (25 * width) / 1920
              }px`,
            }}
            src={goTest}
            alt=""
          />
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
const SlideContainer = styled.div<{
  image?: string;
  mediaWidth?: number;
  isMobile: boolean;
}>`
  ${(props) =>
    props.image
      ? props.isMobile
        ? `background-image: url(${props.image});background-size: cover;background-position: 50%;`
        : `background-image: url(${props.image});background-size: 100%;`
      : `background:#424242;`}
  height: 100%;
  position: relative;
`;
const StSlideInfoContainer = styled.div<{
  mediaWidth?: number;
}>`
  position: absolute;
  background-color: transparent;
  left: 10%;
  top: 47%;
  z-index: 6;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => `${20 * (props.mediaWidth! / 1920)}px`};
`;
const StSlideInfos = styled.div<{ mediaWidth?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => `${12 * (props.mediaWidth! / 1920)}px`};
`;
const StSlideButton = styled.button<{ mediaWidth?: number }>`
  display: flex;
  padding: ${(props) => {
    return `${12 * (props.mediaWidth! / 1920)}px  ${
      12 * (props.mediaWidth! / 1920)
    }px ${12 * (props.mediaWidth! / 1920)}px ${
      24 * (props.mediaWidth! / 1920)
    }px;`;
  }};
  justify-content: center;
  align-items: center;
  gap: ${(props) => `${4 * (props.mediaWidth! / 1920)}px`};
  border: none;
  border-radius: 999px;
  background: var(--achromatic-colors-white, #fff);
  cursor: pointer;
`;
const StSlideButtonType = styled.p<{ mediaWidth?: number }>`
  color: var(--achromatic-colors-black, #050505);
  font-family: 'Pretendard-Regular';
  font-size: ${(props) => `${(18 * props.mediaWidth!) / 1920}px;`};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.27px;
`;
const StSlideTitleandDescContainer = styled.div<{ mediaWidth?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => `${8 * (props.mediaWidth! / 1920)}px`};
`;

const StAniTitle = styled.div<{ mediaWidth?: number }>`
  color: #fff;
  /* 대타이틀/1 */
  font-family: 'Cafe24Ssurround';
  font-size: ${(props) => `${(44 * props.mediaWidth!) / 1920}px;`};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StAnionTypo = styled.p<{ mediaWidth?: number }>`
  color: var(--achromatic-colors-white, #fff);
  font-family: 'Pretendard-Regular';
  font-size: ${(props) => `${(20 * props.mediaWidth!) / 1920}px;`};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;
const StAnionAndRecommend = styled.div`
  display: flex;
  flex-direction: row;
`;
const StText = styled.p<{ mediaWidth?: number }>`
  color: var(--achromatic-colors-white, #fff);
  /* 소타이틀/2 */
  font-family: 'Pretendard-Regular';
  font-size: ${(props) => `${(20 * props.mediaWidth!) / 1920}px;`};
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.3px;
`;
