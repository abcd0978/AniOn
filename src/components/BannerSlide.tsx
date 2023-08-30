import styled from 'styled-components';
// import Banner from '../components/Banner';
import { ReactNode, CSSProperties } from 'react';
import aa from '../assets/aa.svg';
import jusul from '../assets/jusul.svg';
import jjang from '../assets/jjang.svg';
import choiai from '../assets/최애.jpg';
import ju from '../assets/주술.jpg';
const StGredient = styled.div`
  z-index: 5;
  position: relative;
  width: 1920px;
  height: 700px;
  background: linear-gradient(
    89deg,
    #000 0%,
    rgba(0, 0, 0, 0.02) 36.46%,
    rgba(0, 0, 0, 0) 67.19%,
    #000 100%
  );
`;
const SlideContainer = styled.div<{ image?: string }>`
  background-image: ${(props) => `url(${props.image});`};
`;
const imgStyle: CSSProperties = {
  zIndex: -1,
};
const BannerSlide: ReactNode[] = [
  <SlideContainer image={choiai}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={jusul}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={jjang}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={ju.j}>
    <StGredient />
  </SlideContainer>,

  // 다른 슬라이드들 추가
];

export default BannerSlide;
