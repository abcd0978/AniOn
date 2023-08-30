import styled from 'styled-components';
export const Review = {
  Divide: styled.div`
    height: 120px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    position: relative;
    top: -290px;
    margin-left: 150px;
  `,
  ButtonContainer: styled.div`
    position: relative;
    flex-direction: column;
    left: 800px;
    margin-top: -50px;
  `,
  ButtonArray: styled.div`
    display: flex;
  `,
  ButtonIcon: styled.img`
    width: 12px;
    height: 12px;
  `,
  Button: styled.button`
    padding: 8px;
    margin: 2px;
    border: 1px solid lightgray;
    border-radius: 12px;
    background-color: transparent;
    width: auto;
    height: 30px;
    text-align: center;
  `,
  ReviewComments: styled.div`
    width: 600px;
    height: 100px;
  `,
  Date: styled.div`
    color: #999;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.195px;
  `,
};

export const Post = {
  Category: styled.div`
    width: auto;
    height: 26px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    background: #d9d9d9;
  `,
};
