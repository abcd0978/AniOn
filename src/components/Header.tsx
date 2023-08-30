import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import * as modalStore from '../store/modalStore';
import useViewport from '../hooks/useViewPort';
import * as userStore from '../store/userStore';
import dropdown from '../assets/dropdown.svg';
import dropdownUp from '../assets/dropdownUp.svg';
import * as authApi from '../api/auth';
import logout from '../assets/logout.svg';
import account from '../assets/account.svg';
import logo from '../assets/logo.svg';
import type { DropdownContentsType } from './DropDown/DropDown';
import DropDown from './DropDown/DropDown';
import Modal from './Modal/Modal';
import LoginModalContents from './Modal/LoginModalContents';
import RegisterModalContents from './Modal/RegisterModalContents';
import { useNavigate } from 'react-router-dom';
type Props = {};

function Header({}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isDropdownOn, setIsDowpdownOn] = useState(false);
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [user, setUser] = useAtom(userStore.user);
  const [isModalOpened, setIsModalOpened] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const modalContentsFunc = (name: string) => {
    switch (name) {
      case 'login': {
        return <LoginModalContents />;
      }
      case 'register': {
        return <RegisterModalContents />;
      }
    }
  };
  const dropdownContents: DropdownContentsType[] = [
    {
      content: '프로필설정',
      img_src: account,
      func: () => {
        if (user) {
          navigate(`/myPage/${user.id}`);
        }
      },
    },
    {
      content: '로그아웃',
      img_src: logout,
      func: async () => {
        await authApi.logout();
        logoutStore();
      },
    },
  ];
  return (
    <>
      {isModalOpened && <Modal>{modalContentsFunc(modalContents)}</Modal>}
      <StHeader>
        <StHeaderContainer>
          <StHeaderLogoSection
            onClick={() => {
              navigate('/');
              setActiveMenu('둘러보기');
            }}
          >
            <img src={logo} alt="로고" />
          </StHeaderLogoSection>
          <StHeaderMenuSection>
            <StHeaderMenu
              onClick={() => {
                navigate('/');
                setActiveMenu('둘러보기');
              }}
              isActive={activeMenu === '둘러보기'}
              color="#8200FF"
            >
              둘러보기
            </StHeaderMenu>
            <StHeaderMenu
              onClick={() => {
                navigate('/recommend');
                setActiveMenu('애니추천');
              }}
              isActive={activeMenu === '애니추천'}
              color="#8200FF"
            >
              애니추천
            </StHeaderMenu>
            <StHeaderMenu
              onClick={() => {
                navigate('/board');
                setActiveMenu('게시판');
              }}
              isActive={activeMenu === '게시판'}
              color="#8200FF"
            >
              게시판
            </StHeaderMenu>
            <StHeaderMenu
              onClick={() => {
                navigate('/shop/item');
                setActiveMenu('상점');
              }}
              isActive={activeMenu === '상점'}
              color="#8200FF"
            >
              상점
            </StHeaderMenu>
          </StHeaderMenuSection>

          <StHeaderUserInfoSection>
            {user ? (
              <StHeaderUserInfoContainer>
                <StHeaderUserProfile
                  src={user.profile_img_url!}
                  alt="프사"
                  mediaWidth={width}
                />
                <StHeaderUserInfo>
                  <StHeaderUserName>{user.nickname}</StHeaderUserName>
                  <StHeaderUserAppellation>칭호</StHeaderUserAppellation>
                </StHeaderUserInfo>
                <StHeaderDropDownImgContainer
                  onClick={() => setIsDowpdownOn(!isDropdownOn)}
                >
                  {isDropdownOn ? (
                    <img src={dropdownUp} alt="dropdownImg" />
                  ) : (
                    <img src={dropdown} alt="dropdownImg" />
                  )}
                </StHeaderDropDownImgContainer>
                {isDropdownOn && <DropDown children={dropdownContents} />}
              </StHeaderUserInfoContainer>
            ) : (
              <StHeaderLoginRegister>
                <p
                  onClick={() => {
                    setModalContents('login');
                    setIsModalOpened(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  로그인
                </p>
                <StblackBar></StblackBar>
                <p
                  onClick={() => {
                    setModalContents('register');
                    setIsModalOpened(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  회원가입
                </p>
              </StHeaderLoginRegister>
            )}
          </StHeaderUserInfoSection>
        </StHeaderContainer>
      </StHeader>
    </>
  );
}

const headerMenuColor = '#999999';
const headerMenuColorActivated = '#4f4f4f';

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
  cursor: pointer;
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
const StHeaderMenu = styled.div<{ isActive: boolean; color?: string }>`
  width: 72px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? headerMenuColorActivated : headerMenuColor};
  ${({ isActive, color }) => isActive && color && `color: ${color};`}
  &:active {
    color: ${({ color }) => color || headerMenuColorActivated};
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
  cursor: pointer;
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
