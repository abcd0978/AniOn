import React, { useState } from 'react';
import styled from 'styled-components';
import checkBox from '../../assets/checkBox.svg';
import checkBoxChecked from '../../assets/checkBoxChecked.svg';
import useViewport from '../../hooks/useViewPort';
import { useAtom } from 'jotai';
import useInput from '../../hooks/useInput';
import * as authApi from '../../api/auth';
import * as userStore from '../../store/userStore';
import google from '../../assets/google.svg';
import kakao from '../../assets/kakao.svg';
import github from '../../assets/github.svg';
import discord from '../../assets/discord.svg';
import * as modalStore from '../../store/modalStore';
import loadingSpinner from '../../assets/loadingSpinner.svg';
import horizontalLineForLoginModal from '../../assets/horzontalLineForLoginModal.svg';
type Props = {};
enum AuthProvider {
  Google = 'google',
  Kakao = 'kakao',
  GitHub = 'github',
  Discord = 'discord',
}
const LoginModalContents = (props: Props) => {
  const [email, setEmail, onChangeEmail, resetEmail] = useInput('');
  const [password, setPassword, onChangePassword, resetPassword] = useInput('');
  const [checked, setChecked] = useState(false);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const [isModalOpened, setIsModalOpened] = useAtom(modalStore.isModalOpened);
  const [__, writeUser] = useAtom(userStore.writeUser);
  const [loading, setLoading] = useState(false);
  const { width, height, isMobile, isLoaded } = useViewport();
  const validationFunc = (e: any) => {
    e.preventDefault();
    return;
  };
  return (
    <StLoginContainer mediaWidth={width} mediaHeight={height}>
      <StLoginUpperContents>
        <StLoginInfoContainer>
          <StLoginInfoLogo mediaWidth={width}>로고</StLoginInfoLogo>
          <StLoginInfoTypo mediaWidth={width}>
            다양한 애니메이션 팬들과 소통해보세요!
          </StLoginInfoTypo>
        </StLoginInfoContainer>
        <StLoginInputContainer mediaWidth={width}>
          <StLoginInput
            onChange={onChangeEmail}
            placeholder="EMAIL"
            mediaWidth={width}
          />
          <StLoginInput
            type="password"
            onChange={onChangePassword}
            placeholder="PASSWORD"
            mediaWidth={width}
          />
          <StLoginCheckBoxContianer>
            <StLoginCheckBoxContents>
              <StLoginCheckBox onClick={() => setChecked(!checked)}>
                <img
                  src={checked ? checkBoxChecked : checkBox}
                  alt="checkBox"
                />
              </StLoginCheckBox>
              <StLoginCheckBoxTypo>로그인유지</StLoginCheckBoxTypo>
            </StLoginCheckBoxContents>
          </StLoginCheckBoxContianer>
          <StLoginButton
            onClick={async (e) => {
              validationFunc(e);
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
                writeUser();
                setIsModalOpened(false);
              }
            }}
          >
            {loading ? (
              <StLoginButtonTypo>
                로그인중
                <img
                  style={{ width: '15px', height: '15px' }}
                  src={loadingSpinner}
                  alt="스피너"
                />
              </StLoginButtonTypo>
            ) : (
              <StLoginButtonTypo>로그인</StLoginButtonTypo>
            )}
          </StLoginButton>
        </StLoginInputContainer>
        <StLoginOptions mediaWidth={width}>
          <StLoginOptionsTypo
            onClick={() => setModalContents('findId')}
            mediaWidth={width}
          >
            아이디찾기
          </StLoginOptionsTypo>
          <StLoginOptionsTypo
            onClick={() => setModalContents('findPass')}
            mediaWidth={width}
          >
            비밀번호 찾기
          </StLoginOptionsTypo>
          <StLoginOptionsTypo
            onClick={() => setModalContents('register')}
            mediaWidth={width}
          >
            회원가입
          </StLoginOptionsTypo>
        </StLoginOptions>
      </StLoginUpperContents>
      <StLoginDownerContents>
        <StLoginDownerTitleContainer>
          <StLoginDownerTitlehorizontalLine
            mediaWidth={width}
            src={horizontalLineForLoginModal}
          />
          SNS계정으로 로그인
          <StLoginDownerTitlehorizontalLine
            mediaWidth={width}
            src={horizontalLineForLoginModal}
          />
        </StLoginDownerTitleContainer>
        <StLoginDownerLoginOptionContainer mediaWidth={width}>
          <StLoginDownerLoginOption
            src={discord}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Discord);
            }}
            mediaWidth={width}
            alt="디스코드"
          />
          <StLoginDownerLoginOption
            src={github}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.GitHub);
            }}
            mediaWidth={width}
            alt="깃헙"
          />
          <StLoginDownerLoginOption
            src={google}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Google);
            }}
            mediaWidth={width}
            alt="구글"
          />
          <StLoginDownerLoginOption
            src={kakao}
            onClick={async () => {
              await authApi.loginHandler(undefined, true, AuthProvider.Kakao);
            }}
            mediaWidth={width}
            alt="카카오"
          />
        </StLoginDownerLoginOptionContainer>
      </StLoginDownerContents>
    </StLoginContainer>
  );
};

const StLoginContainer = styled.div<{
  mediaWidth: number;
  mediaHeight: number;
}>`
  display: flex;
  padding: 40px 0px;
  width: ${(props) => 564 * (props.mediaWidth / 1920)}px;
  min-width: 400px;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => 80 * (props.mediaHeight / 1080)}px;
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
const StLoginInfoLogo = styled.div<{ mediaWidth: number }>`
  color: #000;
  font-family: Roboto;
  font-size: max(${(props) => 28 * (props.mediaWidth / 1920)}px, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 142.857%; /* 142.857% */
`;
const StLoginInfoTypo = styled.div<{ mediaWidth: number }>`
  color: var(--achromatic-colors-dark-gray, #4f4f4f);
  text-align: center;
  font-family: Pretendard Variable;
  font-size: max(${(props) => 20 * (props.mediaWidth / 1920)}px, 15px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.3px;
`;
const StLoginInputContainer = styled.div<{ mediaWidth: number }>`
  display: flex;
  width: 312px;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const StLoginInput = styled.input<{ mediaWidth: number }>`
  display: flex;
  height: ${(props) => 44 * (props.mediaWidth / 1920)}px;
  padding: 8px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: #f5f5f5;
  border: none;
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
  font-family: Pretendard Variable;
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
  align-items: center;
  gap: 8px;
  background: #838383;
  cursor: pointer;
`;
const StLoginButtonTypo = styled.p`
  color: var(--achromatic-colors-white, #fff);
  font-family: Pretendard Variable;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.225px;
`;
const StLoginOptions = styled.div<{ mediaWidth: number }>`
  display: flex;
  width: ${(props) => 390 * (props.mediaWidth / 1920)}px;
  padding: 0px 60px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const StLoginOptionsTypo = styled.p<{ mediaWidth: number }>`
  color: var(--achromatic-colors-dark-gray, #4f4f4f);
  font-family: Pretendard Variable;
  font-size: ${(props) => 13 * (props.mediaWidth / 1920)}px;
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
const StLoginDownerTitlehorizontalLine = styled.img<{ mediaWidth: number }>`
  width: ${(props) => 81.913 * (props.mediaWidth / 1920)}px;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 0.6px;
  stroke: var(--achromatic-colors-gray-2, #999);
`;
const StLoginDownerLoginOptionContainer = styled.div<{ mediaWidth: number }>`
  display: flex;
  width: 390px;
  padding: 0px 60px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const StLoginDownerLoginOption = styled.img<{ mediaWidth: number }>`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  cursor: pointer;
`;
export default LoginModalContents;
