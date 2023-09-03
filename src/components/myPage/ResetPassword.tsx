import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtom } from 'jotai';

const PasswordReset = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user] = useAtom(userStore.user);

  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (user && user.email) {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);

      if (error) {
        console.error('Error password reset:', error.message);
        setErrorMessage(error.message);
      } else {
        setEmailSent(true);
      }
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      {emailSent ? (
        <p>이메일로 전송된 링크를 확인해주세요.</p>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <button type="submit">재설정 링크 전송</button>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
