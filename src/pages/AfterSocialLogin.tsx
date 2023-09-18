import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { toast } from 'react-toastify';
import Loading from '../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

function AfterSocialLogin() {
  const naviagate = useNavigate();
  const writeUser = useSetAtom(userStore.writeUser);
  const authCheck = async () => {
    await writeUser();
    toast.success('안녕하세요! 환영합니다😊', {
      autoClose: 800,
    });
  };
  useEffect(() => {
    authCheck();
    naviagate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Loading />;
}

export default AfterSocialLogin;
