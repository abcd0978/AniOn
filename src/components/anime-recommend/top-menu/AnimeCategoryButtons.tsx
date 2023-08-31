import React, { useEffect } from 'react';
import { S } from './styled.animeCategoryButtons';
import { useAtom, useSetAtom } from 'jotai';

import {
  isEndingAtom,
  keywordAtom,
  offsetAtom,
  selectedCategoryAtom,
  selectedGenresAtom,
  selectedYearsAtom,
} from '../../../store/animeRecommendStore';

const AnimeCategory = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const [keyword, setKeyword] = useAtom(keywordAtom);
  const setGenres = useSetAtom(selectedGenresAtom);
  const setYears = useSetAtom(selectedYearsAtom);
  const setOffset = useSetAtom(offsetAtom);
  const setIsEnding = useSetAtom(isEndingAtom);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category && !keyword) {
      return;
    }
    setKeyword('');

    if (category === '방영') {
      setIsEnding('false');
    } else {
      setIsEnding(null);
    }

    if (category !== selectedCategory) {
      setYears(null);
      setGenres([]);
    }

    console.log('카테고리', category);
    setSelectedCategory(category);
    setOffset(0);
  };

  useEffect(() => {
    return () => {
      setSelectedCategory('전체');
      setIsEnding(null);
    };
  }, []);

  return (
    <S.CategoryContainer>
      {['전체', '장르별', '분기별', '방영'].map((category) => (
        <S.CategoryButton
          key={category}
          $isSelected={selectedCategory === category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </S.CategoryButton>
      ))}
    </S.CategoryContainer>
  );
};

export default AnimeCategory;
