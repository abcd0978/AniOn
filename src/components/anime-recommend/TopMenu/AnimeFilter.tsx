import React, { SetStateAction } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

// 컴포넌트, 파일
import AnimeCategoryButtons from './AnimeCategoryButtons';
import AnimeCategory from './AnimeCategory';
import { S } from './animeFilter.styles';
import AnimeSearch from './AnimeSearch';

// hook
import useViewport from '../../../hooks/useViewPort';

// jotai store
import * as recommendStore from '../../../store/animeListStore';

// type
import type { AnimeG } from '../../../types/anime';
import MobileCategory from './MobileFilter';

interface Props {
  count?: number;
  setAnimeList: React.Dispatch<SetStateAction<AnimeG[]>>;
}

const AnimeFilter = ({ count, setAnimeList }: Props) => {
  const { isMobile } = useViewport();

  const selectedCategory = useAtomValue(recommendStore.selectedCategoryAtom);
  const setMobileFilterOpen = useSetAtom(recommendStore.isMobileFilterAtom);

  const handleMobileFilterToggle = () => setMobileFilterOpen((cur) => !cur);

  return (
    <>
      <S.FilterContainer>
        <S.FilterOptions>
          <AnimeCategoryButtons />
          {!isMobile && <AnimeSearch setAnimeList={setAnimeList} />}
        </S.FilterOptions>
      </S.FilterContainer>
      {selectedCategory && !isMobile && <AnimeCategory />}
      <S.FilterBottomContainer>
        <S.CountText>
          {count?.toLocaleString()}개의 작품이 검색되었습니다!
        </S.CountText>
        {isMobile &&
          selectedCategory !== '방영' &&
          selectedCategory !== '전체' && (
            <S.MobileFilterButton onClick={handleMobileFilterToggle}>
              필터
              <S.MobileFilterImg src={'/images/filter.svg'} />
            </S.MobileFilterButton>
          )}
      </S.FilterBottomContainer>
      <MobileCategory />
    </>
  );
};

export default AnimeFilter;
