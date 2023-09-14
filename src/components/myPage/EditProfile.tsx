import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useSetAtom } from 'jotai';
import * as authApi from '../../api/auth';
import * as userStore from '../../store/userStore';
import { Divider, Profile } from './Styled.MyPage/MyPage.styles';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { E } from './Styled.MyPage/Edit.styles';
import PasswordReset from './ResetPassword';
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
  const writeUser = useSetAtom(userStore.writeUser);
  const [newNickname, setNewNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<ErrorType>(initialError);
  const [nicknameDupChecked, setNicknameDupChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //2-1-1. 사진 업로드
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning('선택된 파일이 없습니다.', {
        autoClose: 800,
      });
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
        toast.warning('유효하지 않은 파일 형식입니다.', {
          autoClose: 800,
        });
        setSelectedFile(null);
        return;
      }

      const response = supabase.storage
        .from('Profile Images')
        .getPublicUrl(profileFilePath);

      if (response.data) {
        const publicUrl = response.data.publicUrl;
      } else {
        console.error('No public URL found in response data.');
      }

      const publicUrl = response.data.publicUrl;

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
      if (userUpdateError) {
        console.error(userUpdateError);
      } else {
        if (user) {
          await writeUser();
          toast.success('수정되었습니다.', {
            autoClose: 800,
          });
        } else {
          console.error('No current user found');
        }
      }
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
      toast.warn('닉네임 중복확인을 해주세요.', {
        autoClose: 800,
      });
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
      if (error) {
        console.error('Update error:', error);
      } else {
        if (user) {
          await writeUser();
          toast.success('닉네임 변경 성공 ✔️', {
            autoClose: 800,
          });
          setEditMode('');
        } else {
          console.error('No current user found');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    let updatedUser = user;
    return (
      <E.Page>
        <E.Title>프로필 수정</E.Title>
        <E.Container>
          <Divider />
          {/* 사진 */}
          <E.PhotoItem>
            <E.Label>사진</E.Label>
            {user && editMode === 'photo' ? (
              <E.ButtonArray>
                {/* 프로필 이미지를 표시하는 부분 */}
                {selectedFile ? (
                  <Profile.BasicImage
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected profile picture"
                  />
                ) : (
                  <div key={user?.id}>
                    <Profile.EditImage
                      src={user?.profile_img_url!}
                      alt="Profile picture"
                    />
                  </div>
                )}
                <E.FileSelectContainer>
                  <E.StyledLabel htmlFor="fileUpload">사진 선택</E.StyledLabel>
                  <E.HiddenFileInput
                    id="fileUpload"
                    onChange={(event) => {
                      if (event.target.files) {
                        setSelectedFile(event.target.files[0]);
                      }
                    }}
                  />
                </E.FileSelectContainer>
                <E.CancelAndDone>
                  <E.CancelButton onClick={() => setEditMode('')}>
                    취소
                  </E.CancelButton>
                  <E.DoneButton
                    onClick={() => {
                      handleUpload();
                      setEditMode('');
                    }}
                  >
                    완료
                  </E.DoneButton>
                </E.CancelAndDone>
              </E.ButtonArray>
            ) : (
              <E.ButtonArray>
                {/* 변경 버튼을 누르기 전에 현재 프로필 이미지를 표시하는 부분 */}

                <div key={user?.id}>
                  <Profile.BasicImage
                    src={user?.profile_img_url!}
                    alt="Profile picture"
                  />
                </div>

                <E.ChangeButton onClick={() => setEditMode('photo')}>
                  변경
                </E.ChangeButton>
              </E.ButtonArray>
            )}
            <E.TextBelowPhoto>
              등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.
            </E.TextBelowPhoto>
          </E.PhotoItem>

          <Divider />
          {/* 이메일 */}
          <E.EtcItem>
            <E.Label>이메일</E.Label>
            <div>{user?.email}</div>
          </E.EtcItem>
          <Divider />
          <E.Label>비밀번호</E.Label>
          <PasswordReset />
          <Divider />

          {/* 닉넴 */}
          <E.EtcItem>
            <E.Label>닉네임</E.Label>
            <E.NickNameContainer>
              {editMode === 'nickname' ? (
                <form onSubmit={handleSubmitNickname}>
                  <E.TextBelowNickname>
                    {nicknameValidationMessage && (
                      <E.Warning>{nicknameValidationMessage}</E.Warning>
                    )}
                    • 중복 닉네임 불가합니다.
                    <br /> • 2~8자 이내로 작성해주세요.
                  </E.TextBelowNickname>
                  <E.NickNameInputAndCheck>
                    <E.Input
                      type="text"
                      value={newNickname}
                      onChange={handleNicknameChange}
                      placeholder={updatedUser?.nickname}
                    />

                    <E.NickNameCheck
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
                            toast.success('사용가능한 닉네임입니다.✔️', {
                              autoClose: 800,
                            });
                            setNicknameDupChecked(true);
                            setNicknameError(initialError);
                          } else {
                            toast.warn('이미 사용 중인 닉네임 입니다.', {
                              autoClose: 800,
                            });
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
                    </E.NickNameCheck>
                  </E.NickNameInputAndCheck>
                  <E.NickNameButtons>
                    <E.DoneButton
                      type="submit"
                      disabled={
                        newNickname === '' ||
                        newNickname === user?.nickname ||
                        !(newNickname.length >= 2 && newNickname.length <= 8)
                      }
                    >
                      완료
                    </E.DoneButton>
                    <E.CancelButton onClick={() => setEditMode('')}>
                      취소
                    </E.CancelButton>
                  </E.NickNameButtons>
                </form>
              ) : (
                <E.ButtonArray>
                  <div>{updatedUser?.nickname}</div>
                  <E.ChangeButton onClick={() => setEditMode('nickname')}>
                    변경
                  </E.ChangeButton>
                </E.ButtonArray>
              )}
            </E.NickNameContainer>
          </E.EtcItem>

          <Divider />
        </E.Container>
      </E.Page>
    );
  };

  return <E.Container>{renderContent()}</E.Container>;
};

export default EditProfile;
