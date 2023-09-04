import React from 'react';
import MyProfile from '../components/myPage/MyProfile';
import { useParams } from 'react-router-dom';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/MyPage.styles';
import Footer from '../components/Footer';

type Props = {};

const MyPage = (props: Props) => {
  return (
    <>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyContainer>
        <MyProfile />
        <MyInfoMenu />
      </Profile.MyContainer>
    </>
  );
};

export default MyPage;
