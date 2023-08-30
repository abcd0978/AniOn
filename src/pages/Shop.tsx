import React from 'react';
import * as S from './Shop.style';
import { useState } from 'react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <S.Outer>
      <S.Top>
        <S.Title>상점</S.Title>
        <S.ButtonContainer>
          <S.ButtonBox>
            <S.Button
              onClick={() => handleCategoryClick('테두리')}
              style={{
                backgroundColor:
                  selectedCategory === '테두리' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === '테두리' ? '#ffffff' : 'black',
              }}
            >
              테두리
            </S.Button>
            <S.Button
              onClick={() => handleCategoryClick('칭호')}
              style={{
                backgroundColor:
                  selectedCategory === '칭호' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === '칭호' ? '#ffffff' : 'black',
              }}
            >
              칭호
            </S.Button>
          </S.ButtonBox>
          <S.Point>보유 P 1,500</S.Point>
        </S.ButtonContainer>
      </S.Top>
      <S.Bottom>
        <S.ItemBox>
          {[...Array(10)].map((_, index) => (
            <S.Item key={index}>
              <S.TopArea />
              <S.BottomArea>
                테두리 명<br />
                150포인트
                <S.BuyButton>구매하기</S.BuyButton>
              </S.BottomArea>
            </S.Item>
          ))}
        </S.ItemBox>
      </S.Bottom>
    </S.Outer>
  );
};

export default Shop;
