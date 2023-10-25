import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import React from 'react';
interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}

export default function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  const user = useAtomValue(userStore.user);
  if (authentication) {
    if (!user) {
      return <Navigate to="/" />;
    }
  } else {
    if (user) {
      return <Navigate to="/" />;
    }
  }
  return <Outlet />;
}
