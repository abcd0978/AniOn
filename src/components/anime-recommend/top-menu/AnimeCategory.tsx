import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { S } from './styled.animeCategory';

import { selectedCategoryAtom, selectedGenresAtom } from '../../../jotai/jotai';
import { Genres, Years } from '../../../types/anime';

const AnimeTag = () => {
  const category = useAtomValue(selectedCategoryAtom);
  const [genres, setGenres] = useAtom(selectedGenresAtom);

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
    case '방영중':
      enumToShow = null; // 방영중 카테고리에서는 태그 enum
      break;
    default:
      enumToShow = null; // 다른 카테고리가 들어온 경우 null을 할당
  }

  if (enumToShow) {
    // enumToShow가 null이 아닌 경우 해당 enum의 값을 보여줌
    return (
      <>
        <S.CategorySection>
          {Object.values(enumToShow).map((item) => (
            <S.CategoryDiv
              key={item}
              onClick={() => {
                // 장르를 클릭하면 toggleGenre 함수 호출
                toggleGenre(item);
              }}
              className={genres?.includes(item) ? 'selected' : ''}
            >
              # {item}
            </S.CategoryDiv>
          ))}
        </S.CategorySection>
      </>
    );
  }

  return null;
};

export default AnimeTag;
