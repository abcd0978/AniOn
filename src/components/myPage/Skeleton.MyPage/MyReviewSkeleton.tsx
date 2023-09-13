import React from 'react';
import styled from 'styled-components';

interface Props {
  count: number;
}

const ReviewSkeleton: React.FC<Props> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonElement
            style={{ width: '60%', height: '20px', marginBottom: '10px' }}
          />
          <SkeletonElement
            style={{ width: '40%', height: '15px', marginBottom: '10px' }}
          />
          <SkeletonElement
            style={{ width: '100%', height: '50px', marginBottom: '10px' }}
          />
        </SkeletonItem>
      ))}
    </>
  );
};

export default ReviewSkeleton;

const SkeletonItem = styled.div`
  padding-top: 20px;
`;

const SkeletonElement = styled.div`
  background-color: #dbdbdb;
  border-radius: 4px;

  animation-name: skeleton-animation;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;

  @keyframes skeleton-animation {
    to {
      background-color: #f3f3f3;
    }
    from {
      background-color: #dbdbdb;
    }
  }
`;
