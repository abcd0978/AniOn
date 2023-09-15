import React from 'react';
import styled from 'styled-components';
type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <LoadingContainer>
        <Spinner src={'/images/LoadingSpinnerPageSvg.svg'} alt="스피너" />
        <LoadingInfoContainer>
          <LoadingTypo>다양한 애니메이션 콘텐츠의 풍부한 세계</LoadingTypo>
          <Logo src={'/images/logo.svg'} alt="로고" />
        </LoadingInfoContainer>
      </LoadingContainer>
    </div>
  );
};

const LoadingContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const LoadingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const LoadingTypo = styled.p`
  color: var(--achromatic-colors-darkgray, #4f4f4f);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.24px;
`;
const Spinner = styled.img`
  width: 100px;
  height: 100px;
  animation: rotate_image 1s linear infinite;
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Logo = styled.img`
  width: 80px;
  height: 19.476px;
`;
export default Loading;
