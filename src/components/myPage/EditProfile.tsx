import React, { useState } from 'react';
import styled from 'styled-components';
import supabase from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../types/supabase';
import { useAtomValue, useSetAtom } from 'jotai';
import * as authApi from '../../api/auth';
import * as userStore from '../../store/userStore';
import { Profile } from './MyPage.styles';
import { Review } from './Wrote.styles';
import { useAtom } from 'jotai';
//2-2-1.닉넴중복확인
type ErrorType = {
  error: boolean;
  errorMsg: string;
};
//2 프로필 변경
const initialError: ErrorType = { error: false, errorMsg: '' };
const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>('');
  const [user, setUser] = useAtom(userStore.user);
  const [newNickname, setNewNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<ErrorType>(initialError);
  const [nicknameDupChecked, setNicknameDupChecked] = useState(false);
  //2-1-1. 사진 업로드
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('선택된 파일이 없습니다.');
      return;
    }
    console.log('user', user);
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
        alert('유효하지 않은 파일 형식입니다.');
        setSelectedFile(null);
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

      if (userUpdateError) {
        console.error(userUpdateError);
      } else {
        // userStore의 user 상태도 함께 업데이트합니다.

        if (user) {
          const updatedUser = {
            ...user,
            profile_img_url: publicUrl,
          };
          setUser(updatedUser);
          alert('수정되었습니다.');
          console.log('updatedUser', updatedUser); //미피
          console.log('currentUser1', updatedUser); //미피
        } else {
          console.error('No current user found');
        }
      }

      console.log('User profile updated successfully!!!!');
      console.log('currentUser2', user); //실바니안
    } catch (error) {
      console.error(error);
    }
  };
  //2-2. 닉넴변경
  const [nicknameValidationMessage, setNicknameValidationMessage] =
    useState('');
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNewNickname(nickname);

    if (nickname.length === 1 || nickname.length > 8) {
      setNicknameValidationMessage('• 닉네임은 2~8자 사이로해주세요.');
    } else {
      setNicknameValidationMessage('');
    }
  };

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
      console.log('Validation result:', validationResult);
      if (validationResult.error) {
        setNicknameError(validationResult);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .update({ nickname: newNickname })
        .eq('id', user?.id);

      if (error) {
        console.error('Update error:', error);
      } else {
        if (user) {
          const updatedUser = {
            ...user,
            nickname: newNickname,
          };

          // supabase에서 업데이트 된 정보를 가져와서 업데이트
          const { data: userData, error: userFetchError } = await supabase
            .from('users')
            .select()
            .eq('id', user?.id);

          if (userFetchError) {
            console.error('User fetch error:', userFetchError);
          } else {
            const [updatedUserData] = userData || [];
            if (updatedUserData) {
              setUser(updatedUserData);
            }
          }

          alert('닉네임이 변경되었습니다.');
          setEditMode('');
          console.log('updatedNickname', updatedUser);
        } else {
          console.error('No current user found');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  //2-3.비번 변경
  //a. 현재 비밀번호 입력 -> 다른 비밀번호면 비번변경불가
  //-> 같은 비밀번호면 새비밀번호 입력창과 새 비밀번호 확인창 나타나기

  const renderContent = () => {
    let updatedUser = user;
    return (
      <Container>
        <EditTitle>프로필 수정</EditTitle>
        <Divider />

        <Item>
          <Label>사진</Label>
          {user && editMode === 'photo' ? (
            <ButtonArray>
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
              <FileInput
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    setSelectedFile(event.target.files[0]);
                  }
                }}
              />
              <CancelButton onClick={() => setEditMode('')}>취소</CancelButton>
              <DoneButton
                onClick={() => {
                  handleUpload();
                  setEditMode('');
                }}
              >
                완료
              </DoneButton>
            </ButtonArray>
          ) : (
            <ButtonArray>
              {/* 변경 버튼을 누르기 전에 현재 프로필 이미지를 표시하는 부분 */}

              <div key={user?.id}>
                <Profile.BasicImage
                  src={user?.profile_img_url!}
                  alt="Profile picture"
                />
              </div>

              <ChangeButton onClick={() => setEditMode('photo')}>
                변경
              </ChangeButton>
            </ButtonArray>
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
              <TextBelowNickname>
                {nicknameValidationMessage && (
                  <Warning>{nicknameValidationMessage}</Warning>
                )}
                • 중복 닉네임 불가합니다.
                <br /> • 2~8자 이내로 작성해주세요.
              </TextBelowNickname>
              <Input
                type="text"
                value={newNickname}
                onChange={handleNicknameChange}
                placeholder={updatedUser?.nickname}
              />
              <NickNameCheck
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
                      alert('이미 사용 중인 닉네임입니다.');
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
                disabled={
                  newNickname === '' ||
                  newNickname === user?.nickname ||
                  !(newNickname.length >= 2 && newNickname.length <= 8)
                }
              >
                중복확인
              </NickNameCheck>
              <DoneButton
                type="submit"
                disabled={
                  newNickname === '' ||
                  newNickname === user?.nickname ||
                  !(newNickname.length >= 2 && newNickname.length <= 8)
                }
              >
                완료
              </DoneButton>
              <CancelButton onClick={() => setEditMode('')}>취소</CancelButton>
            </form>
          ) : (
            <ButtonArray>
              <div>{updatedUser?.nickname}</div>
              <ChangeButton onClick={() => setEditMode('nickname')}>
                변경
              </ChangeButton>
            </ButtonArray>
          )}
        </Item>
        <Divider />
      </Container>
    );
  };

  return <>{renderContent()}</>;
};

export default EditProfile;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  top: -320px;
  margin-left: 160px;
  margin-bottom: 130px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
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
  background-color: #f9f3ff;
`;
const FileInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
`;
const CancelButton = styled.button`
  position: absolute;
  right: 80px;
  background-color: #dbdbdb;
  border-radius: 12px;
  width: 72px;
  height: 32px;
  border: transparent;
`;
const DoneButton = styled.button`
  position: absolute;
  right: -5px;
  background-color: #8200ff;
  border-radius: 12px;
  width: 72px;
  height: 32px;
  border: transparent;
  color: #fff;
  &:disabled {
    background-color: white;
    color: #cccccc;
    cursor: not-allowed;
  }
`;
const ChangeButton = styled.button`
  background-color: #fdfbff;
  border-radius: 12px;
  width: 72px;
  height: 32px;
  border: 1px solid var(--main-mid-2, #c88fff);
  position: absolute;
  right: -5px;
  color: #000;
`;
const NickNameCheck = styled.button`
  position: absolute;
  margin-left: 10px;
  background-color: #ff96db;
  border-radius: 12px;
  width: 72px;
  height: 32px;
  border-color: transparent;
  // border-style: solid;
  color: #fff;
  &:disabled {
    background-color: white;
    color: #cccccc;
    cursor: not-allowed;
  }
`;
export const Button = styled.button`
  padding: 8px;
  // text-align: center;
  //margin-left: 700px;
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
  margin-left: 80px;
  width: 400px;
`;
const TextBelowNickname = styled.div`
  color: #838383;
  font-size: 14px;
  margin-top: 8px;
  width: 400px;
`;
export const Divider = styled.div`
  width: 900px;
  height: 1px;
  background-color: #ccc;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const Warning = styled.p`
  color: red;
`;
const ButtonArray = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
