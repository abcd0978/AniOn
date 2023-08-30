import styled from 'styled-components';
// import Banner from '../components/Banner';
import { ReactNode, CSSProperties } from 'react';
// import jusul from '../assets/jusul.svg';
import jusul from '../assets/jusulgg.png';
import hosino from '../assets/hosihoii.jpg';
import gil from '../assets/gil.jpg';
import cha from '../assets/cha.jpg';

const StGredient = styled.div`
  z-index: 5;
  position: relative;
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
  background-image: ${(props) => `url(${props.image});`};
  background-size: 100%;
  height: 100%;
`;
const imgStyle: CSSProperties = {
  zIndex: -1,
};

const BannerSlide: ReactNode[] = [
  <SlideContainer image={hosino}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={jusul}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={gil}>
    <StGredient />
  </SlideContainer>,
  <SlideContainer image={cha}>
    <StGredient />
  </SlideContainer>,

  // 다른 슬라이드들 추가
];

export default BannerSlide;
