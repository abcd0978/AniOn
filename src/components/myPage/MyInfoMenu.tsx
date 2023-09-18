import React, { useState } from 'react';
import DecoProfile from './DecoProfile';
import EditProfile from './EditProfile';
import LikedAnime from './LikedAnime';
import WhatIWrote from './WhatIWrote';
import MyReviews from './MyReviews';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';
import { toast } from 'react-toastify';
import supabase from '../../supabaseClient';
import { logout } from '../../api/auth';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as userStore from '../../store/userStore';
import * as myPageStore from '../../store/myPageStore';
import { useLocation } from 'react-router-dom';
const MyInfoMenu = () => {
  const [__, logoutStore] = useAtom(userStore.logoutUser);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedComponent, setSelectedComponent] = useAtom(
    myPageStore.selectedComponent,
  );
  const handleLogout = async () => {
    await logout();
    logoutStore();
    navigate(`/`);
  };

  return (
    <>
      <InfoMenu.Outer selectedComponent={selectedComponent}>
        {/* 프로필 수정 */}
        <InfoMenu.Button
          onClick={() => setSelectedComponent('EditProfile')}
          style={{
            color: selectedComponent === 'EditProfile' ? '#8200FF' : '#999',
          }}
        >
          {selectedComponent === 'EditProfile' ? (
            <InfoMenu.ButtonIcon src="/images/badge (2).png" />
          ) : (
            <InfoMenu.ButtonIcon src="/images/badge (1).png" />
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
            <InfoMenu.ButtonIcon src="/images/palette (2).png" />
          ) : (
            <InfoMenu.ButtonIcon src="/images/palette.png" />
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
            <InfoMenu.ButtonIcon src="/images/favorite (2).png" />
          ) : (
            <InfoMenu.ButtonIcon src="/images/favorite.png" />
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
            <InfoMenu.ButtonIcon src="/images/rate_review (2).png" />
          ) : (
            <InfoMenu.ButtonIcon src="/images/rate_review.png" />
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
            <InfoMenu.ButtonIcon src="/images/edit_note (2).png" />
          ) : (
            <InfoMenu.ButtonIcon src="/images/edit_note.png" />
          )}
          작성한 글
        </InfoMenu.Button>
        {/* 로그아웃, 회원탈퇴 */}
        <InfoMenu.InfoButtonContainer>
          <InfoMenu.InfoButton onClick={handleLogout}>
            로그아웃
          </InfoMenu.InfoButton>
          <InfoMenu.InfoButton>|</InfoMenu.InfoButton>
          <InfoMenu.InfoButton
            onClick={async () => {
              const { error } = await supabase.auth.admin.deleteUser(user?.id!);
              if (!error) {
                toast.success('탈퇴되었습니다');
              }
              logoutStore();
            }}
          >
            회원탈퇴
          </InfoMenu.InfoButton>
        </InfoMenu.InfoButtonContainer>
      </InfoMenu.Outer>
    </>
  );
};
export default MyInfoMenu;
