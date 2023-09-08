import React from 'react';

import { S } from './styled.MobileCategory';
import AnimeCategory from './AnimeCategory';
import { ReactComponent as CloseBar } from '../../../assets/closebar.svg';
import { ReactComponent as ResetFilter } from '../../../assets/resetFilter.svg';
import { useAtom } from 'jotai';
import { isMobileFilterAtom } from '../../../store/animeRecommendStore';
import * as animeStore from '../../../store/animeRecommendStore';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useAtom(isMobileFilterAtom);

  const [years, setYears] = useAtom(animeStore.selectedYearsAtom);
  const [genres, setGenres] = useAtom(animeStore.selectedGenresAtom);

  const handleDoneButton = () => setIsOpen(false);

  const handleResetButton = () => {
    if (years) {
      setYears(null);
    }
    if (genres!.length > 0) {
      setGenres([]);
    }
  };

  return (
    <>
      <S.MobileFilterSection $isOpen={isOpen}>
        <S.CategolyClose onClick={() => setIsOpen(false)}>
          <CloseBar />
        </S.CategolyClose>
        <S.MobileFilterContainer>
          <S.FilterText>필터</S.FilterText>
          <AnimeCategory />
        </S.MobileFilterContainer>
        <S.FilterOptionContainer>
          <S.FilterResetContainer onClick={handleResetButton}>
            <ResetFilter /> 초기화
          </S.FilterResetContainer>
          <S.DoneButton onClick={handleDoneButton}>작품 보기</S.DoneButton>
        </S.FilterOptionContainer>
      </S.MobileFilterSection>
      <S.MobileFilterBackdrop $isOpen={isOpen} />
    </>
  );
};

export default MobileFilter;
