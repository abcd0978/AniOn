import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtom } from 'jotai';
import { useSetAtom } from 'jotai';
const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useAtom(userStore.user);
  const writeUser = useSetAtom(userStore.writeUser);

  const handlePasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error('Error password reset:', error.message);
    } else {
      setEmailSent(true);
    }
  };

  return (
    <div>
      {emailSent ? (
        <p>이메일로 전송된 링크를 확인해주세요.</p>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <button type="submit">재설정 링크 전송</button>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
