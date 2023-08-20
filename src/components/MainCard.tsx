import React from "react";
import styled from "styled-components";
type Props = {};

const MainCard = (props: Props) => {
  return (
    <StMainCard>
      <StMainCardImgContainer>
        <StMainCardImgIndex>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>TOP 1</p>
        </StMainCardImgIndex>
      </StMainCardImgContainer>
      <StCardInfoContainer>
        <StCardInfo>
          <StCardTitle>애니메이션 이름</StCardTitle>
          <StCardSubtitle>
            애니메이션 한줄 소개 애니메이션 한줄 소개
          </StCardSubtitle>
        </StCardInfo>
        <StCardHashTagContainer>
          <StCardHashTag>
            <StCardHashTagTypo>#카테고리</StCardHashTagTypo>
          </StCardHashTag>
          <StCardHashTag>
            <StCardHashTagTypo>#카테고리</StCardHashTagTypo>
          </StCardHashTag>
          <StCardHashTag>
            <StCardHashTagTypo>#카테고리</StCardHashTagTypo>
          </StCardHashTag>
        </StCardHashTagContainer>
      </StCardInfoContainer>
    </StMainCard>
  );
};
const StMainCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 272px;
  height: 283px;
  flex-shrink: 0;
`;
const StMainCardImgContainer = styled.div`
  width: 100%;
  height: 180px;
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
  background: #efefef;
`;
const StCardInfoContainer = styled.div`
  display: flex;
  width: 272px;
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
const StCardTitle = styled.p`
  color: #000;
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;
const StCardSubtitle = styled.p`
  color: #4f4f4f;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;
const StCardHashTagContainer = styled.div`
  display: flex;
  align-items: flex-start;
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
const StCardHashTagTypo = styled.p`
  color: #000;
  font-family: Pretendard Variable;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;
export default MainCard;
