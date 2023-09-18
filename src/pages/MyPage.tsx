import React, { useContext } from 'react';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { styled } from 'styled-components';
import MyInfoMenuMobile from '../components/myPage/MobileMenu';
import { ViewportContext } from '../components/ViewportContext';
import * as myPageStore from '../store/myPageStore';
import DecoProfile from '../components/myPage/DecoProfile';
import EditProfile from '../components/myPage/EditProfile';
import LikedAnime from '../components/myPage/LikedAnime';
import WhatIWrote from '../components/myPage/WhatIWrote';
import MyReviews from '../components/myPage/MyReviews';
import { InfoMenu } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { useAtom } from 'jotai';
import useViewport from '../hooks/useViewPort';
interface Props {
  viewport?: number;
}

const MyPage = ({ viewport }: Props) => {
  const { isMobile } = useViewport();

  const [selectedComponent, setSelectedComponent] = useAtom(
    myPageStore.selectedComponent,
  );

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

  const { width, height } = useContext(ViewportContext);
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
