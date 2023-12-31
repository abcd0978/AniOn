import styled from 'styled-components';
export const E = {
  Page: styled.div`
    width:100%;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-top: -5%;
      margin-left: 5%;
      width: 90%;
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
      display: flex;
      align-items: center;
      font-size: 16px;
    }
  `,

  Container: styled.div`
    width: 100%;
  `,

  PhotoItem: styled.div`
    display: flex;
    align-items: center;
    padding: 3% 0%;
  `,
  PhotoSection: styled.div`
    width: 90%;
    // padding-left: 10%;
    // @media (max-width: 768px) {
    //   padding-left: 0%;
    // }
  `,
  PhotoAndExplain: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ShowBasicPhoto: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 768px) {
      gap: 1px;

      justify-content: center;
      flex-direction: column;
    }
  `,
  EtcItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    width: 100%;
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
    width: 100px;
  `,
  PhotoLabel: styled.div`
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    width: @media (max-width: 768px) {

    }
  `,

  Input: styled.input`
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: #f9f3ff;
    margin: 8px;
    @media (max-width: 768px) {
      display: flex;
      width: 150px;
      margin-bottom: 5px;
      gap: 10px;
      left: 50%;
    }
  `,
  CancelAndDone: styled.div`
    display: flex;
    gap: 10px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      gap: 10px;
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
  PhotoChangeButton: styled.button`
    background-color: #fdfbff;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: 1px solid var(--main-mid-2, #c88fff);
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
      gap: 8px;
      border-radius: 6px;
    }
  `,
  ChangeButton: styled.button`
    justify-content: flex-end;
    background-color: #fdfbff;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: 1px solid var(--main-mid-2, #c88fff);
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
      gap: 8px;
      border-radius: 6px;
    }
  `,
  ProfileEditContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  NickNameContainer: styled.div`
    width: 100%;
    display: flex;
  `,
  NickNameInputAndCheck: styled.div`
    display: flex;
    flex-direction: column;
  `,
  NickNameButtons: styled.div`
    align-items: center;
    display: flex;
    gap: 5px;
    @media (max-width: 768px) {
      align-items: center;
    }
  `,
  NickNameForm: styled.form`
    display: flex;
    justify-content: space-between;
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
      width: 76px;
      height: 30px;
      padding: 4px;
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
    top: 100%;
    left: 100%;
    margin-top: 5%;
    @media (max-width: 768px) {
      width: 200px;
    }
  `,
  TextBelowNickname: styled.div`
    color: #838383;
    font-size: 14px;
    margin-top: 8px;
    width: 400px;
    @media (max-width: 768px) {
      width: 170px;
    }
  `,
  Warning: styled.p`
    color: red;
  `,
  ButtonArray: styled.div`
    // max-width: 187px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: baseline;
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
    margin-top: 5px;
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
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
      margin-top: 0px;
    }
  `,
};
