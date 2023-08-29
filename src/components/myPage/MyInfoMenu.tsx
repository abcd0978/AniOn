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
const MyInfoMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState('EditProfile');
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
        <InfoMenu.EditButton
          onClick={() => setSelectedComponent('EditProfile')}
        >
          <InfoMenu.EditButtonIcon src={badge} />
          프로필 수정
        </InfoMenu.EditButton>
        <InfoMenu.DecoButton
          onClick={() => setSelectedComponent('DecoProfile')}
        >
          <InfoMenu.DecoButtonIcon src={deco} />
          프로필 꾸미기
        </InfoMenu.DecoButton>
        <InfoMenu.LikedButton
          onClick={() => setSelectedComponent('LikedAnime')}
        >
          <InfoMenu.LikedButtonIcon src={favorite} />
          찜한 목록
        </InfoMenu.LikedButton>
        <InfoMenu.ReviewButton
          onClick={() => setSelectedComponent('MyReviews')}
        >
          <InfoMenu.ReviewButtonIcon src={review} />
          리뷰 관리
        </InfoMenu.ReviewButton>
        <InfoMenu.WriteButton
          onClick={() => setSelectedComponent('WhatIWrote')}
        >
          <InfoMenu.WriteButtonIcon src={write} />
          작성한 글
        </InfoMenu.WriteButton>
        <div>로그아웃</div>
        <div>|</div>
        <div>회원탈퇴</div>
      </InfoMenu.Container>
      <div>{renderSelectedComponent()}</div>
    </InfoMenu.FullScreen>
  );
};
export default MyInfoMenu;
