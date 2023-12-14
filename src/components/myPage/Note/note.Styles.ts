import styled from 'styled-components';
export const S = {
  Container: styled.div`
    width: 100%;
  `,

  RecvButton: styled.button`
    width: 10%;
    height: 4%;
    border-radius: 20px;
    background-color: #f3e7ff;
    border: none;
    cursor: pointer;

    margin-right: 3px;
    &:hover {
      background-color: #8200ff;
      color: white;
    }
  `,
  SentButton: styled.button`
    width: 10%;
    height: 4%;
    border-radius: 20px;
    background-color: #f3e7ff;
    border: none;
    cursor: pointer;

    margin-right: 3px;
    &:hover {
      background-color: #8200ff;
      color: white;
    }
  `,
  SendButton: styled.button`
    width: 10%;
    height: 4%;
    border-radius: 20px;
    background-color: rgb(255, 235, 247);
    border: none;
    cursor: pointer;

    &:hover {
        background-color: rgb(255, 180, 239);
        color: white;
       
    
  `,
};
