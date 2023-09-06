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
import { InfoMenu } from './MyPage.styles';
import { logout } from '../../api/auth';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as userStore from '../../store/userStore';
import { useLocation } from 'react-router-dom';
const MyInfoMenu = () => {
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const navigate = useNavigate();
  const location = useLocation();
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
      <InfoMenu.FullScreen>
        <InfoMenu.Container>
          <Outer>
            <InfoMenu.EditMenu>
              <EditButton
                onClick={() => setSelectedComponent('EditProfile')}
                style={{
                  color:
                    selectedComponent === 'EditProfile' ? '#8200FF' : '#999',
                }}
              >
                {selectedComponent === 'EditProfile' ? (
                  <EditButtonIcon src={hoverbadge} />
                ) : (
                  <EditButtonIcon src={badge} />
                )}
                프로필 수정
              </EditButton>
            </InfoMenu.EditMenu>
            <div className="DecoMenu">
              <InfoMenu.DecoButton
                onClick={() => setSelectedComponent('DecoProfile')}
                style={{
                  color:
                    selectedComponent === 'DecoProfile' ? '#8200FF' : '#999',
                }}
              >
                {selectedComponent === 'DecoProfile' ? (
                  <InfoMenu.DecoButtonIcon src={hoverdeco} />
                ) : (
                  <InfoMenu.DecoButtonIcon src={deco} />
                )}
                프로필 꾸미기
              </InfoMenu.DecoButton>
            </div>
            <div className="LikedMenu">
              <InfoMenu.LikedButton
                onClick={() => setSelectedComponent('LikedAnime')}
                style={{
                  color:
                    selectedComponent === 'LikedAnime' ? '#8200FF' : '#999',
                }}
              >
                {selectedComponent === 'LikedAnime' ? (
                  <InfoMenu.LikedButtonIcon src={hoverfavorite} />
                ) : (
                  <InfoMenu.LikedButtonIcon src={favorite} />
                )}
                찜한 목록
              </InfoMenu.LikedButton>
            </div>
            <div className="ReviewMenu">
              <InfoMenu.ReviewButton
                onClick={() => setSelectedComponent('MyReviews')}
                style={{
                  color: selectedComponent === 'MyReviews' ? '#8200FF' : '#999',
                }}
              >
                {selectedComponent === 'MyReviews' ? (
                  <InfoMenu.ReviewButtonIcon src={hoverreview} />
                ) : (
                  <InfoMenu.ReviewButtonIcon src={review} />
                )}
                리뷰 관리
              </InfoMenu.ReviewButton>
            </div>
            <div className="WriteMenu">
              <InfoMenu.WriteButton
                onClick={() => setSelectedComponent('WhatIWrote')}
                style={{
                  color:
                    selectedComponent === 'WhatIWrote' ? '#8200FF' : '#999',
                }}
              >
                {selectedComponent === 'WhatIWrote' ? (
                  <InfoMenu.WriteButtonIcon src={hoverwrite} />
                ) : (
                  <InfoMenu.WriteButtonIcon src={write} />
                )}
                작성한 글
              </InfoMenu.WriteButton>
            </div>
            <InfoMenu.InfoButtonContainer>
              <InfoMenu.InfoButton onClick={handleLogout}>
                로그아웃
              </InfoMenu.InfoButton>
              <InfoMenu.InfoButton>|</InfoMenu.InfoButton>
              <InfoMenu.InfoButton>회원탈퇴</InfoMenu.InfoButton>
            </InfoMenu.InfoButtonContainer>
          </Outer>
        </InfoMenu.Container>

        <ProfileEdit>{renderSelectedComponent()}</ProfileEdit>
      </InfoMenu.FullScreen>
      <TitleContainer>
        <EditTitle>
          {selectedComponent === 'EditProfile' && '프로필 수정'}
        </EditTitle>
        {/* <DecoTitle>
          {selectedComponent === 'DecoProfile' && '프로필 꾸미기'}
        </DecoTitle> */}

        <ReviewTitle>
          {selectedComponent === 'MyReviews' && '리뷰 관리'}
        </ReviewTitle>
        <WriteTitle>
          {selectedComponent === 'WhatIWrote' && '작성한 글'}
        </WriteTitle>
      </TitleContainer>
    </>
  );
};
export default MyInfoMenu;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  margin-left: 30px;
  margin-top: 18px;
`;
const ProfileEdit = styled.div`
  margin-left: -30px;
`;

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
  margin-bottom: 10px;
  margin-top: 25px;
  cursor: pointer;
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
export const TitleContainer = styled.div`
  position: absolute;
  margin-left: 350px;
  width: 200px;
  height: 32px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
`;

export const EditTitle = styled.div`
  margin-top: -950px;
`;

export const ReviewTitle = styled.div`
  margin-top: 220px;
`;
export const WriteTitle = styled.div`
  margin-top: -180px;
`;
