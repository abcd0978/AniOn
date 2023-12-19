import { styled } from 'styled-components';
interface OuterProps {
  selectedComponent: string | null;
}
export const Profile = {
  MyPageConainer: styled.div`
    display: flex;
    margin: 0 auto;
    padding-bottom: 10%;

    justify-content: space-between;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      padding-bottom: 100%;
    }
  `,
  // 내 프로필 전체 박스
  MyContainer: styled.div`
    border-radius: 20px;
    background: #fdfbff;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
    width: 28%;
    height: auto;
    @media (max-width: 768px) {
      width: 100%;
      background: transparent;
      border: none;
      box-shadow: none;
    }
  `,
  // 내 프로필: 사진, 닉네임, 칭호, 포인트
  MyProfileContainer: styled.div`
    display: grid;
    place-items: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 10%;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      align-items: center;
      border-radius: 20px;
      box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
      margin-bottom: 10%;
      padding-bottom: 5%;
      width: 100%;
    }
  `,
  BasicImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
  `,
  EditImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
  `,
  MyPageText: styled.div`
    color: #8200ff;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.48px;
    margin: 30px 0px 40px 5px;
    @media (max-width: 768px) {
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.3px;
      margin-top: 10px;
    }
  `,
  MyNickname: styled.div`
    width: auto;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    justify-contents: center;
    align-items: center;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-top: 8%;
    font-size: 24px;
    @media (max-width: 1280px) {
      font-size: 20px;
    }
    @media (max-width: 768px) {
      font-size: 20px;
      letter-spacing: -0.3px;
    }
  `,
  MobileInfo: styled.div`
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      margin-top: 5%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `,
  MyMobilePhoto: styled.div`
    display: block;
    @media (max-width: 768px) {
      margin-left: 0%;
      margin-right: 10%;
    }
  `,
  MyMobileInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (max-width: 1280px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
};
export const MyAward = {
  MyProfileAward: styled.div`
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
    }
  `,
  AwardImg: styled.img`
    width: 80%;
    height: auto;
    @media (max-width: 768px) {
      width: 140px;
      height: 25px;
    }
  `,
  NoAward: styled.div`
    display: flex;
    height: 32px;
    width: 172px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 999px;
    background: #f4f4f4;
    font-size: 15px;
    border: 1px solid #dbdbdb;
  `,
};
export const MyProfilePoint = {
  RenderPoint: styled.div`
    display: flex;
    width: 106px;
    padding: 8px;
    align-items: center;
    gap: 8px;
    background: #d9d9d9;
  `,
};

export const InfoMenu = {
  FullScreen: styled.div`
    width: 70%;
    display: flex;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  Button: styled.button`
    padding: 2%;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 5%;

    gap: 8px;
    width: auto;
    background-color: transparent;
    border-color: transparent;
    color: #838383;
    text-align: center;
    font-size: 100%;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
    @media (max-width: 768px) {
      font-size: 16px;
      align-items: center;
      margin-left: 10%;
      margin-top: 5%;
    }
  `,
  BackButton: styled.button`
    cursor: pointer;
    display: none;
    width: auto;
    background-color: transparent;
    border-color: transparent;
    color: #838383;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
    z-index: 3;
    @media (max-width: 768px) {
      display: flex;
    }
  `,

  ButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
  // 회원탈퇴, 로그아웃
  InfoButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
    margin-bottom: 15%;
    width: auto;
    transform: translatex(-20px);
    @media (max-width: 768px) {
      margin-left: 0%;
    }
  `,
  InfoButton: styled.button`
    background-color: transparent;
    border: transparent;
    color: #999;
    width: auto;
    cursor: pointer;
  `,
  Outer: styled.div<OuterProps>`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    padding-bottom: 5%;
    padding-top: 10%;
    padding-left: 10%;
    @media (max-width: 768px) {
      height: 60%;
      background: #fdfbff;
      width: 100%;
      padding-top: 32px;
      padding-left: 20 px;
      margin-top: 10 px;
      padding-left: 0%;

      background-color: ${(props) =>
        props.selectedComponent ? 'transparent' : '#fdfbff'};
      box-shadow: ${(props) =>
        props.selectedComponent
          ? 'none'
          : ' 0px 0px 25px 0px rgba(0, 0, 0, 0.1)'};
      border-radius: 20px;
    }
    @media (max-width: 480px) {
    }
    @media (max-width: 400px) {
    }
  `,
};
// divider
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--achromatic-colors-midgray-2, #dbdbdb);
  margin-top: 8px;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    width: auto;
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;
