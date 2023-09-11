import React, { useState } from 'react';
import badge from '../../assets/badge (1).png';
import hoverbadge from '../../assets/badge (2).png';
import hoverdeco from '../../assets/palette (2).png';
import hoverreview from '../../assets/rate_review (2).png';
import hoverwrite from '../../assets/edit_note (2).png';
import hoverfavorite from '../../assets/favorite (2).png';
import deco from '../../assets/palette.png';
import review from '../../assets/rate_review.png';
import write from '../../assets/edit_note.png';
import favorite from '../../assets/favorite.png';
import DecoProfile from './DecoProfile';
import EditProfile from './EditProfile';
import LikedAnime from './LikedAnime';
import WhatIWrote from './WhatIWrote';
import MyReviews from './MyReviews';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';
import { logout } from '../../api/auth';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as userStore from '../../store/userStore';
import { useLocation } from 'react-router-dom';
const MyInfoMenu = () => {
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;
  const [selectedComponent, setSelectedComponent] = useState(
    location.state?.selected ? location.state?.selected : 'EditProfile',
  );
  const handleLogout = async () => {
    await logout();
    logoutStore();
    navigate(`/`);
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
    <>
      {!isMobile || (isMobile && !selectedComponent) ? (
        <InfoMenu.Outer>
          {/* 프로필 수정 */}
          <InfoMenu.Button
            onClick={() => setSelectedComponent('EditProfile')}
            style={{
              color: selectedComponent === 'EditProfile' ? '#8200FF' : '#999',
            }}
          >
            {selectedComponent === 'EditProfile' ? (
              <InfoMenu.ButtonIcon src={hoverbadge} />
            ) : (
              <InfoMenu.ButtonIcon src={badge} />
            )}
            프로필 수정
          </InfoMenu.Button>
          {/* 프로필 꾸미기 */}
          <InfoMenu.Button
            onClick={() => setSelectedComponent('DecoProfile')}
            style={{
              color: selectedComponent === 'DecoProfile' ? '#8200FF' : '#999',
            }}
          >
            {selectedComponent === 'DecoProfile' ? (
              <InfoMenu.ButtonIcon src={hoverdeco} />
            ) : (
              <InfoMenu.ButtonIcon src={deco} />
            )}
            프로필 꾸미기
          </InfoMenu.Button>
          {/* 찜한 목록 */}
          <InfoMenu.Button
            onClick={() => setSelectedComponent('LikedAnime')}
            style={{
              color: selectedComponent === 'LikedAnime' ? '#8200FF' : '#999',
            }}
          >
            {selectedComponent === 'LikedAnime' ? (
              <InfoMenu.ButtonIcon src={hoverfavorite} />
            ) : (
              <InfoMenu.ButtonIcon src={favorite} />
            )}
            찜한 목록
          </InfoMenu.Button>
          {/* 리뷰관리 */}
          <InfoMenu.Button
            onClick={() => setSelectedComponent('MyReviews')}
            style={{
              color: selectedComponent === 'MyReviews' ? '#8200FF' : '#999',
            }}
          >
            {selectedComponent === 'MyReviews' ? (
              <InfoMenu.ButtonIcon src={hoverreview} />
            ) : (
              <InfoMenu.ButtonIcon src={review} />
            )}
            리뷰 관리
          </InfoMenu.Button>
          {/* 작성한 글 */}
          <InfoMenu.Button
            onClick={() => setSelectedComponent('WhatIWrote')}
            style={{
              color: selectedComponent === 'WhatIWrote' ? '#8200FF' : '#999',
            }}
          >
            {selectedComponent === 'WhatIWrote' ? (
              <InfoMenu.ButtonIcon src={hoverwrite} />
            ) : (
              <InfoMenu.ButtonIcon src={write} />
            )}
            작성한 글
          </InfoMenu.Button>
          {/* 로그아웃, 회원탈퇴 */}
          <InfoMenu.InfoButtonContainer>
            <InfoMenu.InfoButton onClick={handleLogout}>
              로그아웃
            </InfoMenu.InfoButton>
            <InfoMenu.InfoButton>|</InfoMenu.InfoButton>
            <InfoMenu.InfoButton>회원탈퇴</InfoMenu.InfoButton>
          </InfoMenu.InfoButtonContainer>
        </InfoMenu.Outer>
      ) : null}

      {selectedComponent && (
        <InfoMenu.FullScreen>{renderSelectedComponent()}</InfoMenu.FullScreen>
      )}
    </>
  );
};
export default MyInfoMenu;
