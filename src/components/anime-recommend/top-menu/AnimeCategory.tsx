import React, { useState } from 'react';
import { S } from './styled.animeCategory';
import { atom, useAtom } from 'jotai';

export const selectedCategoryAtom = atom('전체');

const AnimeCategory = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <S.CategoryContainer>
      <S.CategoryButton
        $isSelected={selectedCategory === '전체'}
        onClick={() => handleCategoryClick('전체')}
      >
        전체
      </S.CategoryButton>
      <S.CategoryButton
        $isSelected={selectedCategory === '장르'}
        onClick={() => handleCategoryClick('장르')}
      >
        장르별
      </S.CategoryButton>
      <S.CategoryButton
        $isSelected={selectedCategory === '분기'}
        onClick={() => handleCategoryClick('분기')}
      >
        분기별
      </S.CategoryButton>
      <S.CategoryButton
        $isSelected={selectedCategory === '방영'}
        onClick={() => handleCategoryClick('방영')}
      >
        방영중
      </S.CategoryButton>
    </S.CategoryContainer>
  );
};

export default AnimeCategory;
