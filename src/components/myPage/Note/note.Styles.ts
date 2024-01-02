import styled from 'styled-components';
export const S = {
  Container: styled.div`
    width: 100%;
  `,

  Title: styled.div`
    font-size: 24px;
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
      font-size: 16px;
      font-weight: bold;
    }
  `,

  NoteButton: styled.button`
    width: 100px;
    height: 36px;
    border-radius: 20px;
    background-color: #f3e7ff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 8px;
    margin-right: 3px;

    &:hover {
      background-color: #8200ff;
      color: white;
    }

    @media (max-width: 768px) {
      width: 72px;
      height: 28px;
    }
  `,

  SendButton: styled.button`
    width: 100px;
    height: 36px;
    border-radius: 20px;
    background-color: rgb(255, 235, 247);
    border: none;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 8px;

    &:hover {
      background-color: rgb(255, 180, 239);
      color: white;
    }
    @media (max-width: 768px) {
      width: 72px;
      height: 28px;
    }
  `,

  InfoMenu: styled.button`
    width: 70%;
    display: flex;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,
};
