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

  noteBox: styled.div`
    border: 1px solid gray;
    display: flex;
    flex-direction: row;
  `,
  nickname: styled.div`
    width: 15%;
  `,
  title: styled.div`
    width: 72%;
  `,
  date: styled.div`
    width: 13%;
  `,
};
