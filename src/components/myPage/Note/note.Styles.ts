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
    border: 1px solid black;
    cursor: pointer;
    border-bottom: 2px solid black;
    margin-right: 3px;
    &:hover {
      background-color: #e0d3ff;
    }
  `,
  SentButton: styled.button`
    width: 10%;
    height: 4%;
    border-radius: 20px;
    background-color: #a86bff;
    border: 1px solid black;
    cursor: pointer;
    border-bottom: 2px solid black;
    margin-right: 3px;
    &:hover {
      background-color: #a86bff;
      background-color: #8200ff;
    }
  `,
  SendButton: styled.button`
    width: 10%;
    height: 4%;
    border-radius: 20px;
    background-color: rgb(255, 150, 219);
    border: 1px solid black;
    cursor: pointer;
    border-bottom: 2px solid black;
    &:hover {
        background-color: rgb(255, 180, 239);
    
  `,
};
