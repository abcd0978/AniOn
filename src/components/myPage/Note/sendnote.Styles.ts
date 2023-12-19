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
    margin-left: 30px;
  `,

  SendButton: styled.button`
    background-color: #8200ff;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 10%;
    height: 31px;
    margin-top: 10px;
  `,
  CancelButton: styled.button`
    background-color: #757575;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    width: 10%;
    height: 31px;
    margin-top: 10px;
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
  `,
  Input: styled.input`
    width: 39%;
    height: 30px;
    margin-bottom: 10px;
  `,

  contentInputBox: styled.div`
    width: 50%;
    height: 120px;
    border: 1px solid black;
  `,
  contentInput: styled.input`
    border: none;
    width: 99%;
    height: 118px;
  `,
};
