import React from 'react';
import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

interface SkeletonDivProps {
  animationDuration?: string;
  boxWidth?: string;
}

const SkeletonContainer = styled.div`
  position: relative;
`;

const SkeletonTitle = styled.div<SkeletonDivProps>`
  width: 200px;
  height: 32px;

  background-image: linear-gradient(to right, #f8f8f8, #e8e8e8, #f8f8f8);
  background-size: calc(100% + 200px) auto;
  animation: ${({ animationDuration }) => skeletonAnimation}
    ${({ animationDuration }) => animationDuration || '1.5s'} infinite linear
    forwards;
`;

const SkeletonPostBox = styled.div<SkeletonDivProps>`
  background-image: linear-gradient(to right, #f8f8f8, #e8e8e8, #f8f8f);
  background-size: calc(100% + ${({ boxWidth }) => boxWidth || '300px'}) auto;
  animation: ${({ animationDuration }) => skeletonAnimation}
    ${({ animationDuration }) => animationDuration || '1.5s'} infinite linear
    forwards;
`;

const MyPostsSkeleton = () => (
  <SkeletonContainer>
    <SkeletonTitle />
    {[...Array(3)].map((_, index) => (
      <SkeletonPostBox
        key={index}
        boxWidth={`${
          Math.floor(Math.random() * (400 - index * 30)) + index * 30
        }px`}
      />
    ))}
  </SkeletonContainer>
);

export default MyPostsSkeleton;
