import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../types/supabase';
import { atom, useAtom, useAtomValue } from 'jotai';

import * as userStore from '../../store/userStore';
import { useLocation } from 'react-router-dom';
import { Profile } from './MyPage.styles';

//1. supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;
const bucketName = 'Profile_Images';
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
//2 프로필 변경
type ChangeMyProfile = Database['public']['Tables']['users']['Row'];

const usersAtom = atom<ChangeMyProfile[]>([]);

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>('');
  const [userProfile, setUserProfile] = useAtom(usersAtom);
  const user = useAtomValue(userStore.user);
  const [newNickname, setNewNickname] = useState('');

  //2-1. 이미지 변경
  useEffect(() => {
    const updateUserImage = async () => {
      try {
        if (!user) {
          return;
        }
        console.log('업데이트되는 유저 아이디', user.id);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('updateUserImage에서 에러', error);
        } else {
          console.log('User image Updated:', data);
          setUserProfile(data);
        }
      } catch (error) {
        console.error('fetchUserPosts 에러', error);
      }
    };

    updateUserImage().then(() => {});
  }, [setUserProfile, user]);
  console.log('데이터가 업데이트 된 후에 로그 출력.', userProfile);
  //2-1-1. 사진 업로드
  const handleUpload = async () => {
    console.log('handleUpload started');
    if (!selectedFile) {
      console.log('No selected file');
      return;
    }

    // 2-1-2. 사진UUID생성
    const fileExtension = selectedFile.name.split('.').pop(); //파일확장자추출
    const newFileName = `${uuidv4()}.${fileExtension}`;
    const sanitizedFileName = newFileName.replace(/[^a-zA-Z0-9]/g, ''); // 잘못된 문자 제거
    const profileFilePath = `public/Profile_Images/${sanitizedFileName}`;

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('Profile Images')
        .upload(profileFilePath, selectedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }
      console.log('File uploaded successfully!');

      const response = supabase.storage
        .from('Profile Images')
        .getPublicUrl(profileFilePath);

      if (response.data) {
        const publicUrl = response.data.publicUrl;
        console.log('Public URL:', publicUrl);
      } else {
        console.error('No public URL found in response data.');
      }

      const publicUrl = response.data.publicUrl;

      console.log('Public URL:', publicUrl);

      //2-1-3. 사용자 프로필 이미지 업데이트
      const { data: userData, error: userUpdateError } = await supabase
        .from('users')
        .update({
          profile_img_url: publicUrl,
        }) // 업데이트 쿼리
        .eq('id', user?.id);
      await supabase.auth.updateUser({
        data: { profile_img_url: publicUrl },
      });
      console.log(publicUrl, '수정함');
      if (userUpdateError) {
        console.error(userUpdateError);

        return;
      }

      console.log('User profile updated successfully!!!!');
      alert('수정되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  //2-2. 닉넴변경
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const handleSubmitNickname = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ nickname: newNickname })
        .eq('id', user?.id);

      if (error) {
        console.error(error);
      } else if (data && Array.isArray(data)) {
        setUserProfile(data);
        setEditMode('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //2-3.비번 변경
  //a. 현재 비밀번호 입력 -> 다른 비밀번호면 비번변경불가
  //-> 같은 비밀번호면 새비밀번호 입력창과 새 비밀번호 확인창 나타나기

  const authHeaders = { Authorization: `Bearer ${supabaseAnonKey}` };
  const renderContent = () => {
    return (
      <Container>
        <EditTitle>프로필 수정</EditTitle>
        <Divider />

        <Item>
          <Label>사진</Label>
          {userProfile && editMode === 'photo' ? (
            <>
              <Item>
                {/* 프로필 이미지를 표시하는 부분 */}
                {userProfile.map((profile) => (
                  <div key={profile.id}>
                    {profile.profile_img_url ? (
                      <Profile.BasicImage
                        src={profile.profile_img_url}
                        alt="Profile picture"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : (
                      <div>프로필 이미지 없음</div>
                    )}
                  </div>
                ))}
              </Item>
              {/* </div> */}
              <Input
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    setSelectedFile(event.target.files[0]);
                  }
                }}
              />
              <Button onClick={() => setEditMode('')}>취소</Button>
              <Button
                onClick={() => {
                  handleUpload();
                  setEditMode('');
                }}
              >
                완료
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode('photo')}>변경</Button>
          )}
        </Item>
        <TextBelowPhoto>
          등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.
        </TextBelowPhoto>
        <Divider />
        <Item>
          <Label>이메일</Label>
          <div>{userProfile[0]?.email}</div>
        </Item>
        <Divider />

        <Label>비밀번호</Label>
        <Divider />

        <Item>
          <Label>닉네임</Label>
          {editMode === 'nickname' ? (
            <form onSubmit={handleSubmitNickname}>
              <Input
                type="text"
                value={newNickname}
                onChange={handleNicknameChange}
                placeholder="New Nickname"
              />
              <Button type="submit">완료</Button>
              <Button onClick={() => setEditMode('')}>취소</Button>
            </form>
          ) : (
            <>
              <div>{userProfile[0]?.nickname}</div>
              <Button onClick={() => setEditMode('nickname')}>변경</Button>
            </>
          )}
        </Item>

        {/* <Item>
          <Label>비밀번호</Label>
          {editMode === 'password' ? (
            <form onSubmit={handleSubmitPassword}>
              <Input
                type="text"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
              />
              <Button type="submit">완료</Button>
              <Button onClick={() => setEditMode('')}>취소</Button>
            </form>
          ) : (
            <>
              <div>{user?.password}</div>
              <Button onClick={() => setEditMode('password')}>변경</Button>
            </>
          )}
        </Item> */}
        <Divider />
      </Container>
    );
  };

  return <>{renderContent()}</>;
};

export default EditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  top: -230px;
  margin-left: 150px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  width: 70px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
`;

export const Button = styled.button`
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 12px;
  background-color: transparent;
  width: 80px;
  height: 30px;
  text-align: center;
  margin-left: 700px;
`;
export const EditTitle = styled.div`
  width: 150px;
  height: 32px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
`;
const TextBelowPhoto = styled.div`
  color: #838383;
  font-size: 14px;
  margin-top: 8px;
  width: 400px;
`;
export const Divider = styled.div`
  width: 250%;
  height: 1px;
  background-color: #ccc;
  margin-top: 8px;
  margin-bottom: 8px;
`;
