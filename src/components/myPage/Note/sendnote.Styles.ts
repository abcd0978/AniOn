import styled from 'styled-components';

export const S = {
  Container: styled.div`
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #0000001a;
    margin-top: 20px;
    padding-top: 50px;
    width: auto%;
    height: 50%;
  `,

  ButtonBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 55px;
  `,

  SendButton: styled.button`
    background-color: #8200ff;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 7%;
    height: 25px;
  `,
  CancelButton: styled.button`
    background-color: #757575;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 7%;
    height: 25px;
  `,

  sendBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  `,
  Label: styled.div`
    width: 8%;
  `,
  Input: styled.input`
    width: 30%;
    height: 30px;
  `,

  contentInputBox: styled.div`
    width: 30%;
    height: 100px;
    border: 1px solid black;
  `,
  content: styled.input`
    border: none;
  `,
};
