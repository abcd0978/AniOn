import React from "react";
import styled from "styled-components";
type Props = {};

function Header({}: Props) {
  return (
    <StHeader>
      <StHeaderContainer>
        <StHeaderLogoSection>로고</StHeaderLogoSection>
        <StHeaderMenuSection>
          <StHeaderMenu>둘러보기</StHeaderMenu>
          <StHeaderMenu>게임추천</StHeaderMenu>
          <StHeaderMenu>파티</StHeaderMenu>
          <StHeaderMenu>게시판</StHeaderMenu>
        </StHeaderMenuSection>
        <StHeaderUserInfoSection>로그인/회원가입</StHeaderUserInfoSection>
      </StHeaderContainer>
    </StHeader>
  );
}

const headerMenuColor = "#999999";
const headerMenuColorActivated = "#4f4f4f";

const StHeader = styled.div`
  max-width: 1920px;
  height: 80px;
  display: grid;
  align-items: center;
  border-bottom: solid 1px #d9d9d9;
`;
const StHeaderContainer = styled.div`
  margin: auto;
  width: 75%;
  border: solid 1px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StHeaderLogoSection = styled.div`
  min-width: 126px;
  max-width: 10%;
  height: 100%;
  border: solid 1px;
`;
const StHeaderMenuSection = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  border: solid 1px;
`;
const StHeaderMenu = styled.div`
  width: 72px;
  text-align: center;
  cursor: pointer;
  color: ${headerMenuColor};
  &:hover {
    color: ${headerMenuColorActivated};
  }
`;
const StHeaderUserInfoSection = styled.div`
  width: 15%;
  height: 100%;
  border: solid 1px;
`;

export default Header;
