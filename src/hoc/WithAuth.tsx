import React, { FC, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useAtom, useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
/**
 *
 * @param Component 컴포넌트
 * @param option true:로그인해야함, false:로그인안해야함, null:상관없음
 * @param adminRoute 어드민페이지(아직은 사용안할듯)
 * @returns 컴포넌트리턴
 */
const WithAuth = (
  Component: React.ComponentType,
  option: boolean | null,
  adminRoute: boolean | null = null,
) => {
  const writeUser = useSetAtom(userStore.writeUser);
  console.log('few');
  async function authCheck() {
    await writeUser();
  }
  useEffect(() => {
    if (option !== undefined && Component) authCheck();
  }, []);
  return <Component />;
};

export default WithAuth;
