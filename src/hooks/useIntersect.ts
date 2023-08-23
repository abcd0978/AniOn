import { useCallback, useEffect, useRef } from 'react';

// Intersection Observer 콜백 함수 타입 정의
type IntersectHandler = (
  entry: IntersectionObserverEntry, // 관찰된 엔트리(요소) 정보
  observer: IntersectionObserver, // Intersection Observer 자체
) => void;

// 커스텀 훅 useIntersect 정의
const useIntersect = (
  onIntersect: IntersectHandler, // 화면에 나타날 때 실행할 콜백 함수
  options?: IntersectionObserverInit, // Intersection Observer의 옵션 (선택 사항)
) => {
  const ref = useRef<HTMLDivElement>(null); // React의 useRef 훅을 사용하여 DOM 요소에 대한 참조를 생성

  // Intersection Observer 콜백 함수를 생성
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        // 엔트리가 화면에 나타날 때 실행할 콜백 함수 호출
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect], // 콜백 함수가 업데이트되면 재생성
  );

  // 컴포넌트 렌더링 및 업데이트 시 실행될 부수 효과
  useEffect(() => {
    if (!ref.current) return; // 요소 참조가 없으면 아무 작업도 수행하지 않음

    // Intersection Observer 생성 및 설정
    const observer = new IntersectionObserver(callback, options);

    // 요소를 관찰 대상으로 추가
    observer.observe(ref.current);

    // 컴포넌트가 언마운트되면 옵저버 연결 해제
    return () => observer.disconnect();
  }, [ref, options, callback]); // ref, options, callback이 변경될 때마다 재실행

  // 요소의 참조를 반환하여, 해당 요소를 화면에 나타남 여부를 감시할 수 있게 함
  return ref;
};

export default useIntersect; // useIntersect 훅을 내보내기
