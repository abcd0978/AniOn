import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useViewport from '../../hooks/useViewPort';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import * as modalStore from '../../store/modalStore';
import * as userStore from '../../store/userStore';
import useInput from '../../hooks/useInput';
import supabase from '../../supabaseClient';
import * as authApi from '../../api/auth';
import * as itemApi from '../../api/items';
import { updatePoint } from '../../api/items';
/******************상수와 타입들****************/
type ErrorType = {
  error: boolean;
  errorMsg: string;
};
const initialError: ErrorType = { error: false, errorMsg: '' };
type Props = {};
const registerUnactivated =
  'background: var(--achromatic-colors-midgray-1, #999);';
const buttonColor = 'background: var(--main-sub-1, #FFA8DC);';
const inputColor = 'background: var(--main-light-3, #F9F3FF);';
const ErrorBorder = 'border: 1px solid var(--error, #FF535D);';
/******************유효성검사 함수****************/
const validateEmail = (email: string) => {
  const regStr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regex = new RegExp(regStr);
  let result: ErrorType = { error: false, errorMsg: '' };
  if (!email || email.length === 0) {
    result.error = true;
    result.errorMsg = '이메일을 입력해주세요';
    return result;
  }
  if (!regex.test(email)) {
    result.error = true;
    result.errorMsg = '이메일 형식으로 입력해주세요';
  }
  return result;
};
const validatePassword = (password: string) => {
  const regex = new RegExp('[A-Za-z0-9]');
  let result: ErrorType = { error: false, errorMsg: '' };
  if (password.length < 6) {
    result.error = true;
    result.errorMsg = '비밀번호는 6자이상이여야 합니다';
    return result;
  }
  if (!regex.test(password)) {
    result.error = true;
    result.errorMsg = '영문과 숫자로 입력해주세요';
    return result;
  }
  return result;
};
const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
  let result: ErrorType = { error: false, errorMsg: '' };
  console.log(password, passwordConfirm);
  if (password !== passwordConfirm) {
    result.error = true;
    result.errorMsg = '비밀번호가 일치하지 않습니다.';
    return result;
  }
  return result;
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
const emailDupCheck = async (email: string) => {
  return await authApi.emailValidate(email);
};
const nicknameDupCheck = async (nickname: string) => {
  return await authApi.nicknameValidate(nickname);
};
/************************************************/
const LoginModalContents = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const setModal = useSetAtom(modalStore.isModalOpened);
  const writeUser = useSetAtom(userStore.writeUser);
  const setModalContents = useSetAtom(modalStore.modalContents);
  const [email, setEmail, onChangeEmail, resetEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname, resetNickname] = useInput('');
  const [password, setPassword, onChangePassword, resetPassword] = useInput('');
  const [
    passwordConfirm,
    setPasswordConfirm,
    onChangePasswordConfirm,
    resetPasswordConfirm,
  ] = useInput('');
  const [emailError, setEmailError] = useState<ErrorType>(initialError);
  const [passwordError, setPasswordError] = useState<ErrorType>(initialError);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<ErrorType>(initialError);
  const [nicknameError, setNicknameError] = useState<ErrorType>(initialError);
  const [emailDupChecked, setEmaildupChecked] = useState(false);
  const [nicknameDupChecked, setNicknameDupChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { width, height, isMobile, isLoaded } = useViewport();
  const joinUsHandler = async (e: any) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !nickname ||
      !passwordConfirm ||
      emailError.error ||
      passwordError.error ||
      passwordConfirmError.error ||
      nicknameError.error ||
      !nicknameDupChecked ||
      !emailDupChecked
    ) {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) {
        console.error(error);
        toast.error('에러, 서버오류일수있음');
        return;
      }
      setModal(false);
      await writeUser();
      await itemApi.makePoint({ userId: data!.user!.id });
      toast.success('가입 되었습니다. 신규회원 100P증정!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      password &&
      passwordConfirm &&
      password === passwordConfirm &&
      !emailError.error &&
      !passwordError.error &&
      !passwordConfirmError.error &&
      !nicknameError.error &&
      emailDupChecked &&
      nicknameDupChecked
    ) {
      setValidated(true);
      return;
    }
    setValidated(false);
  }, [
    email,
    nickname,
    password,
    passwordConfirm,
    passwordError,
    passwordConfirmError,
    emailError,
    nicknameError,
    nicknameDupChecked,
    emailDupChecked,
  ]);
  return (
    <StRegisterContainer $mediawidth={width} mediaHeight={height}>
      <StRegisteContentsContainer $mediawidth={width} mediaHeight={height}>
        <StRegisterTitleContainer>
          <img
            src="/images/goBack.svg"
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
            <StRegisterInputWithValidationButtonContainer>
              <StRegisterInput
                error={emailError.error}
                errorBorder={ErrorBorder}
                onBlur={() => {
                  setEmailError(validateEmail(email));
                }}
                onFocus={() => {
                  setEmailError({ error: false, errorMsg: '' });
                }}
                onChange={(e) => {
                  onChangeEmail(e);
                  setEmaildupChecked(false);
                }}
                placeholder="이메일 입력"
                validation={false}
              />
              <StRegisterValidationButton
                onClick={async () => {
                  const val = validateEmail(email);
                  if (val.error) {
                    setEmailError(val);
                    return;
                  }
                  if (await emailDupCheck(email)) {
                    setEmaildupChecked(true);
                    toast.success('사용가능합니다.');
                    setEmailError(initialError);
                    return;
                  }
                  setEmailError({
                    error: true,
                    errorMsg: '중복되는 이메일입니다.',
                  });
                }}
              >
                <StRegisterValidationButtonTypo>
                  중복확인
                </StRegisterValidationButtonTypo>
              </StRegisterValidationButton>
            </StRegisterInputWithValidationButtonContainer>
            <StRegisterErrorMessage activated={emailError.error}>
              {emailError.errorMsg}
            </StRegisterErrorMessage>
          </StRegisterInputContainer>

          <StRegisterInputContainer>
            <StRegisterInputTitleContainer>
              <StRegisterInputInfo>비밀번호*</StRegisterInputInfo>
            </StRegisterInputTitleContainer>
            <StRegisterInput
              error={passwordError.error}
              errorBorder={ErrorBorder}
              onFocus={() => {
                setPasswordError({ error: false, errorMsg: '' });
              }}
              onChange={(e) => {
                onChangePassword(e);
                setPasswordError(validatePassword(e.target.value));
                setValidated(false);
              }}
              type="password"
              placeholder="비밀번호 입력"
              validation={false}
            />
            <StRegisterInput
              error={passwordConfirmError.error}
              errorBorder={ErrorBorder}
              onFocus={() => {
                setPasswordError({ error: false, errorMsg: '' });
                setPasswordConfirmError({ error: false, errorMsg: '' });
              }}
              onChange={(e) => {
                onChangePasswordConfirm(e);
                const errorResult = validatePasswordConfirm(
                  password,
                  e.target.value,
                );
                setPasswordConfirmError(errorResult);
                setPasswordError(errorResult);
                setValidated(false);
              }}
              type="password"
              placeholder="비밀번호 재입력"
              validation={false}
            />
            <StRegisterErrorMessage activated={passwordError.error}>
              {passwordError.errorMsg}
            </StRegisterErrorMessage>
          </StRegisterInputContainer>

          <StRegisterInputContainer>
            <StRegisterInputTitleContainer>
              <StRegisterInputInfo>닉네임*</StRegisterInputInfo>
              <StRegisterInputSubInfo>2~8자 이내</StRegisterInputSubInfo>
            </StRegisterInputTitleContainer>
            <StRegisterInputWithValidationButtonContainer>
              <StRegisterInput
                error={nicknameError.error}
                errorBorder={ErrorBorder}
                onFocus={() => {
                  setNicknameError({ error: false, errorMsg: '' });
                }}
                onChange={(e) => {
                  onChangeNickname(e);
                  setNicknameError(validateNickname(nickname));
                  setNicknameDupChecked(false);
                }}
                placeholder="닉네임 입력"
                validation={true}
              />
              <StRegisterValidationButton
                onClick={async () => {
                  const val = validateNickname(nickname);
                  if (val.error) {
                    setNicknameError(val);
                    return;
                  }
                  if (await nicknameDupCheck(nickname)) {
                    toast.success('사용가능합니다.');
                    setNicknameDupChecked(true);
                    setNicknameError(initialError);
                    return;
                  }
                  setNicknameError({
                    error: true,
                    errorMsg: '중복되는 닉네임입니다.',
                  });
                }}
              >
                <StRegisterValidationButtonTypo>
                  중복확인
                </StRegisterValidationButtonTypo>
              </StRegisterValidationButton>
            </StRegisterInputWithValidationButtonContainer>
            <StRegisterErrorMessage activated={nicknameError.error}>
              {nicknameError.errorMsg}
            </StRegisterErrorMessage>
          </StRegisterInputContainer>
        </StRegisterInputsContainer>

        <StRegiserButton
          validated={validated}
          unActivated={registerUnactivated}
          onClick={(e) => {
            joinUsHandler(e);
          }}
          loading={loading}
        >
          {loading ? (
            <StRegisterButtonTypo>
              가입중
              <img
                style={{ width: '15px', height: '15px' }}
                src="/images/loadingSpinner.svg"
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
  $mediawidth: number;
  mediaHeight: number;
}>`
  display: flex;
  padding: 40px 0px;
  width: ${(props) => 564 * (props.$mediawidth / 1920)}px;
  min-width: 350px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (max-width: 768px) {
    padding: 20px 0px;
  }
`;

const StRegisteContentsContainer = styled.div<{
  $mediawidth: number;
  mediaHeight: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => `${(360 * props.$mediawidth) / 1920}px`};
  min-width: 330px;
  @media (max-width: 768px) {
    width: 330px;
  }
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
  border-radius: 10px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
`;
const StRegisterInputSubInfo = styled.p`
  color: var(--achromatic-colors-gray-2, #999);
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
const StRegisterInput = styled.input<{
  validation: boolean;
  error: boolean;
  errorBorder: string;
}>`
  display: flex;
  height: 25px;
  ${(props) => (props.validation ? `width:100%;` : `width: calc(100% - 28px);`)}
  ${(props) =>
    props.error ? props.errorBorder : 'border: none;outline:none; '}
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--main-light-3, #f9f3ff);
  outline: none;
  padding: 10px 14px;
  &:focus {
    border: none;
    outline: none;
    padding: 10px 14px;
  }
`;
const StRegisterValidationButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 84px;
  height: 44px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--main-sub-1, #ffa8dc);
  border: none;
  &:focus {
    outline: none;
  }
`;
const StRegisterValidationButtonTypo = styled.p`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.225px;
  white-space: nowrap;
`;
const StRegiserButton = styled.button<{
  loading: boolean;
  validated: boolean;
  unActivated: string;
}>`
  ${(props) => (props.loading || !props.validated ? `` : `cursor:pointer;`)}
  ${(props) =>
    props.validated
      ? 'background: var(--main-sub-1, #FFA8DC);'
      : props.unActivated}

  display: flex;
  width: 100%;
  height: 44px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
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
const StRegisterErrorMessage = styled.p<{ activated: boolean }>`
  ${(props) => (props.accessKey ? `visibility: hidden` : '')}
  color: var(--error, #ff535d);
  font-family: Pretendard Variable;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.195px;
`;
export default LoginModalContents;
