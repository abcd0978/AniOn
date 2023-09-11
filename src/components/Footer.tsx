import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import useViewport from '../hooks/useViewPort';

const Footer = () => {
  const { isMobile } = useViewport();
  return (
    <Stfooter>
      <StFooterTop>
        <StFooterLogo>
          <StImg src={logo} alt="로고" />
        </StFooterLogo>
        <StFooterBlank></StFooterBlank>
      </StFooterTop>
      {isMobile ? (
        <StFooterBottom>
          <StFooterLeft>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <br />
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                "일본 애니메이션 종합 커뮤니티 플랫폼"
              </div>
              <br />
              일본 애니메이션 입문자, 중급자 등 팬들을 위한
              <br />
              최고의 온라인 세상이 여기에 있어요!
              <br />
              우리의 종합 애니메이션 커뮤니티 플랫폼을 소개합니다!
            </div>
          </StFooterLeft>
          <StFooterRight>
            <div>
              상표 : 상표명 | 리더 : 이소영 | 부리더 : 정송주
              <br />
              디자이너 : 김예림| 팀원:김무겸, 김민규, 박은희
            </div>
            <div>
              전화 : 1522-0816
              <br />
              주소 : 서울특별시 강남구 테헤란로44길 12층
              <br />
            </div>
            Copyright 2023 ⓒ Yerim Kim. All right reserved.
          </StFooterRight>
        </StFooterBottom>
      ) : (
        <StFooterBottom>
          <StFooterLeft>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <br />
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                "일본 애니메이션 종합 커뮤니티 플랫폼"
              </div>
              <br />
              일본 애니메이션 입문자, 중급자 등 팬들을 위한 최고의 온라인 세상이
              여기에 있어요! <br /> 우리의 종합 애니메이션 커뮤니티 플랫폼을
              소개합니다!
            </div>
          </StFooterLeft>
          <StFooterRight>
            <br />
            상표 : 상표명 | 리더 : 이소영 | 부리더 : 정송주 | 디자이너 : 김예림
            | 팀원:김무겸, 김민규, 박은희
            <br />
            전화 : 1522-0816 | 주소 : 서울특별시 강남구 테헤란로44길 12층
            <br />
            Copyright 2023 ⓒ Yerim Kim. All right reserved.
          </StFooterRight>
        </StFooterBottom>
      )}
    </Stfooter>
  );
};
export default Footer;

const Stfooter = styled.div`
  width: 100vw;
  background-color: #f9f3ff;
  display: flex;
  flex-direction: column;
  margin-left: calc(-50vw + 50%);
  position: relative;
  transform: translatY(-100%);
  margin-top: auto;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    width: 100vw;
    box-sizing: border-box;
    border-left: 12px solid #f9f3ff;
    border-right: 12px solid #f9f3ff;
  }
`;

const StFooterTop = styled.div`
  width: 100%;

  background-color: #f9f3ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StFooterLogo = styled.div`
  width: 35%;
  margin-top: 20px;
`;

const StFooterBlank = styled.div`
  width: 35%;
`;
const StImg = styled.img`
  width: 120px;
  height: 34px;
`;

const StFooterBottom = styled.div`
  width: 100%;

  background-color: #f9f3ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;
const StFooterLeft = styled.div`
  font-size: 15px;
  width: 35%;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
`;
const StFooterRight = styled.div`
  font-size: 15px;
  width: 35%;
  line-height: 2;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 14px;
    width: 100%;
    justify-content: flex-start;
  }
`;
