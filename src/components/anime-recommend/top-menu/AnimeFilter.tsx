import React, { SetStateAction } from 'react';
import AnimeCategoryButtons from './AnimeCategoryButtons';
import AnimeSearch from './AnimeSearch';
import AnimeCategory from './AnimeCategory';
import { S } from './styled.animeFilter';
import { AnimeG } from '../../../types/anime';
import { useAtomValue } from 'jotai';
import { selectedCategoryAtom } from '../../../store/animeRecommendStore';
interface Props {
  count?: number;
  setAnimeList: React.Dispatch<SetStateAction<AnimeG[]>>;
}
const AnimeFilter = ({ count, setAnimeList }: Props) => {
  const selectedCategory = useAtomValue(selectedCategoryAtom);

  return (
    <div>
      <S.FilterContainer>
        <S.FilterOptions>
          <AnimeCategoryButtons />
          <AnimeSearch setAnimeList={setAnimeList} />
        </S.FilterOptions>
      </S.FilterContainer>
      {selectedCategory && <AnimeCategory />}
      <S.CountDiv>
        {count?.toLocaleString()}개의 작품이 검색되었습니다!
      </S.CountDiv>
    </div>
  );
};

export default AnimeFilter;
