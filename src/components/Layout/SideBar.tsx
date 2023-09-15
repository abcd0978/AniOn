import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as sidebarStore from '../../store/sidebarStore';
import * as headerStore from '../../store/headerStore';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [sidebarOpened, setSidebarOpened] = useAtom(sidebarStore.sideBarOpened);
  const [activeMenu, setActiveMenu] = useAtom(headerStore.activeMenu);

  const navigate = useNavigate();

  return (
    <StHamburger
      className={sidebarOpened ? 'sidebar opened' : 'sidebar closed'}
    >
      <StHamburgerMenu
        onClick={() => {
          navigate('/');
          setActiveMenu('/');
          setSidebarOpened(false);
          document.body.style.overflow = 'unset';
        }}
        $IsActive={activeMenu === '/' ? true : false}
      >
        <Typo>둘러보기</Typo>
      </StHamburgerMenu>
      <StHamburgerMenu
        onClick={() => {
          navigate('/recommend');
          setActiveMenu('/recommend');
          setSidebarOpened(false);
          document.body.style.overflow = 'unset';
        }}
        $IsActive={activeMenu.includes('/recommend') ? true : false}
      >
        <Typo>애니찾기</Typo>
      </StHamburgerMenu>
      <StHamburgerMenu
        onClick={() => {
          navigate('/board');
          setActiveMenu('/board');
          setSidebarOpened(false);
          document.body.style.overflow = 'unset';
        }}
        $IsActive={activeMenu.includes('/board') ? true : false}
      >
        <Typo>게시판</Typo>
      </StHamburgerMenu>
      <StHamburgerMenu
        onClick={() => {
          navigate('/shop/item');
          setActiveMenu('/shop');
          setSidebarOpened(false);
          document.body.style.overflow = 'unset';
        }}
        $IsActive={activeMenu.includes('/shop') ? true : false}
      >
        <Typo>상점</Typo>
      </StHamburgerMenu>
      <StHamburgerMenu
        onClick={() => {
          navigate('/worldcup');
          setActiveMenu('/worldcup');
          setSidebarOpened(false);
          document.body.style.overflow = 'unset';
        }}
        $IsActive={activeMenu.includes('/worldcup') ? true : false}
      >
        <Typo>이상형월드컵</Typo>
      </StHamburgerMenu>
    </StHamburger>
  );
};
const Typo = styled.p`
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
`;
const StHamburgerMenu = styled.div<{ $IsActive?: boolean }>`
  display: flex;
  padding: 8px 60px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  text-align: center;
  ${(props) => {
    return props.$IsActive
      ? 'color: var(--main-default, #8200ff);'
      : 'color: var(--achromatic-colors-darkgray, #4F4F4F);';
  }}
`;
const StHamburger = styled.div`
  position: fixed;
  top: 45px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 4;
`;
export default SideBar;
