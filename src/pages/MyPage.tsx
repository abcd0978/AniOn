import React, { useContext } from 'react';
import MyProfile from '../components/myPage/MyProfile';
import MyInfoMenu from '../components/myPage/MyInfoMenu';
import { Profile } from '../components/myPage/Styled.MyPage/MyPage.styles';
import { styled } from 'styled-components';
import MyInfoMenuMobile from '../components/myPage/MobileMenu';
import { ViewportContext } from '../components/ViewportContext';

interface Props {
  viewport?: number;
}

const MyPage = ({ viewport }: Props) => {
  const { width, height } = useContext(ViewportContext);
  return (
    <MyPageConainer>
      <Profile.MyPageText> 마이페이지</Profile.MyPageText>
      <Profile.MyContainer>
        <MyProfile />
        {width <= 768 ? <MyInfoMenuMobile /> : <MyInfoMenu />}
      </Profile.MyContainer>
    </MyPageConainer>
  );
};

export default MyPage;

const MyPageConainer = styled.div`
  margin: 0 auto;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    width: auto;
    height: auto;
  }
`;
