import React, { useContext } from 'react';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { styled } from 'styled-components';
import MyInfoMenuMobile from '../components/myPage/MobileMenu';
import { ViewportContext } from '../components/ViewportContext';

interface Props {
  viewport?: number;
}

const MyPage = ({ viewport }: Props) => {
  const { width, height } = useContext(ViewportContext);
  return (
    <Profile.MyPageConainer>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyContainer>
        <MyProfile />
        {width <= 768 ? <MyInfoMenuMobile /> : <MyInfoMenu />}
      </Profile.MyContainer>
    </Profile.MyPageConainer>
  );
};

export default MyPage;
