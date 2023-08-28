import { styled } from 'styled-components';
import hoverbadge from '../../assets/badge.png';
import hoverdeco from '../../assets/palette (1).png';
import hoverreview from '../../assets/rate_review (1).png';
import hoverwrite from '../../assets/edit_note (1).png';
import hoverfavorite from '../../assets/favorite (1).png';
export const Profile = {
  BasicImage: styled.img`
    border-radius: 50%;
    width: 120px;
    height: auto;
  `,
  MyPageText: styled.div`
    color: #000;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.48px;
  `,
  MyNickname: styled.div`
    margin-left: 30px;
    widht: 120px;
  `,
};
export const EditProfile = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  Label: styled.div`
    font-size: 16px;
    font-weight: bold;
  `,

  Input: styled.input`
    padding: 8px;
    border-radius: 4px;
    border: none;
  `,

  Button: styled.button`
    padding: 8px;
    border-radius: 4px;
    border: none;
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
  EditButton: styled.button`
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
    &:hover {
      color: #000;
    }
  `,
  EditButtonIcon: styled.img`
    height: 36px;
    width: 36px;
  `,
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
    &:hover {
      color: #000;
    }
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
  `,
  WriteButtonIcon: styled.img`
    height: 36px;
    width: 36px;
    &:hover {
      background-image: url(${hoverwrite});
    }
  `,
};
