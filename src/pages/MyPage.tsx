import React from 'react';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import * as myPageStore from '../store/myPageStore';
import DecoProfile from '../components/myPage/DecoProfile';
import EditProfile from '../components/myPage/EditProfile';
import LikedAnime from '../components/myPage/LikedAnime';
import WhatIWrote from '../components/myPage/WhatIWrote';
import MyReviews from '../components/myPage/MyReviews';
import { InfoMenu } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { useAtomValue } from 'jotai';
import useViewport from '../hooks/useViewPort';

const MyPage = () => {
  const { isMobile } = useViewport();

  const selectedComponent = useAtomValue(myPageStore.selectedComponent);

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
        return isMobile ? null : <EditProfile />;
    }
  };

  return (
    <>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyPageConainer>
        <Profile.MyContainer>
          <MyProfile />
          {/* {width <= 768 ? <MyInfoMenuMobile /> : <MyInfoMenu />} */}
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
