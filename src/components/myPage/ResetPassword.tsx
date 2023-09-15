import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtom } from 'jotai';
import { styled } from 'styled-components';
const PasswordReset = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user] = useAtom(userStore.user);
  const [sendingEmail, setSendingEmail] = useState(false);
  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (user && user.email) {
      setSendingEmail(true);
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: 'https://ani-on.vercel.app/newPassword/:user_id',
      });

      if (error) {
        console.error('Error password reset:', error.message);
        setErrorMessage('이메일은 60초에 한 번 전송 가능합니다.');
      } else {
        setEmailSent(true);
      }
      setSendingEmail(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {errorMessage && <p>{errorMessage}</p>}

      {emailSent ? (
        <p>이메일로 전송된 링크를 확인해주세요.</p>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <ResetButton type="submit">
            {sendingEmail ? '보내는 중...' : '재설정 링크 전송'}
          </ResetButton>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;

const ResetButton = styled.button`
  background-color: #fdfbff;
  border-radius: 12px;
  width: auto;
  height: 32px;
  border: 1px solid var(--main-mid-2, #c88fff);
  position: relative;
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: #c88fff;
    color: white;
  }
`;
