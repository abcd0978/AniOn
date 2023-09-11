import React from 'react';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { styled } from 'styled-components';

type Props = {};

const MyPage = (props: Props) => {
  return (
    <MyPageConainer>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyContainer>
        <MyProfile />
        <MyInfoMenu />
      </Profile.MyContainer>
    </MyPageConainer>
  );
};

export default MyPage;
const MyPageConainer = styled.div`
  margin: 0 auto;
  margin-bottom: 32px;
  position: relative;
`;
