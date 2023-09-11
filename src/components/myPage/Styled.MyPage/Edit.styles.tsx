import styled from 'styled-components';
export const E = {
  Page: styled.div`
    position: relative;
    top: -85vh;
    left: 25vw;
  `,
  Title: styled.div`
    position: relative;
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
  `,

  Container: styled.div`
    position: absolute;
  `,

  PhotoItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-top: 12px;
    padding-bottom: 90px;
    gap: 8px;
  `,

  EtcItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 64px;
    padding-top: 12px;
    padding-bottom: 12px;
    gap: 8px;
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
  `,
  CancelButton: styled.button`
    position: absolute;
    right: 80px;
    background-color: #dbdbdb;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: transparent;
    cursor: pointer;
  `,
  DoneButton: styled.button`
    position: absolute;
    right: -5px;
    background-color: #8200ff;
    border-radius: 12px;
    width: 72px;
    height: 32px;
    border: transparent;
    color: #fff;
    cursor: pointer;

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
    position: absolute;
    right: -5px;
    color: #000;
    cursor: pointer;

    &:hover {
      background-color: #c88fff;
      color: white;
    }
  `,
  NickNameCheck: styled.button`
    position: absolute;
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
  `,

  TextBelowPhoto: styled.div`
    color: #838383;
    font-size: 14px;
    margin-top: 20%;
    margin-left: -130px;
    width: 400px;
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

    &:hover {
      background-color: #dbdbdb;
      color: black;
    }
  `,
  FileSelectContainer: styled.div`
    margin-top: 250px;
    margin-left: -130px;
  `,
};
