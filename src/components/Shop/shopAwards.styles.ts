import styled from 'styled-components';

type Props = {
  $mediaWidth: number;
};

export const S = {
  GridContainer: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    row-gap: 60px;
    margin-left: 20px;
    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(3, 32%); /* 4개의 컬럼으로 변경 */
      margin-left: 5px;
    }

    @media (max-width: 1024px) {
      /* 화면 크기가 768px 이하인 경우 */
      grid-template-columns: repeat(2, 49.6%); /* 2개의 컬럼으로 변경 */
      gap: 8px;
      row-gap: 24px;
      margin-left: 5px;
    }
  `,

  ItemBox: styled.div`
    margin-bottom: 50px;
  `,

  AwardItem: styled.div`
    gap: 10px;
  `,

  AwardImg: styled.img<Props>`
    width: 90%;
  `,

  AwardName: styled.div`
    background-color: #efefef;
    padding: 8px;
    border-radius: 999px;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;
    display: flex;
    height: 48px;
    width: 210px;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    margin: 10px;
  `,

  AwardPrice: styled.div`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.24px;
    margin-top: 20px;
    width: 100px;
    height: 32px;
  `,

  BuyButton: styled.button`
    border-radius: 6px;
    border: 1px solid #c88fff;
    background-color: white;
    width: 70px;
    height: 26px;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      background-color: #c88fff;
      color: white;
    }

    &:disabled:hover {
      background-color: white;
      color: #cccccc;
      cursor: not-allowed;
    }
  `,

  ShopMenu: styled.div`
    display: flex;
    width: 85%;
    height: 32px;
    padding: 0px 8px;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
  `,
};
