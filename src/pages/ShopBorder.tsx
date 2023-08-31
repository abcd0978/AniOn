import React from 'react';
import * as S from './Shop.style';
const ShopBorder = () => {
  return (
    <S.Outer>
      <S.Bottom>
        <S.ItemBox>
          {[...Array(10)].map((_, index) => (
            <S.Item key={index}>
              <S.TopArea />
              <S.BottomArea>
                테두리 명<br />
                <S.Number>150포인트</S.Number>
                <S.BuyButton>구매하기</S.BuyButton>
              </S.BottomArea>
            </S.Item>
          ))}
        </S.ItemBox>
      </S.Bottom>
    </S.Outer>
  );
};

export default ShopBorder;
