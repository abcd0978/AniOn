import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import topButton from '../../assets/topButton.svg';

const ScrollToTop = () => {
  const [isShowButton, setIsShowButton] = useState(false);

  // 스크롤을 위로 이동시키는 함수.
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // 스크롤이 500이상 내려가면 버튼 활성화.
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setIsShowButton(true);
      } else {
        setIsShowButton(false);
      }
    };

    // scroll에 이벤트 추가, 컴포넌트 언마운트시 이벤트 삭제.
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return isShowButton ? (
    <StScrollBox>
      <StScrollButton src={topButton} onClick={scrollToTop}></StScrollButton>
    </StScrollBox>
  ) : (
    <></>
  );
};

export default ScrollToTop;

const StScrollBox = styled.div`
  position: fixed;
  right: 3%;
  bottom: 3%;
  z-index: 1;
`;

const StScrollButton = styled.img`
  outline: none;
  cursor: pointer;
`;
