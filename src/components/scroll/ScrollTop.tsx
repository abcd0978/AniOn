//페이지 이동 시 상단으로 가는 컴포넌트
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
