import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import useViewport from '../hooks/useViewPort';

const Footer = () => {
  const { width } = useViewport();
  return (
    <Stfooter width={width}>
      <StFooterInner>
        <StFooterLeft>
          <StImg src={logo} alt="로고" />
          <br />
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            "일본 애니메이션 종합 커뮤니티 플랫폼"
          </div>
          <br />
          일본 애니메이션 입문자, 중급자 등 팬들을 위한 최고의 온라인 세상이
          여기에 있어요! <br /> 우리의 종합 애니메이션 커뮤니티 플랫폼을
          소개합니다!
        </StFooterLeft>
        <StFooterRight>
          <br />
          상표 : 상표명 | 리더 : 이소영 | 부리더 : 정송주 |디자이너 : 김예림 |
          팀원:김무겸, 김민규, 박은희
          <br />
          전화 : 1522-0816 | 주소 : 서울특별시 강남구 테헤란로44길 12층
          <br />
          Copyright 2023 ⓒ Yerim Kim. All right reserved.
        </StFooterRight>
      </StFooterInner>
    </Stfooter>
  );
};
export default Footer;

const Stfooter = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 170px;
  background-color: #f9f3ff;
  display: flex;
  flex-direction: row;
  margin-left: calc(-50vw + 50%);
  position: relative;
  transform: translatY(-100%);
  margin-top: auto;
`;
const StFooterInner = styled.div`
  width: 90%;
  height: 170px;
  background-color: #f9f3ff;
  display: flex;
  flex-direction: row;
`;
const StFooterLeft = styled.div`
  font-size: 15px;
  width: 50%;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  margin-left: 300px;
  margin-top: 12px;
`;
const StFooterRight = styled.div`
  font-size: 15px;
  width: 50%;
  line-height: 2.5;
  display: flex;
  justify-content: flex-end;
  margin-top: 23px;
  margin-right: 40px;
`;
const StImg = styled.img`
  width: 120px;
  height: 34px;
`;
