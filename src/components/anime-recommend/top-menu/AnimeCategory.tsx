import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { S } from './styled.animeCategory';

import {
  selectedCategoryAtom,
  selectedGenresAtom,
  selectedYearsAtom,
} from '../../../store/animeRecommendStore';
import { Genres, Years } from '../../../types/anime';

const AnimeCategory = () => {
  const [genres, setGenres] = useAtom(selectedGenresAtom);
  const category = useAtomValue(selectedCategoryAtom);
  const [years, setYears] = useAtom(selectedYearsAtom);
  const handleClick = (item: Genres | Years) => {
    if (category === '분기') {
      // '분기'
      setYears(item as Years);
    } else if (category === '장르') {
      // '장르'
      toggleGenre(item as Genres);
    }
  };

  const toggleGenre = (genre: Genres) => {
    if (genres?.includes(genre)) {
      // 이미 선택된 장르라면 제거
      setGenres(genres.filter((g) => g !== genre));
    } else {
      // 선택되지 않은 장르라면 추가
      setGenres([...genres!, genre]);
    }
  };

  let enumToShow;

  switch (category) {
    case '분기':
      enumToShow = Years; // 분기 카테고리에서는 분기 enum
      break;
    case '장르':
      enumToShow = Genres; // 장르 카테고리에서는 장르 enum
      break;
    default:
      enumToShow = null; // 다른 카테고리가 들어온 경우 null을 할당
  }

  if (enumToShow) {
    // enumToShow가 null이 아닌 경우 해당 enum의 값을 보여줌
    return (
      <S.CategorySection>
        {Object.values(enumToShow).map((item) => (
          <S.CategoryDiv
            key={item}
            onClick={() => handleClick(item)}
            // category가 분기이고 years === item이면 true.
            // category가 분기가 아니면 genres에 item이 있으면 true.
            $isSelected={
              category === '분기'
                ? years === item
                : genres?.includes(item) ?? false
            }
          >
            # {item}
          </S.CategoryDiv>
        ))}
      </S.CategorySection>
    );
  }

  return <></>;
};

export default AnimeCategory;
