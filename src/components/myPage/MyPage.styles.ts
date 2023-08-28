import { styled } from 'styled-components';

export const Profile = {
  BasicImage: styled.img`
    border-radius: 50%;
    width: 150px;
    height: auto;
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
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Button: styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100px;
    background-color: transparent;
    border-color: transparent;
  `,
};
