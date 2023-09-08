import React, { SetStateAction, useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

// 컴포넌트, 파일
import AnimeCategoryButtons from './AnimeCategoryButtons';
import AnimeCategory from './AnimeCategory';
import { S } from './styled.animeFilter';
import AnimeSearch from './AnimeSearch';
import Filter from '../../../assets/filter.svg';

// jotai store
import * as recommendStore from '../../../store/animeRecommendStore';

// type
import type { AnimeG } from '../../../types/anime';
import MobileCategory from './MobileFilter';

interface Props {
  count?: number;
  setAnimeList: React.Dispatch<SetStateAction<AnimeG[]>>;
}

const AnimeFilter = ({ count, setAnimeList }: Props) => {
  const selectedCategory = useAtomValue(recommendStore.selectedCategoryAtom);
  const setMobileFilterOpen = useSetAtom(recommendStore.isMobileFilterAtom);

  // 모바일 버전 감지
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // 컴포넌트가 마운트될 때 한 번 실행하고, 화면 크기가 변경될 때마다 실행
    handleResize(); // 초기 화면 크기 확인
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMobileFilterToggle = () => setMobileFilterOpen((cur) => !cur);

  return (
    <>
      <S.FilterContainer>
        <S.FilterOptions>
          <AnimeCategoryButtons />
          <AnimeSearch setAnimeList={setAnimeList} />
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
            <S.MobileFilterButton>
              필터
              <S.MobileFilterImg
                src={Filter}
                onClick={handleMobileFilterToggle}
              />
            </S.MobileFilterButton>
          )}
      </S.FilterBottomContainer>
      <MobileCategory />
    </>
  );
};

export default AnimeFilter;
