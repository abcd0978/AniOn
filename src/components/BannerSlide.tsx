import React from 'react';
import bannerWorldcup from '../assets/bannerWorldcup.svg';
import styled from 'styled-components';
import Banner from '../components/Banner';

const BannerSlide = () => {
  return (
    <Banner
      options={{ loop: true, duration: 20 }}
      slides={[
        <SlideContainer>
          <img src={bannerWorldcup} alt="Slide 1" />
        </SlideContainer>,
      ]}
    />
  );
};
export default BannerSlide;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
