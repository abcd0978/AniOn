import styled from 'styled-components';

const S = {
  Title: styled.div<{ width?: number }>`
    font-size: 32px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    color: #8200ff;
    @media (max-width: 768px) {
      font-size: 20px;
      margin-left: 10px;
    }
  `,
  Container: styled.div<{ width?: number }>`
    max-width: 1440px;
    height: 827px;
    border-radius: 20px;
    @media (max-width: 768px) {
      width: 357px;
    }
  `,
  Layout: styled.div<{ width?: number }>`
    width: 100%;
    height: 604px;
    border-radius: 20px;
    box-shadow: 5px 5px 5px 5px #0000001a;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 auto;
    @media (max-width: 768px) {
      margin-left: -3px;
    }
  `,

  Form: styled.form<{ width?: number }>`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 25px;
  `,

  CateInput: styled.div<{ width?: number }>`
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 15px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 79px;
      margin-top: 15px;
      margin-left: 30px;
    }
  `,
  TitleInput: styled.div<{ width?: number }>`
    width: 100%;
    height: 44px;
    display: flex;
    margin-bottom: 5px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 79px;
      margin-top: -10px;
      margin-left: 30px;
    }
  `,

  ContentInput: styled.div<{ width?: number }>`
    width: 100%;
    height: 360px;
    margin: 10px;
    display: flex;
    margin-bottom: 5px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      width: 85%;
      margin-top: -10px;
      margin-left: 45px;
    }
  `,

  Label: styled.div<{ width?: number }>`
    font-size: 15px;
    height: 18px;
    width: 100px;
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-top: -20px;
    }
  `,
  LabelContent: styled.div<{ width?: number }>`
    font-size: 15px;
    height: 18px;
    width: 100px;
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-top: -10px;
      margin-left: -10px;
    }
  `,

  Select: styled.select<{ width?: number }>`
    width: 200px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    // border: 1px #c88fff solid;
    cursor: pointer;
    background-color: #f9f3ff;
    @media (max-width: 768px) {
      width: 96px;
      height: 34px;
      margin-left: 10px;
    }
  `,

  Input: styled.input<{ width?: number }>`
    width: calc(100% - 120px);
    padding: 10px;
    outline: none;
    border-radius: 8px;
    background-color: #f9f3ff;
    // border: 1px #c88fff solid;
    border: none;
    margin-right: 40px;
    @media (max-width: 768px) {
      margin-left: 10px;
    }
  `,

  Textarea: styled.textarea<{ width?: number }>`
    width: 1196px;
    height: 360px;
    padding: 16px;
    font-size: 14px;
    background-color: #f5f5f5;
    border: none;
    outline: none;
    border-radius: 10px;
  `,

  ButtonContainer: styled.div<{ width?: number }>`
    width: 100%;
    height: 40px;
    margin-top: 45px;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 768px) {
      margin-top: -1px;
      margin-left: 20px;
    }
  `,
  Button: styled.button<{ width?: number }>`
    background-color: #757575;
    border: none;
    width: 80px;
    height: 40px;
    border-radius: 10px;
    font-size: 15px;
    color: white;
    margin-right: 5px;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 60px;
      height: 30px;
    }
  `,
  SubmitButton: styled.button<{ width?: number }>`
    background-color: #8200ff;
    border: none;
    width: 80px;
    height: 40px;
    border-radius: 10px;
    font-size: 15px;
    color: white;
    margin-right: 18px;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 60px;
      height: 30px;
    }
  `,
};

export { S };
