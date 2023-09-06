import React from 'react';
import styled from 'styled-components';
import useViewport from '../hooks/useViewPort';
type Props = {
  width: number;
  data: any;
  index: number;
  key: number;
};

const MainCard = ({ width, data, index, key }: Props) => {
  const { width: mediaWidth } = useViewport();
  return (
    <StMainCard width={width} $mediawidth={mediaWidth}>
      <StMainCardImgContainer
        img_url={
          data.images.length > 1
            ? data.images[1].img_url
            : data.images.length > 0
            ? data.images[0].img_url
            : data.img
        }
      >
        <StMainCardImgIndex>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'var(--achromatic-colors-white, #FFF)',
              fontFamily: 'Pretendard Variable',
              fontStyle: 'normal',
              lineHeight: 'normal',
              letterSpacing: '-0.24px',
            }}
          >
            TOP {index}
          </p>
        </StMainCardImgIndex>
      </StMainCardImgContainer>
      <StCardInfoContainer>
        <StCardInfo>
          <StCardTitle>{data.name}</StCardTitle>
          {/* <StCardSubtitle>
            애니메이션 한줄 소개 애니메이션 한줄 소개
          </StCardSubtitle> */}
        </StCardInfo>
        <StCardHashTagContainer>
          {data.genres.slice(0, 3).map((g: string) => {
            return (
              <StCardHashTag key={key}>
                <StCardHashTagTypo $mediawidth={mediaWidth}>
                  # {g!}
                </StCardHashTagTypo>
              </StCardHashTag>
            );
          })}
        </StCardHashTagContainer>
      </StCardInfoContainer>
    </StMainCard>
  );
};
const StMainCard = styled.div<{ width: number; $mediawidth: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: ${(props) => (props.width * props.$mediawidth) / 1920}px;
  flex-shrink: 0;
`;
const StMainCardImgContainer = styled.div<{ img_url: string }>`
  background-image: ${(props) => `url(${props.img_url})`};
  background-size: cover;
  width: 100%;
  aspect-ratio: 100 / 66;
  background-color: #d9d9d9;
  border-radius: 10px;
`;
const StMainCardImgIndex = styled.div`
  width: 72px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  left: 8px;
  position: relative;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
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
  height: 54px;
  gap: 8px;
`;
const StCardTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #000;
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;
const StCardHashTagContainer = styled.div`
  display: flex;
  //grid-template-columns: repeat(auto-fill, minmax(100%, auto));
  gap: 8px;
`;
const StCardHashTag = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #efefef;
`;
const StCardHashTagTypo = styled.p<{ $mediawidth: number }>`
  color: #000;
  font-family: Pretendard Variable;
  font-size: ${(props) => 15 * (props.$mediawidth / 1920)}px;
  text-size-adjust: auto;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;
export default MainCard;
