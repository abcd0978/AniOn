import { styled } from 'styled-components';
import { EditButton, EditButtonIcon } from './MyInfoMenu';
export const Profile = {
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
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.48px;
    margin-top: 20px;
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
  MyContainer: styled.div`
    border-radius: 20px;
    background: #fdfbff;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 800px;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 200px;
  `,
  MyProfileContainer: styled.div`
    display: grid;
    place-items: center;
    justify-contents: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
  `,
};

export const InfoMenu = {
  FullScreen: styled.div`
    display: flex;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  EditMenu: styled.div``,
  DecoButton: styled.button`
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
    margin-bottom: 10px;
    cursor: pointer;
  `,
  DecoButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
  LikedButton: styled.button`
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
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  `,
  LikedButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
  ReviewButton: styled.button`
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
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  `,
  ReviewButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
  WriteButtonContainer: styled.button`
    width: 150px;
    background-color: transparent;
  `,
  WriteButton: styled.button`
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
    margin-bottom: 10px;
    cursor: pointer;
  `,
  WriteButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
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
};

export const MyAward = {
  MyProfileAward: styled.div`
    display: flex;
    width: auto;
    height: 28px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border: 1px solid #d9d9d9;
    margin-top: 20px;
    margin-bottom: 20px;
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
