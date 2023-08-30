import bannerWorldcup from '../assets/bannerWorldcup.svg';
import styled from 'styled-components';
// import Banner from '../components/Banner';
import { ReactNode } from 'react';
import aa from '../assets/aa.svg';

const SlideContainer = styled.div`
  position: relative; /* 상대적 위치 설정 */
  background: linear-gradient(
    89deg,
    #000 0%,
    rgba(0, 0, 0, 0.02) 36.46%,
    rgba(0, 0, 0, 0) 67.19%,
    #000 100%
  );

  img {
    // position: absolute; /* 절대 위치 설정 */
    // z-index: -1; /* 이미지를 그라디언트 배경 뒤에 위치시킴 */
  }
`;

const BannerSlide: ReactNode[] = [
  <SlideContainer>
    <img src={aa} alt="Slide 1" />
  </SlideContainer>,

  // 다른 슬라이드들 추가
];

export default BannerSlide;
