import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import * as modalStore from '../store/modalStore';
import { isDropDownOn } from '../store/dropDownStore';
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
import ProfileWithBorder from './ProfileWithBorder';
import LoginModalContents from './Modal/LoginModalContents';
import RegisterModalContents from './Modal/RegisterModalContents';
import PurchaseConfirmContents from './Modal/PurchaseConfirmContents';
import AfterPurchaseModalContents from './Modal/AfterPurchaseModalContents';
import PurchaseAwardModalContents from './Modal/PurchaseAwardModalContents';
import { useNavigate } from 'react-router-dom';
import { fetchEquippedItem } from '../api/items';
import { useQuery } from '@tanstack/react-query';

import * as itemApi from '../api/items';
type Props = {};

function Header({}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isDropdownOn, setIsDowpdownOn] = useAtom(isDropDownOn);
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [user, setUser] = useAtom(userStore.user);
  const [isModalOpened, setIsModalOpened] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);

  const equipedAwardQueryOptions = {
    queryKey: ['equippedAward'],
    queryFn: () => fetchEquippedItem({ user_id: user!.id, category: 1 }),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { data: award } = useQuery(equipedAwardQueryOptions);

  const modalContentsFunc = (name: string) => {
    switch (name) {
      case 'login': {
        return <LoginModalContents />;
      }
      case 'register': {
        return <RegisterModalContents />;
      }
      case 'border': {
        return <PurchaseConfirmContents />;
      }
      case 'award': {
        return <PurchaseAwardModalContents />;
      }
      case 'afterPurchase': {
        return <AfterPurchaseModalContents />;
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
      {/* <button onClick={() => itemApi.fetchEquippedItems(user?.id!)}>
        testtesttesttest
      </button> */}
      {isModalOpened && <Modal>{modalContentsFunc(modalContents)}</Modal>}
      <StHeader mediaWidth={width}>
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
                <ProfileWithBorder
                  width={null}
                  mediaWidth={width}
                  key={user?.id!}
                />
                <StHeaderUserInfo>
                  <StHeaderUserName>{user.nickname}</StHeaderUserName>
                  <StHeaderUserAppellation>
                    {award ? award.items.name : '칭호 없음'}
                  </StHeaderUserAppellation>
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

const StHeader = styled.header<{ mediaWidth: number }>`
  ${(props) => `height:${80 * (props.mediaWidth / 1920)}px;`}
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
  // height: 100%;
  margin-right: 40px;
`;
const StPreview = styled.div<{ background: string }>`
  z-index: 3;
  position: absolute;
  background-image: url(${(props) => props.background});
  background-size: cover;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
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
  width: calc(100% / 1.28787);
  height: calc(100% / 1.28787);
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  background: #d9d9d9;
  top: 12.5%;
  left: 12.5%;
  z-index: 2;
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
const StProfileContainer = styled.div<{ mediaWidth: number }>`
  ${(props) =>
    `width:${80 * (props.mediaWidth / 1920)}px;
    height:${80 * (props.mediaWidth / 1920)}px;`}
  position: relative;
`;
export default Header;
