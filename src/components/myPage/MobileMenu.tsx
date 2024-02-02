import { useAtom } from 'jotai';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import * as myPageStore from '../../store/myPageStore';
import React from 'react';
import { logout } from '../../api/auth';
// import DecoProfile from './DecoProfile';
// import EditProfile from './EditProfile';
// import LikedAnime from './LikedAnime';
// import WhatIWrote from './WhatIWrote';
// import MyReviews from './MyReviews';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';

const MyInfoMenuMobile = () => {
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const navigate = useNavigate();
  // const location = useLocation();
  const [selectedComponent, setSelectedComponent] = useAtom(
    myPageStore.selectedComponent,
  );
  const handleLogout = async () => {
    await logout();
    logoutStore();
    navigate(`/`);
  };

  // const renderSelectedComponent = () => {
  //   switch (selectedComponent) {
  //     case 'DecoProfile':
  //       return <DecoProfile />;
  //     case 'EditProfile':
  //       return <EditProfile />;
  //     case 'LikedAnime':
  //       return <LikedAnime />;
  //     case 'WhatIWrote':
  //       return <WhatIWrote />;
  //     case 'MyReviews':
  //       return <MyReviews />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <InfoMenu.Outer selectedComponent={selectedComponent}>
      {/* {selectedComponent ? (
        <>{renderSelectedComponent()}</>
      ) : ( */}
      <>
        <InfoMenu.Button onClick={() => setSelectedComponent('EditProfile')}>
          <img src="/images/badge (1).png" /> 프로필 수정
        </InfoMenu.Button>
        <InfoMenu.Button onClick={() => setSelectedComponent('DecoProfile')}>
          <img src="/images/palette.png" />
          프로필 꾸미기
        </InfoMenu.Button>
        <InfoMenu.Button onClick={() => setSelectedComponent('LikedAnime')}>
          <img src="/images/favorite.png" />
          찜한 목록
        </InfoMenu.Button>

        <InfoMenu.Button onClick={() => setSelectedComponent('MyReviews')}>
          <img src="/images/rate_review.png" />
          리뷰 관리
        </InfoMenu.Button>
        <InfoMenu.Button onClick={() => setSelectedComponent('WhatIWrote')}>
          <img src="/images/edit_note.png" />
          작성한 글
        </InfoMenu.Button>
        <InfoMenu.InfoButtonContainer>
          <InfoMenu.InfoButton onClick={handleLogout}>
            로그아웃
          </InfoMenu.InfoButton>
          <InfoMenu.InfoButton>|</InfoMenu.InfoButton>
          <InfoMenu.InfoButton>회원탈퇴</InfoMenu.InfoButton>
        </InfoMenu.InfoButtonContainer>
      </>
    </InfoMenu.Outer>
  );
};

export default MyInfoMenuMobile;
