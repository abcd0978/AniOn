import React from 'react';
import styled from 'styled-components';
import useViewport from '../hooks/useViewPort';
type Props = {
  width: number;
};

const MainCardSkeleton = ({ width }: Props) => {
  const { width: $mediawidth } = useViewport();
  return (
    <StMainCardSkeleton width={width} $mediawidth={$mediawidth}>
      <StMainCardSkeletonImgContainer>
        <StMainCardSkeletonImgIndex />
      </StMainCardSkeletonImgContainer>
      <StCardInfoContainer>
        <StCardInfo>
          <StCardTitle />
        </StCardInfo>
        <StCardHashTagContainer>
          <StCardHashTag>
            <StCardHashTagTypo $mediawidth={$mediawidth} />
          </StCardHashTag>
          <StCardHashTag>
            <StCardHashTagTypo $mediawidth={$mediawidth} />
          </StCardHashTag>
          <StCardHashTag>
            <StCardHashTagTypo $mediawidth={$mediawidth} />
          </StCardHashTag>
        </StCardHashTagContainer>
      </StCardInfoContainer>
    </StMainCardSkeleton>
  );
};
const StMainCardSkeleton = styled.div<{ width: number; $mediawidth: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: ${(props) => (props.width * props.$mediawidth) / 1920}px;

  flex-shrink: 0;
`;
const StMainCardSkeletonImgContainer = styled.div`
  background-size: cover;
  width: 100%;
  aspect-ratio: 100 / 66;
  background-color: #d9d9d9;
  border-radius: 10px;
`;
const StMainCardSkeletonImgIndex = styled.div`
  width: 72px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  left: 8px;
  position: relative;
  border-radius: 8px;
  background: rgba(128, 126, 126, 0.6);
`;
const StCardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;
const StCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 400px;
`;
const StCardTitle = styled.p`
  font-family: Pretendard Variable;
  background-color: #d9d9d9;
  border-radius: 14px;
  width: 150px;
  height: 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;
const StCardHashTagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;
const StCardHashTag = styled.div`
  display: flex;
  padding: 4px 8px;
  width: 50px;
  height: 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #efefef;
`;
const StCardHashTagTypo = styled.p<{ $mediawidth: number }>`
  color: #000;
  font-family: Pretendard Variable;
  //font-size: ${(props) => 13 * (props.$mediawidth / 1920)}px;

  background-color: #d9d9d9;
  font-size: 0.5em;
  text-size-adjust: auto;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;
export default MainCardSkeleton;
