import React from 'react';
import MyProfile from '../components/myPage/MyProfile';
import { useParams } from 'react-router-dom';
import MyInfoMenu from '../components/myPage/MyInfoMenu';

type Props = {};

const MyPage = (props: Props) => {
  const { user_id } = useParams();
  return (
    <>
      <> 마이페이지</>
      <MyProfile />
      <MyInfoMenu />
    </>
  );
};

export default MyPage;
