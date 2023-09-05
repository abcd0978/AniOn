import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type Props = {};

function AfterSocialLogin({}: Props) {
  const writeUser = useSetAtom(userStore.writeUser);
  const navigate = useNavigate();
  async function authCheck() {
    await writeUser();
    toast.success('로그인 되었습니다! 메인페이지로 이동합니다...');
    navigate('/');
  }
  useEffect(() => {
    authCheck();
  }, []);
  return <div>유저 정보를 입력중...</div>;
}

export default AfterSocialLogin;
