import React from 'react';
import styled from 'styled-components';
import viewDetail from '../assets/viewdetail.svg';
import useViewport from '../hooks/useViewPort';
type Props = {
  width: number;
  data: any;
  index: number;
  key: number;
};

const MainCard = ({ width, data, index, key }: Props) => {
  const { width: mediaWidth, isMobile } = useViewport();
  return (
    <StMainCard
      width={width}
      $mediawidth={mediaWidth > 1092 ? mediaWidth : 1092}
    >
      <StMainCardImgContainer
        img_url={
          data.images.length > 1
            ? data.images[1].img_url
            : data.images.length > 0
            ? data.images[0].img_url
            : data.img
        }
      >
        <StMainCardImgIndex
          className="index-card"
          $mediawidth={mediaWidth <= 1092 ? mediaWidth : 1092}
        >
          <p
            style={{
              fontSize: `max(14px, ${16 * (mediaWidth / 1920)}px)`,
              fontWeight: 'bold',
              color: 'var(--achromatic-colors-white, #FFF)',
              fontStyle: 'normal',
              lineHeight: 'normal',
              letterSpacing: '-0.24px',
            }}
          >
            TOP {index}
          </p>
        </StMainCardImgIndex>
        <StHoverViewDetail className="viewmore">
          <p>자세히보기</p>
          <img className="viewDetail" src={viewDetail} alt="viewdetail" />
        </StHoverViewDetail>
      </StMainCardImgContainer>
      <StCardInfoContainer>
        <StCardInfo>
          <StCardTitle $mediaWidth={mediaWidth <= 1092 ? mediaWidth : 1092}>
            {data.name}
          </StCardTitle>
          {/* <StCardSubtitle>
            애니메이션 한줄 소개 애니메이션 한줄 소개
          </StCardSubtitle> */}
        </StCardInfo>
        <StCardHashTagContainer>
          {data.genres
            ? data.genres.slice(0, isMobile ? 2 : 3).map((g: string) => {
                return (
                  <StCardHashTag key={key}>
                    <StCardHashTagTypo
                      $mediawidth={mediaWidth <= 1092 ? mediaWidth : 1092}
                    >
                      # {g!}
                    </StCardHashTagTypo>
                  </StCardHashTag>
                );
              })
            : data.genre.slice(0, 3).map((g: string) => {
                return (
                  <StCardHashTag key={key}>
                    <StCardHashTagTypo
                      $mediawidth={mediaWidth <= 1092 ? mediaWidth : 1092}
                    >
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
  position: relative;
  transition: 0.1s;
  .viewmore {
    display: none;
  }
  &:hover .index-card {
    display: none;
  }
  &:hover .viewmore {
    display: inline-flex;
  }
  &:hover {
    display: flex;
    filter: brightness(0.5);
  }
`;

const StMainCardImgIndex = styled.div<{ $mediawidth: number }>`
  display: inline-block;
  /* padding: ${(props) =>
    `${(8 * props.$mediawidth) / 1920}px ${
      (12 * props.$mediawidth) / 1920
    }px;`}; */
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.65);
  position: relative;
  top: 5%;
  left: 4.5%;
`;

const StCardInfoContainer = styled.div`
  width: 100%;
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
`;

const StCardTitle = styled.p<{ $mediaWidth: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #000;
  font-size: max(16px, ${(props) => 20 * (props.$mediaWidth / 1920)}px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;

const StCardHashTagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StCardHashTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: #efefef;
`;

const StCardHashTagTypo = styled.p<{ $mediawidth: number }>`
  color: #000;
  font-size: max(13px, ${(props) => 14 * (props.$mediawidth / 1920)}px);
  text-size-adjust: auto;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;

const StHoverViewDetail = styled.div`
  display: inline-flex;
  align-items: center;
  margin: auto;
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background-color: #8200ff;
  color: white;
  cursor: pointer;
  p {
    margin-left: 12px;
  }
`;

export default MainCard;
