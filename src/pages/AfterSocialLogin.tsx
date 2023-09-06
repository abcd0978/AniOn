import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
type Props = {};

function AfterSocialLogin({}: Props) {
  const writeUser = useSetAtom(userStore.writeUser);
  const navigate = useNavigate();
  async function authCheck() {
    await writeUser();
    toast.success('안녕하세요! 환영합니다😊', {
      autoClose: 800,
    });
  }
  useEffect(() => {
    authCheck();
  }, []);
  return <Loading />;
}

export default AfterSocialLogin;
