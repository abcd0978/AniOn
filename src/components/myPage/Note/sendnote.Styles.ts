import styled from 'styled-components';

export const S = {
  Container: styled.div`
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #0000001a;
    margin-top: 20px;
    padding-top: 50px;
    width: auto%;
    height: 60%;

    @media (max-width: 768px) {
      height: 60%;
    }
  `,

  ButtonBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;

    @media (max-width: 768px) {
      margin-bottom: 60px;
      margin-right: 40px;
    }
  `,

  SendButton: styled.button`
    background-color: #8200ff;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 15%;
    height: 31px;
    margin-top: 10px;

    @media (max-width: 768px) {
      width: 20%;
    }
  `,
  CancelButton: styled.button`
    background-color: #757575;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 15%;
    height: 31px;
    margin-top: 10px;

    @media (max-width: 768px) {
      width: 20%;
    }
  `,

  sendBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  `,
  Label: styled.div`
    width: 10%;

    @media (max-width: 768px) {
      margin-top: -80px;
      width: 17%;
      margin-right: 8px;
      font-size: 15px;
    }
  `,
  Input: styled.input`
    width: 39%;
    height: 30px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      margin-top: -70px;
      height: 25px;
    }
    &:focus {
      outline: none;
    }
  `,

  contentInputBox: styled.div`
    width: 50%;
    height: 120px;
    border: 1px solid black;

    @media (max-width: 768px) {
      width: 60%;
      height: 100px;
      margin-top: -20px;
    }
  `,
  contentInput: styled.input`
    border: none;
    width: 97%;
    height: 95%;
    &:focus {
      outline: none;
    }
  `,
};
