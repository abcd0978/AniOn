import React from 'react';
import styled from 'styled-components';

interface Props {
  width: number;
}

const LikedSkeleton: React.FC<Props> = ({ width }) => {
  return (
    <SkeletonContainer>
      <Skeleton width={width} />
    </SkeletonContainer>
  );
};

export default LikedSkeleton;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Skeleton = styled.div<{ width: number }>`
  height: 100px;
  background-color: #dbdbdb;

  ${(props) => `width:${props.width}px;`}

  border-radius: 4px;

  animation-name: skeleton-animation;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes skeleton-animation {
    to {
      background-color: #f3f3f3;
    }
    from {
      background-color: #dbdbdb;
    }
  }
`;
