import React, { FC, useEffect } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
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
  adminRoute: boolean | null = null
) => {
  useEffect(() => {
    const setUserInfo = async () => {
      const session = await supabase.auth.getSession();
      console.log(session);
    };
    setUserInfo();
    if (option) {
    } else if (option === false) {
    } else if (option === null) {
    }
  }, []);
  return <Component />;
};

export default WithAuth;
