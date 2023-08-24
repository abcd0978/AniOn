import React from 'react';
import { S } from './styled.animeCategoryButtons';
import { useAtom, useSetAtom } from 'jotai';

import {
  offsetAtom,
  selectedCategoryAtom,
  selectedGenresAtom,
} from '../../../jotai/jotai';

const AnimeCategory = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const setGenres = useSetAtom(selectedGenresAtom);
  const setOffset = useSetAtom(offsetAtom);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      return;
    }

    if (category !== '장르') {
      setGenres([]);
    }
    console.log('카테고리 버튼');
    setSelectedCategory(category);
    setOffset(0);
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
