import bannerWorldcup from '../assets/bannerWorldcup.svg';
import styled from 'styled-components';
// import Banner from '../components/Banner';
import { ReactNode } from 'react';

const SlideContainer = styled.div`
  background: linear-gradient(89deg, #000 0%, rgba(0, 0, 0, 0.02) 36.46%, rgba(0, 0, 0, 0.00) 67.19%, #000 100%);


  );`;

const BannerSlide: ReactNode[] = [
  <SlideContainer>
    <img src={bannerWorldcup} alt="Slide 1" />
  </SlideContainer>,

  // 다른 슬라이드들 추가
];

export default BannerSlide;
