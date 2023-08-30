import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../types/supabase';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as authApi from '../../api/auth';
import * as userStore from '../../store/userStore';
import { useLocation } from 'react-router-dom';
import { Profile } from './MyPage.styles';
import useInput from '../../hooks/useInput';

//1. supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;
const bucketName = 'Profile_Images';
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}
//2-2-1.닉넴중복확인
type ErrorType = {
  error: boolean;
  errorMsg: string;
};
const supabase = createClient(supabaseUrl, supabaseAnonKey);
//2 프로필 변경
type ChangeMyProfile = Database['public']['Tables']['users']['Row'];
const initialError: ErrorType = { error: false, errorMsg: '' };

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>('');
  const user = useAtomValue(userStore.user);
  const writeUser = useSetAtom(userStore.writeUser);
  const [newNickname, setNewNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<ErrorType>(initialError);
  const [nicknameDupChecked, setNicknameDupChecked] = useState(false);
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
      await writeUser();
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
  //2-2-1.닉넴중복확인
  type ErrorType = {
    error: boolean;
    errorMsg: string;
  };
  const initialError: ErrorType = { error: false, errorMsg: '' };

  const nicknameDupCheck = async (nickname: string) => {
    return await authApi.nicknameValidate(nickname);
  };
  const validateNickname = (nickname: string) => {
    let result: ErrorType = { error: false, errorMsg: '' };
    if (nickname.length < 2 || nickname.length > 8) {
      result.error = true;
      result.errorMsg = '닉네임은 2~8자 사이로해주세요.';
      return result;
    }
    return result;
  };
  const handleSubmitNickname = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nicknameDupChecked) {
      alert('닉네임 중복 확인을 먼저 해주세요.');
      return;
    }

    try {
      const validationResult = validateNickname(newNickname);
      if (validationResult.error) {
        setNicknameError(validationResult);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .update({ nickname: newNickname })
        .eq('id', user?.id);
      await supabase.auth.updateUser({
        data: { nickname: newNickname },
      });

      alert('닉네임이 변경되었습니다.');
      setEditMode('');
      if (error) {
        console.error(error);
      }
      await writeUser();
      setEditMode('');
    } catch (error) {
      console.error(error);
    }
  };

  //2-3.비번 변경
  //a. 현재 비밀번호 입력 -> 다른 비밀번호면 비번변경불가
  //-> 같은 비밀번호면 새비밀번호 입력창과 새 비밀번호 확인창 나타나기

  const renderContent = () => {
    return (
      <Container>
        <EditTitle>프로필 수정</EditTitle>
        <Divider />

        <Item>
          <Label>사진</Label>
          {user && editMode === 'photo' ? (
            <>
              {/* 프로필 이미지를 표시하는 부분 */}
              {selectedFile ? (
                <Profile.BasicImage
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected profile picture"
                />
              ) : (
                <div key={user?.id}>
                  <Profile.BasicImage
                    src={user?.profile_img_url!}
                    alt="Profile picture"
                  />
                </div>
              )}
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
            <>
              {/* 변경 버튼을 누르기 전에 현재 프로필 이미지를 표시하는 부분 */}

              <div key={user?.id}>
                <Profile.BasicImage
                  src={user?.profile_img_url!}
                  alt="Profile picture"
                />
              </div>

              <Button onClick={() => setEditMode('photo')}>변경</Button>
            </>
          )}
        </Item>
        <TextBelowPhoto>
          등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.
        </TextBelowPhoto>
        <Divider />
        <Item>
          <Label>이메일</Label>
          <div>{user?.email}</div>
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
                placeholder={user?.nickname}
              />
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const val = validateNickname(newNickname);
                  if (val.error) {
                    setNicknameError(val);
                    return;
                  }
                  try {
                    const isNicknameAvailable = await nicknameDupCheck(
                      newNickname,
                    );
                    if (isNicknameAvailable) {
                      alert('사용 가능한 닉네임입니다.');
                      setNicknameDupChecked(true);
                      setNicknameError(initialError);
                    } else {
                      setNicknameError({
                        error: true,
                        errorMsg: '중복되는 닉네임입니다.',
                      });
                      setNicknameDupChecked(false); // 중복확인 실패 시 초기화
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                중복확인
              </Button>
              <Button type="submit">완료</Button>
              <Button onClick={() => setEditMode('')}>취소</Button>
            </form>
          ) : (
            <>
              <div>{user?.nickname}</div>
              <Button onClick={() => setEditMode('nickname')}>변경</Button>
            </>
          )}
        </Item>
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
  width: auto;
  height: auto;
  // text-align: center;
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
