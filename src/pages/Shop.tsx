import React from 'react';
import * as S from './Shop.style';
import { useState } from 'react';
import ShopAwardList from '../components/ShopAwards';
import ShopBorder from './ShopBorder';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  const renderSelectedCategory = () => {
    switch (selectedCategory) {
      case 'Border':
        return <ShopBorder />;
      case 'Awards':
        return <ShopAwardList />;
      default:
        return null;
    }
  };
  return (
    <S.Outer>
      <S.Top>
        <S.Title>상점</S.Title>
        <S.ButtonContainer>
          <S.ButtonBox>
            <S.Button
              onClick={() => handleCategoryClick('Border')}
              style={{
                backgroundColor:
                  selectedCategory === 'Border' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === 'Border' ? '#ffffff' : 'black',
              }}
            >
              테두리
            </S.Button>
            <S.Button
              onClick={() => handleCategoryClick('Awards')}
              style={{
                backgroundColor:
                  selectedCategory === 'Awards' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === 'Awards' ? '#ffffff' : 'black',
              }}
            >
              칭호
            </S.Button>
          </S.ButtonBox>
          <S.Point>보유 P 1,500</S.Point>
        </S.ButtonContainer>
      </S.Top>
      {renderSelectedCategory()}
    </S.Outer>
  );
};

export default Shop;
