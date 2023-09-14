import React, { useState, MouseEventHandler } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { useAtom, useSetAtom } from 'jotai';
import * as userStore from '../../store/userStore';
import * as modalStore from '../../store/modalStore';
import Modal from './Modal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [user] = useAtom(userStore.user);
  const setIsModalOpened = useSetAtom(modalStore.isModalOpened);

  const [, setModalContents] = useAtom(modalStore.modalContents);
  const navigate = useNavigate();
  const updatePasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (!error) {
        toast.success('비밀번호가 성공적으로 변경되었습니다!', {
          autoClose: 800,
        });
        navigate(`/`);
      } else {
        toast.warning('비밀번호 변경 중에 오류가 발생했습니다.', {
          autoClose: 800,
        });
      }
    } catch (error) {
      console.error('비밀번호 변경 중에 오류가 발생했습니다!!!!!!.', error);
    }
  };
  const handleCancelChangePassword = () => {
    setIsModalOpened(false);
    if (user?.id) {
      navigate(`/`);
    }
  };

  return (
    <Modal>
      <NewPasswordContainer>
        <NewPasswordTop>
          <CancelChangePassword onClick={handleCancelChangePassword}>
            {'<'}
          </CancelChangePassword>
          <SetPassword>비밀번호 재설정</SetPassword>
        </NewPasswordTop>

        <PasswordRule>비밀번호 재설정*</PasswordRule>
        <PasswordRule>
          비밀번호는 최소 6자리 이상이며, 영문자 혹은 숫자를 포함해야 합니다.
        </PasswordRule>
        <NewPasswordForm onSubmit={updatePasswordHandler}>
          <PasswordInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호 입력"
          />
          <PasswordInput
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="새 비밀번호 재입력"
          />
          <PostNewPassword type="submit">비밀번호 재설정</PostNewPassword>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </NewPasswordForm>
      </NewPasswordContainer>
    </Modal>
  );
};

export default NewPassword;
const NewPasswordContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const NewPasswordTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 25%;
  margin-top: -10%;
  margin-bottom: 10%;
`;
const SetPassword = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
`;
const PasswordRule = styled.div`
  color: var(--achromatic-colors-black, #191919);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
`;
const PasswordInput = styled.input`
  border-radius: 10px;
  background: var(--main-light-3, #f9f3ff);
  display: flex;
  height: 34px;
  padding: 8px 10px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-color: transparent;
  color: #838383;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.21px;
`;
const PostNewPassword = styled.button`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-color: transparent;
  border-radius: 10px;
  background: var(--sub-1, #ff96db);
  cursor: pointer;
  color: var(--achromatic-colors-white, #fff);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.225px;
`;
const CancelChangePassword = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
`;
const NewPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
