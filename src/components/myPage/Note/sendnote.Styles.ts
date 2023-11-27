import styled from 'styled-components';

export const S = {
  Container: styled.div`
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #0000001a;
    gap: 20px;
    padding: 40px;
    margin-top: 20px;
    margin-bottom: 100px;
  `,

  SendButton: styled.button`
    background-color: #8200ff;
    border: none;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 그림자 추가 */
    border-radius: 10px;
    cursor: pointer;
  `,
};
