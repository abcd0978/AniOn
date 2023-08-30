import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';
import myAnonymousImg from '../../assets/anonymous_img.jpg';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { atom, useAtom } from 'jotai'; // Import from jotai
import { Profile } from './MyPage.styles';
import MyProfileAward from './MyProfileAward';
import MyPoint from './MyPoint';
import * as userStore from '../../store/userStore';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Users = Database['public']['Tables']['users']['Row'];

const MyProfile = () => {
  const [user, setUser] = useAtom(userStore.user);
  const { user_id } = useParams();

  if (!user) {
    return <div>로딩중...</div>;
  }

  return (
    <Profile.MyProfileContainer>
      {user?.profile_img_url ? (
        <Profile.BasicImage
          src={process.env.PUBLIC_URL + user?.profile_img_url}
          alt="Profile picture"
        />
      ) : (
        <Profile.BasicImage src={myAnonymousImg} />
      )}
      <Profile.MyNickname>{user?.nickname}</Profile.MyNickname>
      <MyProfileAward />
      <MyPoint />
    </Profile.MyProfileContainer>
  );
};

export default MyProfile;
