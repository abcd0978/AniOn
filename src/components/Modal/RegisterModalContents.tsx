import React, { useState } from 'react';
import styled from 'styled-components';
import useViewport from '../../hooks/useViewPort';
import { useAtom } from 'jotai';
import goBack from '../../assets/goBack.svg';
import * as modalStore from '../../store/modalStore';
import * as userStore from '../../store/userStore';
import useInput from '../../hooks/useInput';
import supabase from '../../supabaseClient';
import { Database } from '../../types/supabase';
import loadingSpinner from '../../assets/loadingSpinner.svg';
type userType = Database['public']['Tables']['users']['Insert'];
type Props = {};
const LoginModalContents = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useAtom(modalStore.isModalOpened);
  const [user, setUser] = useAtom(userStore.user);
  const [__, writeUser] = useAtom(userStore.writeUser);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const [email, setEmail, onChangeEmail, resetEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname, resetNickname] = useInput('');
  const [password, setPassword, onChangePassword, resetPassword] = useInput('');
  const [error, setError] = useState('');
  const [
    passwordConfirm,
    setPasswordConfirm,
    onChangePasswordConfirm,
    resetPasswordConfirm,
  ] = useInput('');
  const [loading, setLoading] = useState<boolean>(false);
  const { width, height, isMobile, isLoaded } = useViewport();
  const joinUsHandler = async (e: any) => {
    e.preventDefault();
    if (!email || !password || !nickname || !passwordConfirm) {
      setError('모든 칸을 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      setLoading(true);

      const userMetadata = {
        nickname: nickname,
        email: email,
        profile_img_url: `http://gravatar.com/avatar/${
          nickname + Math.random().toString()
        }?d=identicon`,
      };
      const signUpResult: any = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (signUpResult.error) {
        console.error(signUpResult.error);
        if (signUpResult.error.message.includes('User already registered')) {
          alert('동일한 이메일로 가입한 이력이 있습니다.');
        }
        if (signUpResult.error.message.includes('Email rate limit exceeded')) {
          alert('이메일 발송 제한이 초과되었습니다. 나중에 다시 시도해주세요.');
        }
        return;
      }
      alert('가입 되었습니다.');
      setModal(false);
      writeUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <StRegisterContainer mediaWidth={width} mediaHeight={height}>
      <StRegisteContentsContainer mediaWidth={width} mediaHeight={height}>
        <StRegisterTitleContainer>
          <img
            src={goBack}
            alt="뒤로가기"
            onClick={() => {
              setModalContents('login');
            }}
            style={{ cursor: 'pointer' }}
          />
          <StRegisterTitleTypo>회원가입</StRegisterTitleTypo>
          <div className="nothing" />
        </StRegisterTitleContainer>
        <StRegisterInputsContainer>
          <StRegisterInputContainer>
            <StRegisterInputTitleContainer>
              <StRegisterInputInfo>이메일*</StRegisterInputInfo>
            </StRegisterInputTitleContainer>

            <StRegisterInput
              onChange={(e) => {
                onChangeEmail(e);
              }}
              placeholder="이메일 입력"
              validation={false}
            />
          </StRegisterInputContainer>

          <StRegisterInputContainer>
            <StRegisterInputTitleContainer>
              <StRegisterInputInfo>비밀번호*</StRegisterInputInfo>
            </StRegisterInputTitleContainer>
            <StRegisterInput
              onChange={(e) => {
                onChangePassword(e);
              }}
              type="password"
              placeholder="비밀번호 입력"
              validation={false}
            />
            <StRegisterInput
              onChange={(e) => {
                onChangePasswordConfirm(e);
              }}
              type="password"
              placeholder="비밀번호 재입력"
              validation={false}
            />
          </StRegisterInputContainer>

          <StRegisterInputContainer>
            <StRegisterInputTitleContainer>
              <StRegisterInputInfo>닉네임*</StRegisterInputInfo>
              <StRegisterInputSubInfo>2~8자 이내</StRegisterInputSubInfo>
            </StRegisterInputTitleContainer>
            <StRegisterInputWithValidationButtonContainer>
              <StRegisterInput
                onChange={(e) => {
                  onChangeNickname(e);
                }}
                placeholder="닉네임 입력"
                validation={true}
              />
              <StRegisterValidationButton>
                <StRegisterValidationButtonTypo>
                  중복확인
                </StRegisterValidationButtonTypo>
              </StRegisterValidationButton>
            </StRegisterInputWithValidationButtonContainer>
          </StRegisterInputContainer>
        </StRegisterInputsContainer>

        <StRegiserButton
          onClick={(e) => {
            joinUsHandler(e);
          }}
          loading={loading}
        >
          {loading ? (
            <StRegisterButtonTypo>
              가입중{' '}
              <img
                style={{ width: '15px', height: '15px' }}
                src={loadingSpinner}
                alt="로딩스피너"
              />
            </StRegisterButtonTypo>
          ) : (
            <StRegisterButtonTypo>회원가입</StRegisterButtonTypo>
          )}
        </StRegiserButton>
      </StRegisteContentsContainer>
    </StRegisterContainer>
  );
};

const StRegisterContainer = styled.div<{
  mediaWidth: number;
  mediaHeight: number;
}>`
  display: flex;
  padding: 40px 0px;
  width: ${(props) => 564 * (props.mediaWidth / 1920)}px;
  min-width: 400px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const StRegisteContentsContainer = styled.div<{
  mediaWidth: number;
  mediaHeight: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 360px;
  gap: 48px;
`;
const StRegisterTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const StRegisterTitleTypo = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 166.667% */
`;
const StRegisterInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
`;
const StRegisterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;
const StRegisterInputTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
const StRegisterInputInfo = styled.p`
  color: var(--achromatic-colors-black, #191919);
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
`;
const StRegisterInputSubInfo = styled.p`
  color: var(--achromatic-colors-gray-2, #999);
  font-family: Pretendard Variable;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;
const StRegisterInputWithValidationButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const StRegisterInput = styled.input<{ validation: boolean }>`
  display: flex;
  height: 25px;
  ${(props) => (props.validation ? `width:100%;` : `width: calc(100% - 28px);`)}
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border: none;
  &:focus {
    outline: none;
  }
`;
const StRegisterValidationButton = styled.button`
  display: flex;
  width: 84px;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #757575;
  border: none;
  &:focus {
    outline: none;
  }
`;
const StRegisterValidationButtonTypo = styled.p`
  color: #fff;
  font-family: Pretendard Variable;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.225px;
  white-space: nowrap;
`;
const StRegiserButton = styled.button<{ loading: boolean }>`
  ${(props) => (props.loading ? `` : `cursor:pointer;`)}
  display: flex;
  width: 100%;
  height: 44px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #838383;
  border: none;
  &:focus {
    outline: none;
  }
`;
const StRegisterButtonTypo = styled.p`
  color: var(--achromatic-colors-white, #fff);
  font-family: Pretendard Variable;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.225px;
  white-space: nowrap;
`;
export default LoginModalContents;
