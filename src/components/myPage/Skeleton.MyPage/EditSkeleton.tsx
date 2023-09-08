import React from 'react';
import styled from 'styled-components';

interface EditProfileSkeletonProps {
  width: number;
}

const EditProfileSkeleton: React.FC<EditProfileSkeletonProps> = ({ width }) => {
  return (
    <SkeletonContainer>
      <ItemSkeleton width={width}>
        <LabelSkeleton />
        <Skeleton width={100} />
      </ItemSkeleton>
      <DividerSkeleton />
      <ItemSkeleton width={width}>
        <LabelSkeleton />
        <Skeleton width={200} />
      </ItemSkeleton>
      <DividerSkeleton />
      <LabelSkeleton />
      <PasswordResetSkeleton />
      <DividerSkeleton />
      <ItemSkeleton width={width}>
        <LabelSkeleton />
        <Skeleton width={200} />
      </ItemSkeleton>
      <DividerSkeleton />
    </SkeletonContainer>
  );
};

export default EditProfileSkeleton;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  top: -300px;
  margin-left: 160px;
  margin-bottom: 130px;
`;

const ItemSkeleton = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  ${(props) => `width:${props.width}px;`}
`;

const LabelSkeleton = styled.div`
  height: 16px;
  width: 70px;
  background-color: #dbdbdb;
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

const DividerSkeleton = styled.div`
  width: 900px;
  height: 1px;
  background-color: #ccc;
`;

const PasswordResetSkeleton = styled.div`
  height: 16px;
  width: 200px;
  background-color: #dbdbdb;
`;
