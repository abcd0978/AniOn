import { styled } from 'styled-components';
export const Profile = {
  // 내 프로필 전체 박스
  MyContainer: styled.div`
    border-radius: 20px;
    background: #fdfbff;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 850px;
    padding: 20px;
    margin-top: 40px;
  `,
  // 내 프로필: 사진, 닉네임, 칭호, 포인트
  MyProfileContainer: styled.div`
    display: grid;
    place-items: center;
    justify-contents: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
  `,
  BasicImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  `,
  MyPageText: styled.div`
    color: #8200ff;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.48px;
    margin-top: 32px;
  `,
  MyNickname: styled.div`
    width: auto;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-top: 8px;
  `,
};
export const MyAward = {
  MyProfileAward: styled.div`
    display: flex;
    width: 280px;
    height: auto;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    margin-bottom: 20px;
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
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    background: #d9d9d9;
    margin-bottom: 20px;
  `,
};

export const InfoMenu = {
  FullScreen: styled.div`
    display: flex;
  `,
  Button: styled.button`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 170px;
    background-color: transparent;
    border-color: transparent;
    color: #838383;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
  `,

  ButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
  // 회원탈퇴, 로그아웃
  InfoButtonContainer: styled.div`
    display: flex;
    margin-left: 25px;
    margin-top: 70px;
  `,
  InfoButton: styled.button`
    background-color: transparent;
    border: transparent;
    color: #999;
    width: 60px;
    cursor: pointer;
  `,
  Outer: styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    margin-left: 30px;
    margin-top: 18px;
  `,
};
// divider
export const Divider = styled.div`
  width: 900px;
  height: 1px;
  background: var(--achromatic-colors-midgray-2, #dbdbdb);
  margin-top: 8px;
  margin-bottom: 8px;
`;
