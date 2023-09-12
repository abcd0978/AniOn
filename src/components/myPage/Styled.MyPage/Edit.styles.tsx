import styled from 'styled-components';
export const E = {
  Page: styled.div`
    margin-top: -700px;
    margin-left: 450px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-left: 10px;
      margin-top: -20px;
    }
  `,
  Title: styled.div`
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,

  Container: styled.div``,

  PhotoItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-top: 12px;
    padding-bottom: 90px;
    gap: 8px;
    display: flex;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      height: 200px;
      padding-top: 12px;
      padding-bottom: 12px;
      gap: 8px;
    }
  `,

  EtcItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 64px;
    padding-top: 12px;
    padding-bottom: 12px;
    gap: 8px;
    @media (max-width: 768px) {
      height: auto;
    }
  `,

  Label: styled.div`
    font-size: 16px;
    font-weight: bold;
    width: 70px;
  `,

  Input: styled.input`
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: #f9f3ff;
    @media (max-width: 768px) {
      display: flex;
      width: 150px;
      margin-bottom: 5px;
      gap: 10px;
      left: 50%;
    }
  `,
  CancelAndDone: styled.div`
    @media (max-width: 768px) {
      display: flex;
      gap: 10px;
      left: 50%;
    }
  `,
  CancelButton: styled.button`
    right: 80px;
    background-color: #dbdbdb;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: transparent;
    cursor: pointer;
    @media (max-width: 768px) {
      display: flex;
      width: 60px;
      height: 24px;
      padding: 4px 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
    }
  `,
  DoneButton: styled.button`
    right: -5px;
    background-color: #8200ff;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: transparent;
    color: #fff;
    cursor: pointer;
    @media (max-width: 768px) {
      display: flex;
      width: 60px;
      height: 24px;
      padding: 4px 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
    }
    &:disabled {
      background-color: white;
      color: #cccccc;
      cursor: not-allowed;
    }
    &:hover {
      background-color: #c88fff;
      color: white;
    }
  `,
  ChangeButton: styled.button`
    background-color: #fdfbff;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: 1px solid var(--main-mid-2, #c88fff);
    right: -5px;
    color: #000;
    cursor: pointer;

    &:hover {
      background-color: #c88fff;
      color: white;
    }
    @media (max-width: 768px) {
      display: flex;
      width: 60px;
      height: 24px;
      padding: 4px 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
    }
  `,
  NickNameContainer: styled.div`
    align-items: center;
    padding-left: 50px;
  `,
  NickNameInputAndCheck: styled.div`
    display: flex;
  `,
  NickNameButtons: styled.div`
    align-items: center;
    display: flex;
    gap: 5px;
  `,
  NickNameCheck: styled.button`
    margin-left: 10px;
    background-color: #ff96db;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border-color: transparent;
    cursor: pointer;

    color: #fff;
    &:disabled {
      background-color: white;
      color: #cccccc;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      display: flex;
      width: auto;
      height: 30px;
      padding: 4px 14px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      margin-left: 5px;
    }
  `,

  TextBelowPhoto: styled.div`
    color: #838383;
    font-size: 14px;
    margin-top: 20%;
    margin-left: -130px;
    width: 400px;
    @media (max-width: 768px) {
      margin-top: 60%;
      margin-left: -100px;
    }
  `,
  TextBelowNickname: styled.div`
    color: #838383;
    font-size: 14px;
    margin-top: 8px;
    width: 400px;
  `,
  Warning: styled.p`
    color: red;
  `,
  ButtonArray: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
      display: flex;
    }
  `,
  HiddenFileInput: styled.input.attrs({ type: 'file' })`
    display: none;
  `,
  StyledLabel: styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border-radius: 10px;
    border: 1px solid var(--achromatic-colors-midgray-2, #dbdbdb);
    background: var(--achromatic-colors-white, #fff);
    width: 79px;
    height: 24px;
    color: black;
    cursor: pointer;
    padding: 4px;
    @media (max-width: 768px) {
      width: 60px;
      height: 24px;

      border-radius: 6px;
    }
    &:hover {
      background-color: #dbdbdb;
      color: black;
    }
  `,
  FileSelectContainer: styled.div`
    margin-top: 250px;
    margin-left: -130px;
    @media (max-width: 768px) {
      margin-top: 0px;
      margin-left: 0px;
    }
  `,
};
