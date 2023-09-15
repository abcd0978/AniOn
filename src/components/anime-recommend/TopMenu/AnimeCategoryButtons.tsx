import React, { useEffect } from 'react';
import { S } from './animeCategoryButtons.styles';
import { useAtom, useSetAtom } from 'jotai';

import * as recommendStore from '../../../store/animeRecommendStore';

const AnimeCategory = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(
    recommendStore.selectedCategoryAtom,
  );

  const [keyword, setKeyword] = useAtom(recommendStore.keywordAtom);
  const setGenres = useSetAtom(recommendStore.selectedGenresAtom);
  const setYears = useSetAtom(recommendStore.selectedYearsAtom);
  const setOffset = useSetAtom(recommendStore.offsetAtom);
  const setIsEnding = useSetAtom(recommendStore.isEndingAtom);

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

    if (category !== selectedCategory || selectedCategory === '전체') {
      setYears(null);
      setGenres([]);
    }

    setSelectedCategory(category);
    setOffset(0);
  };

  useEffect(() => {
    return () => {
      setSelectedCategory('전체');
      setIsEnding(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
