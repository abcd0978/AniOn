import React, { useEffect, useState } from 'react';
import badge from '../../assets/badge (1).png';
import deco from '../../assets/palette.png';
import review from '../../assets/rate_review.png';
import write from '../../assets/edit_note.png';
import favorite from '../../assets/favorite.png';
import DecoProfile from './DecoProfile';
import EditProfile from './EditProfile';
import LikedAnime from './LikedAnime';
import WhatIWrote from './WhatIWrote';
import MyReviews from './MyReviews';
import { InfoMenu } from './MyPage.styles';
import { logout } from '../../api/auth';
import { styled } from 'styled-components';

const MyInfoMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState('EditProfile');
  const handleLogout = async () => {
    await logout();
  };
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'DecoProfile':
        return <DecoProfile />;
      case 'EditProfile':
        return <EditProfile />;
      case 'LikedAnime':
        return <LikedAnime />;
      case 'WhatIWrote':
        return <WhatIWrote />;
      case 'MyReviews':
        return <MyReviews />;
      default:
        return null;
    }
  };

  return (
    <InfoMenu.FullScreen>
      <InfoMenu.Container>
        <InfoMenu.EditMenu>
          <EditButton onClick={() => setSelectedComponent('EditProfile')}>
            <EditButtonIcon src={badge} />
            프로필 수정
          </EditButton>
        </InfoMenu.EditMenu>
        <div className="DecoMenu">
          <InfoMenu.DecoButton
            onClick={() => setSelectedComponent('DecoProfile')}
          >
            <InfoMenu.DecoButtonIcon src={deco} />
            프로필 꾸미기
          </InfoMenu.DecoButton>
        </div>
        <div className="LikedMenu">
          <InfoMenu.LikedButton
            onClick={() => setSelectedComponent('LikedAnime')}
          >
            <InfoMenu.LikedButtonIcon src={favorite} />
            찜한 목록
          </InfoMenu.LikedButton>
        </div>
        <div className="ReviewMenu">
          <InfoMenu.ReviewButton
            onClick={() => setSelectedComponent('MyReviews')}
          >
            <InfoMenu.ReviewButtonIcon src={review} />
            리뷰 관리
          </InfoMenu.ReviewButton>
        </div>
        <div className="WriteMenu">
          <InfoMenu.WriteButton
            onClick={() => setSelectedComponent('WhatIWrote')}
          >
            <InfoMenu.WriteButtonIcon src={write} />
            작성한 글
          </InfoMenu.WriteButton>
        </div>
        <InfoMenu.InfoButtonContainer>
          <InfoMenu.InfoButton onClick={handleLogout}>
            로그아웃
          </InfoMenu.InfoButton>
          <div>|</div>
          <InfoMenu.InfoButton>회원탈퇴</InfoMenu.InfoButton>
        </InfoMenu.InfoButtonContainer>
      </InfoMenu.Container>
      <div>{renderSelectedComponent()}</div>
    </InfoMenu.FullScreen>
  );
};
export default MyInfoMenu;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 170px;
  background-color: transparent;
  border-color: transparent;
  color: #838383;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;
export const EditButtonIcon = styled.img`
  height: 36px;
  width: 36px;
`;
export const DecoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 170px;
  background-color: transparent;
  border-color: transparent;
  color: #838383;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;
