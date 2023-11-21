import React from 'react';

import { useAtomValue } from 'jotai';

import * as myPageStore from '../store/myPageStore';

import Note from '../components/myPage/Note/Note';
import MyReviews from '../components/myPage/MyReviews';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import WhatIWrote from '../components/myPage/WhatIWrote';
import LikedAnime from '../components/myPage/LikedAnime';
import DecoProfile from '../components/myPage/DecoProfile';
import EditProfile from '../components/myPage/EditProfile';

import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { InfoMenu } from '../components/myPage/Styled.MyPage/MyPage.styles';

import useViewport from '../hooks/useViewPort';

const MyPage = () => {
  const { isMobile } = useViewport();

  const selectedComponent = useAtomValue(myPageStore.selectedComponent);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'EditProfile':
        return <EditProfile />;
      case 'DecoProfile':
        return <DecoProfile />;
      case 'LikedAnime':
        return <LikedAnime />;
      case 'WhatIWrote':
        return <WhatIWrote />;
      case 'MyReviews':
        return <MyReviews />;
      case 'Note':
        return <Note />;
      default:
        return isMobile ? null : <EditProfile />;
    }
  };

  return (
    <>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyPageConainer>
        <Profile.MyContainer>
          <MyProfile />
          {!isMobile ? (
            <MyInfoMenu />
          ) : !selectedComponent ? (
            <MyInfoMenu />
          ) : (
            <InfoMenu.FullScreen>
              {renderSelectedComponent()}
            </InfoMenu.FullScreen>
          )}
        </Profile.MyContainer>
        {!isMobile && (
          <InfoMenu.FullScreen>{renderSelectedComponent()}</InfoMenu.FullScreen>
        )}
      </Profile.MyPageConainer>
    </>
  );
};

export default MyPage;
