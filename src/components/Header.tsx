import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import * as modalStore from "../store/modalStore";
import useViewport from "../hooks/useViewPort";
import * as userStore from "../store/userStore";
import dropdown from "../assets/dropdown.svg";
import * as authApi from "../api/auth";
type Props = {};

function Header({}: Props) {
  const [modal, setisModalOpened] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [user, setUser] = useAtom(userStore.user);

  return (
    <StHeader>
      <StHeaderContainer>
        <StHeaderLogoSection>로고</StHeaderLogoSection>
        <StHeaderMenuSection>
          <StHeaderMenu>둘러보기</StHeaderMenu>
          <StHeaderMenu>애니추천</StHeaderMenu>
          <StHeaderMenu>게시판</StHeaderMenu>
          <StHeaderMenu>상점</StHeaderMenu>
        </StHeaderMenuSection>
        <StHeaderUserInfoSection>
          {user ? (
            <StHeaderUserInfoContainer>
              <StHeaderUserProfile mediaWidth={width} />
              <StHeaderUserInfo>
                <StHeaderUserName>이름fffff</StHeaderUserName>
                <StHeaderUserAppellation>
                  칭ffffffffffff호
                </StHeaderUserAppellation>
              </StHeaderUserInfo>
              <StHeaderDropDownImgContainer>
                <img src={dropdown} alt="dropdownImg" />
              </StHeaderDropDownImgContainer>
            </StHeaderUserInfoContainer>
          ) : (
            <StHeaderLoginRegister>
              <p
                onClick={() => {
                  setModalContents("login");
                  setisModalOpened(true);
                }}
                style={{ cursor: "pointer" }}
              >
                로그인
              </p>
              <StblackBar></StblackBar>
              <p
                onClick={() => {
                  setModalContents("register");
                  setisModalOpened(true);
                }}
                style={{ cursor: "pointer" }}
              >
                회원가입
              </p>
              <StblackBar></StblackBar>
              <p
                onClick={async () => {
                  await authApi.logout();
                }}
                style={{ cursor: "pointer" }}
              >
                로그아웃
              </p>
            </StHeaderLoginRegister>
          )}
        </StHeaderUserInfoSection>
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
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StHeaderLogoSection = styled.div`
  min-width: 126px;
  max-width: 10%;
  height: 100%;
`;
const StHeaderMenuSection = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
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
  display: flex;
  align-items: center;
  width: 15%;
  height: 100%;
`;
const StHeaderUserInfoContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
const StHeaderUserProfile = styled.img<{ mediaWidth: number }>`
  ${(props) =>
    `width:${56 * (props.mediaWidth / 1920)}px;
    height:${56 * (props.mediaWidth / 1920)}px;`}
  min-width:30px;
  min-height: 30px;
  object-fit: cover;
  border-radius: 50%;
  background: #d9d9d9;
`;
const StHeaderUserInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2px;
`;
const StHeaderUserName = styled.p`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.72px;

  white-space: nowrap;
`;
const StHeaderUserAppellation = styled.p`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.72px;
  white-space: nowrap;
`;
const StHeaderDropDownImgContainer = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
const StHeaderLoginRegister = styled.div`
  display: flex;
  width: 126px;
  justify-content: space-between;
  align-items: center;
`;
const StblackBar = styled.div`
  width: 2px;
  height: 16px;
  flex-shrink: 0;
  background: #4f4f4f;
`;
export default Header;
