import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import * as modalStore from '../store/modalStore';
import { isDropDownOn } from '../store/dropDownStore';
import * as sidebarStore from '../store/sidebarStore';
import useViewport from '../hooks/useViewPort';
import * as userStore from '../store/userStore';
import * as headerStore from '../store/headerStore';
import dropdown from '../assets/dropdown.svg';
import dropdownUp from '../assets/dropdownUp.svg';
import serachMobile from '../assets/searchMobile.svg';
import menu from '../assets/menu.svg';
import closeMenu from '../assets/closeMenuMobile.svg';
import searchOptionMobile from '../assets/searchOptionMobile.svg';
import * as authApi from '../api/auth';
import logout from '../assets/logout.svg';
import account from '../assets/account.svg';
import logo from '../assets/logo.svg';
import logoM from '../assets/logoMobile.svg';
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

type Props = {};

function Header({}: Props) {
  const navigate = useNavigate();
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [user, setUser] = useAtom(userStore.user);
  const [isModalOpened, setIsModalOpened] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const [isDropdownOnD, setIsDropdownOnD] = useState(false);
  const [isDropdownOnB, setIsDropdownOnB] = useState(false);
  const [menuMobileClicked, setMenuMobileClicked] = useAtom(
    sidebarStore.sideBarOpened,
  );
  const [menuSearchClicked, setMenuSearchCliked] = useAtom(
    headerStore.searchMobileClicked,
  );
  const [activeMenu, setActiveMenu] = useAtom(headerStore.activeMenu);
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
        navigate(`/`);
      },
    },
  ];
  return (
    <>
      {isModalOpened && <Modal>{modalContentsFunc(modalContents)}</Modal>}
      <StHeader
        className={menuSearchClicked ? 'search' : ''}
        $mediawidth={width}
      >
        <StHeaderContainer>
          <StHeaderMenuMobile
            onClick={() => {
              setMenuMobileClicked((prev) => {
                document.body.style.overflow = !prev ? 'hidden' : 'unset';
                return !prev;
              });
            }}
          >
            <img
              style={{ display: `${menuMobileClicked ? 'none' : 'block'}` }}
              src={menu}
              alt="menu"
            />
            <img
              style={{ display: `${menuMobileClicked ? 'block' : 'none'}` }}
              src={closeMenu}
              alt="close"
            />
          </StHeaderMenuMobile>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <StHeaderLogoSection
              onClick={() => {
                navigate('/');
                setActiveMenu('/');
              }}
            >
              <img src={isMobile ? logoM : logo} alt="로고" />
            </StHeaderLogoSection>
            <StHeaderMenuSection>
              <StHeaderMenu
                onClick={() => {
                  navigate('/');
                  setActiveMenu('/');
                }}
                $isactive={activeMenu === '/' ? true : false}
                color="#8200FF"
              >
                둘러보기
              </StHeaderMenu>
              <StHeaderMenu
                onClick={() => {
                  navigate('/recommend');
                  setActiveMenu('/recommend');
                }}
                $isactive={activeMenu === '/recommend' ? true : false}
                color="#8200FF"
              >
                애니추천
              </StHeaderMenu>
              <StHeaderMenu
                onClick={() => {
                  navigate('/board');
                  setActiveMenu('/board');
                }}
                $isactive={activeMenu === '/board' ? true : false}
                color="#8200FF"
              >
                게시판
              </StHeaderMenu>
              <StHeaderMenu
                onClick={() => {
                  navigate('/shop/item');
                  setActiveMenu('/shop');
                }}
                $isactive={activeMenu.includes('/shop') ? true : false}
                color="#8200FF"
              >
                상점
              </StHeaderMenu>
              <StHeaderMenu
                onClick={() => {
                  navigate('/worldcup');
                  setActiveMenu('/worldcup');
                }}
                $isactive={activeMenu.includes('/worldcup') ? true : false}
                color="#8200FF"
              >
                이상형 월드컵
              </StHeaderMenu>
            </StHeaderMenuSection>
          </div>

          <StHeaderUserInfoSection>
            <StSearchMobile
              className={menuSearchClicked ? 'search' : ''}
              onClick={() => setMenuSearchCliked(!menuSearchClicked)}
            >
              <img src={serachMobile} alt="검색" />
            </StSearchMobile>
            {user ? (
              <StHeaderUserInfoContainer>
                <ProfileWithBorder
                  minWidth={36}
                  width={null}
                  $mediawidth={width}
                  key={user?.id!}
                />
                <StHeaderUserInfo>
                  <StHeaderUserName>{user.nickname}</StHeaderUserName>
                  <StHeaderUserAppellation>
                    {award ? (
                      award.items.img_url ? (
                        <img
                          src={award.items.img_url}
                          alt={award.items.name}
                          style={{ width: '140px', height: '28px' }}
                        />
                      ) : (
                        award.items.name
                      )
                    ) : (
                      '칭호 없음'
                    )}
                  </StHeaderUserAppellation>
                </StHeaderUserInfo>
                <StHeaderDropDownImgContainer
                  style={{ cursor: isDropdownOnD ? 'default' : 'pointer' }}
                  onClick={() => {
                    setIsDropdownOnD(true);
                  }}
                >
                  {isDropdownOnD ? (
                    <img src={dropdownUp} alt="dropdownImg" />
                  ) : (
                    <img src={dropdown} alt="dropdownImg" />
                  )}
                </StHeaderDropDownImgContainer>
                {isDropdownOnD && (
                  <DropDown
                    top={80}
                    setActive={setIsDropdownOnD}
                    children={dropdownContents}
                  />
                )}
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
        <StHeaderContainerSearch className={menuSearchClicked ? 'search' : ''}>
          {isDropdownOnB && (
            <DropDown
              top={90}
              setActive={setIsDropdownOnB}
              children={[
                {
                  content: '애니찾기',
                  func: () => {},
                },
                {
                  content: '게시글',
                  func: () => {},
                },
              ]}
            />
          )}

          <StHeaderMobileOption>
            <StHeaderMobileSearchTypo>선택</StHeaderMobileSearchTypo>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <img
                onClick={() => setIsDropdownOnB(!isDropdownOnB)}
                src={searchOptionMobile}
                alt="som"
              />
            </div>
          </StHeaderMobileOption>
          <StHeaderMobileSearchInputContainer>
            <StHeaderMobileSearchInput placeholder="검색어를 입력해주세요"></StHeaderMobileSearchInput>
            <StSearchMobile
              className={menuSearchClicked ? '' : 'search'}
              onClick={() => {}}
            >
              <img src={serachMobile} alt="검색" />
            </StSearchMobile>
          </StHeaderMobileSearchInputContainer>
          <StHeaderMobileSearchCancel
            onClick={() => setMenuSearchCliked(false)}
          >
            취소
          </StHeaderMobileSearchCancel>
        </StHeaderContainerSearch>
      </StHeader>
    </>
  );
}

const headerMenuColor = '#999999';
const headerMenuColorActivated = '#4f4f4f';

const StSearchMobile = styled.div`
  transition: 0.1s;
  display: none;
  @media (max-width: 768px) {
    display: inline-block;
    &.search {
      & > img {
        transition: 0.2s;
        opacity: 0;
      }
    }
  }
`;
const StHeaderMenuMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    padding: 8px 16px 8px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    cursor: pointer;
    z-index: 5;
  }
`;

const StHeader = styled.header<{ $mediawidth: number }>`
  ${(props) => `height:${80 * (props.$mediawidth / 1920)}px;`}
  min-height:45px;
  display: grid;
  align-items: center;
  background: var(--achromatic-colors-white, #fff);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(25px);
  z-index: 4;
  transition: 0.2s;
  &.search {
    padding-bottom: 12px;
    transition: 0.2s;
    min-height: 90px;
  }
`;

const StHeaderContainer = styled.div`
  margin: auto;
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: inherit;
    box-sizing: border-box;
    border-left: 18px solid #fff;
    border-right: 18px solid #fff;
  }
`;

const StHeaderContainerSearch = styled.div`
  margin: auto;
  width: 75%;
  height: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
  & > * {
    transition: 0.1s;
    opacity: 0;
    display: none;
  }
  @media (max-width: 768px) {
    width: inherit;
    flex-direction: row;
    gap: 8px;
    box-sizing: border-box;
    border-left: 18px solid #fff;
    border-right: 18px solid #fff;
  }
  &.search {
    border-left: 18px solid rgba(0, 0, 0, 0);
    border-right: 18px solid rgba(0, 0, 0, 0);
    height: 45px;
    & > * {
      transition: 0.1s;
      display: flex;
      opacity: 1;
    }
  }
`;
const StHeaderMobileSearchTypo = styled.p`
  color: var(--achromatic-colors-midgray-1, #999);
  width: 36px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.21px;
`;
const StHeaderMobileOption = styled.div`
  width: 64px;
  height: 24px;
  padding: 8px 4px 8px 8px;
  align-items: center;
  position: relative;
  gap: 4px;
  border-radius: 10px;
  background: var(--main-light-3, #f9f3ff);
`;
const StHeaderMobileSearchInputContainer = styled.div`
  height: 24px;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  border: none;
  flex: 1 0 0;
  border-radius: 10px;
  background: var(--main-light-3, #f9f3ff);
  &:focus {
    border: none;
  }
`;
const StHeaderMobileSearchInput = styled.input`
  border: none;
  background: transparent;
  height: 100%;
  &:focus {
    border: none;
    outline: none;
  }
`;
const StHeaderMobileSearchCancel = styled.div``;
const StHeaderLogoSection = styled.div`
  cursor: pointer;
  @media (max-width: 768px) {
    position: absolute;
    left: calc(50% - 50px);
  }
`;

const StHeaderMenuSection = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StHeaderMenu = styled.div<{ $isactive: boolean; color?: string }>`
  width: 99px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) =>
    props.$isactive ? headerMenuColorActivated : headerMenuColor};
  ${(props) => props.$isactive && props.color && `color: ${props.color};`}
  &:active {
    color: ${(props) => props.color || headerMenuColorActivated};
  }
`;

const StHeaderUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
`;
const StHeaderUserInfoContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StHeaderUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StHeaderUserName = styled.p`
  color: var(--black, #000);
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.72px;
  text-align: center;
  white-space: nowrap;
`;
const StHeaderUserAppellation = styled.p`
  color: var(--black, #000);
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
  @media (max-width: 768px) {
    display: none;
  }
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
