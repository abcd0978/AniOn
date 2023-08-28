import React, { useEffect, useState } from 'react';

import DecoProfile from './DecoProfile';
import EditProfile from './EditProfile';
import LikedAnime from './LikedAnime';
import WhatIWrote from './WhatIWrote';
import MyReviews from './MyReviews';
import { styled } from 'styled-components';
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
    <InfoMenu.Container>
      <InfoMenu.Button onClick={() => setSelectedComponent('EditProfile')}>
        프로필 수정
      </InfoMenu.Button>
      <InfoMenu.Button onClick={() => setSelectedComponent('DecoProfile')}>
        프로필 꾸미기
      </InfoMenu.Button>

      <InfoMenu.Button onClick={() => setSelectedComponent('LikedAnime')}>
        찜한 목록
      </InfoMenu.Button>
      <InfoMenu.Button onClick={() => setSelectedComponent('MyReviews')}>
        리뷰 관리
      </InfoMenu.Button>
      <InfoMenu.Button onClick={() => setSelectedComponent('WhatIWrote')}>
        작성한 글
      </InfoMenu.Button>
      {renderSelectedComponent()}
    </InfoMenu.Container>
  );
};
export default MyInfoMenu;
