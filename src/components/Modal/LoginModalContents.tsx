import React, { useState } from 'react';
import styled from 'styled-components';
import useViewport from '../../hooks/useViewPort';
import { useSetAtom } from 'jotai';
import useInput from '../../hooks/useInput';
import { toast } from 'react-toastify';
import * as authApi from '../../api/auth';
import * as userStore from '../../store/userStore';
import * as modalStore from '../../store/modalStore';

type ErrorType = {
  error: boolean;
  errorMsg: string;
};

const initialError: ErrorType = { error: false, errorMsg: '' };

enum AuthProvider {
  Google = 'google',
  Kakao = 'kakao',
  GitHub = 'github',
  Discord = 'discord',
}

const LoginModalContents = () => {
  const [email, setEmail, onChangeEmail] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const [emailError, setEmailError] = useState<ErrorType>(initialError);
  const [passwordError, setPasswordError] = useState<ErrorType>(initialError);
  const [emailAndPasswordError, setEmailAndPasswordError] =
    useState<ErrorType>(initialError);
  const [checked, setChecked] = useState(false);
  const setModalContents = useSetAtom(modalStore.modalContents);
  const setIsModalOpened = useSetAtom(modalStore.isModalOpened);
  const writeUser = useSetAtom(userStore.writeUser);
  const [loading, setLoading] = useState(false);
  const { width, height } = useViewport();
  const validationFunc = (e: any) => {
    e.preventDefault();
    const regStr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regex = new RegExp(regStr);
    let eErrorFlag = false;
    let pErrorFlag = false;
    setEmailAndPasswordError(initialError);
    if (password.length < 1) {
      setPasswordError({
        error: true,
        errorMsg: '비밀번호를 입력해주세요',
      });
      pErrorFlag = true;
    } else setPasswordError(initialError);
    // console.log(regex.test(email));
    if (email.length < 1) {
      setEmailError({
        error: true,
        errorMsg: '이메일을 입력해주세요',
      });
      eErrorFlag = true;
    } else if (!regex.test(email)) {
      setEmailError({
        error: true,
        errorMsg: '이메일형식으로 입력해주세요',
      });
      eErrorFlag = true;
    } else setEmailError(initialError);
    if (eErrorFlag === false && pErrorFlag === false) {
      return false;
    }
    return true;
  };
  return (
    <StLoginContainer $mediawidth={width} mediaHeight={height}>
      <StLoginUpperContents>
        <StLoginInfoContainer>
          <StLoginInfoLogo $mediawidth={width}>
            <img src={'/images/logo.svg'} alt="로고" />
          </StLoginInfoLogo>
          <StLoginInfoTypo $mediawidth={width}>
            다양한 애니메이션 팬들과 소통해보세요!
          </StLoginInfoTypo>
        </StLoginInfoContainer>
        <StLoginInputContainer $mediawidth={width}>
          <StLoginInput
            error={emailError.error}
            loginError={emailAndPasswordError.error}
            onChange={onChangeEmail}
            placeholder="EMAIL"
            $mediawidth={width}
          />
          <StLoginInput
            error={passwordError.error}
            loginError={emailAndPasswordError.error}
            type="password"
            onChange={onChangePassword}
            placeholder="PASSWORD"
            $mediawidth={width}
          />
          <p
            style={{
              color: 'var(--error, #FF535D)',
              fontFamily: 'Pretendard Variable',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
              letterSpacing: '-0.195px',
            }}
          >
            {/*둘다안됨->이메일안됨->비밀번호안됨*/}
            {emailAndPasswordError.error
              ? emailAndPasswordError.errorMsg
              : emailError.error
              ? emailError.errorMsg
              : passwordError.error
              ? passwordError.errorMsg
              : ''}
          </p>

          <StLoginCheckBoxContianer>
            <StLoginCheckBoxContents>
              <StLoginCheckBox onClick={() => setChecked(!checked)}>
                <img
                  src={
                    checked
                      ? '/images/checkBoxChecked.svg'
                      : '/images/checkBox.svg'
                  }
                  alt="checkBox"
                />
              </StLoginCheckBox>
              <StLoginCheckBoxTypo>로그인유지</StLoginCheckBoxTypo>
            </StLoginCheckBoxContents>
          </StLoginCheckBoxContianer>
          <StLoginButton
            onClick={async (e) => {
              if (validationFunc(e)) {
                return;
              }
              setLoading(true);
              const result = await authApi.loginHandler(
                {
                  email: email,
                  password: password,
                },
                false,
              );
              setLoading(false);
              if (result) {
                toast.success('안녕하세요! 환영합니다😊', {
                  position: 'top-center',
                  autoClose: 800,
                  hideProgressBar: true,
                });
                await writeUser();
                setIsModalOpened(false);
              } else {
                setEmailAndPasswordError({
                  error: true,
                  errorMsg: '이메일또는 비밀번호가 유효하지 않습니다.',
                });
              }
            }}
          >
            {loading ? (
              <StLoginButtonTypo>
                <img
                  style={{ width: '15px', height: '15px' }}
                  src={'/images/loadingSpinner.svg'}
                  alt="스피너"
                />
              </StLoginButtonTypo>
            ) : (
              <StLoginButtonTypo>로그인</StLoginButtonTypo>
            )}
          </StLoginButton>
        </StLoginInputContainer>
        <StLoginOptions $mediawidth={width}>
          {/* <StLoginOptionsTypo
            onClick={() => setModalContents('findId')}
            $mediawidth={width}
          >
            아이디찾기
          </StLoginOptionsTypo>
          <StLoginOptionsTypo
            onClick={() => setModalContents('findPass')}
            $mediawidth={width}
          >
            비밀번호 찾기
          </StLoginOptionsTypo> */}
          <StLoginOptionsTypo
            onClick={() => setModalContents('register')}
            $mediawidth={width}
          >
            회원가입
          </StLoginOptionsTypo>
        </StLoginOptions>
      </StLoginUpperContents>
      <StLoginDownerContents>
        <StLoginDownerTitleContainer>
          <StLoginDownerTitlehorizontalLine
            $mediawidth={width}
            src={'/images/horzontalLineForLoginModal.svg'}
          />
          SNS계정으로 로그인
          <StLoginDownerTitlehorizontalLine
            $mediawidth={width}
            src={'/images/horzontalLineForLoginModal.svg'}
          />
        </StLoginDownerTitleContainer>
        <StLoginDownerLoginOptionContainer $mediawidth={width}>
          {/* <StLoginDownerLoginOption
            src={discord}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Discord);
            }}
            $mediawidth={width}
            alt="디스코드"
          />
          <StLoginDownerLoginOption
            src={github}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.GitHub);
            }}
            $mediawidth={width}
            alt="깃헙"
          /> */}
          <StLoginDownerLoginOption
            src={'/images/google.svg'}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Google);
            }}
            $mediawidth={width}
            alt="구글"
          />
          <StLoginDownerLoginOption
            src={'/images/kakao.svg'}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Kakao);
            }}
            $mediawidth={width}
            alt="카카오"
          />
        </StLoginDownerLoginOptionContainer>
      </StLoginDownerContents>
    </StLoginContainer>
  );
};

const StLoginContainer = styled.div<{
  $mediawidth: number;
  mediaHeight: number;
}>`
  display: flex;
  padding: 40px 0px;
  width: ${(props) => 564 * (props.$mediawidth / 1920)}px;
  min-width: 350px;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => 80 * (props.mediaHeight / 1080)}px;
  @media (max-width: 768px) {
    padding: 20px 0px;
  }
`;
const StLoginUpperContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;
const StLoginDownerContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
const StLoginInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const StLoginInfoLogo = styled.div<{ $mediawidth: number }>`
  color: #000;
  font-size: max(${(props) => 28 * (props.$mediawidth / 1920)}px, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 142.857%; /* 142.857% */
`;
const StLoginInfoTypo = styled.div<{ $mediawidth: number }>`
  color: var(--achromatic-colors-dark-gray, #4f4f4f);
  text-align: center;
  font-size: max(${(props) => 20 * (props.$mediawidth / 1920)}px, 15px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.3px;
`;
const StLoginInputContainer = styled.div<{ $mediawidth: number }>`
  display: flex;
  width: 312px;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const StLoginInput = styled.input<{
  $mediawidth: number;
  error: boolean;
  loginError: boolean;
}>`
  display: flex;
  border-radius: 10px;
  background: var(--main-light-3, #f9f3ff);
  height: 40px;
  border: ${(props) =>
    props.loginError || props.error
      ? '1px solid var(--error, #FF535D)'
      : 'none'};
  padding: 8px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  &:focus {
    outline: none;
  }
`;
const StLoginCheckBoxContianer = styled.div`
  display: flex;
  width: 312px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;
const StLoginCheckBoxContents = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const StLoginCheckBox = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
const StLoginCheckBoxTypo = styled.p`
  color: var(--achromatic-colors-black, #191919);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.195px;
`;
const StLoginButton = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 8px 0;
  justify-content: center;
  border-radius: 10px;
  background: var(--sub-1, #ffa8dc);
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
const StLoginButtonTypo = styled.p`
  color: var(--achromatic-colors-white, #fff);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.225px;
`;
const StLoginOptions = styled.div<{ $mediawidth: number }>`
  display: flex;
  width: ${(props) => 390 * (props.$mediawidth / 1920)}px;
  padding: 0px 60px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const StLoginOptionsTypo = styled.p<{ $mediawidth: number }>`
  color: var(--achromatic-colors-dark-gray, #4f4f4f);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
  white-space: nowrap;
  cursor: pointer;
`;
const StLoginDownerTitleContainer = styled.div`
  display: flex;
  padding: 0px 40px;
  justify-content: space-between;
  align-items: center;
`;
const StLoginDownerTitlehorizontalLine = styled.img<{ $mediawidth: number }>`
  width: ${(props) => 81.913 * (props.$mediawidth / 1920)}px;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 0.6px;
  stroke: var(--achromatic-colors-gray-2, #999);
`;
const StLoginDownerLoginOptionContainer = styled.div<{ $mediawidth: number }>`
  display: flex;
  width: 390px;
  padding: 0px 60px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const StLoginDownerLoginOption = styled.img<{ $mediawidth: number }>`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  cursor: pointer;
`;
export default LoginModalContents;
