import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';
import myAnonymousImg from '../../assets/anonymous_img.jpg';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { atom, useAtom, useAtomValue } from 'jotai'; // Import from jotai
import { Profile } from './MyPage.styles';
import MyProfileAward from './MyProfileAward';
import MyPoint from './MyPoint';
import * as userStore from '../../store/userStore';
import ProfileWithBorder from '../ProfileWithBorder';
import useViewport from '../../hooks/useViewPort';
const MyProfile = () => {
  const user = useAtomValue(userStore.user);
  const { width } = useViewport();

  if (!user) {
    return <div>로딩중...</div>;
  }

  return (
    <Profile.MyProfileContainer>
      {user && (
        <ProfileWithBorder mediaWidth={width} width={160} key={user?.id!} />
      )}
      <Profile.MyNickname>{user?.nickname}</Profile.MyNickname>
      <MyProfileAward />
      <MyPoint />
    </Profile.MyProfileContainer>
  );
};

export default MyProfile;
