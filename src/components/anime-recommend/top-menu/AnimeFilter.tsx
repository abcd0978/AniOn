import React from 'react';
import AnimeCategoryButtons from './AnimeCategoryButtons';
import AnimeSearch from './AnimeSearch';
import AnimeCategory from './AnimeCategory';
import { S } from './styled.animeFilter';
interface Props {
  count?: number;
}
const AnimeFilter = ({ count }: Props) => {
  return (
    <>
      <S.FilterContainer>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AnimeCategoryButtons />
          <AnimeSearch />
        </section>
        <AnimeCategory />
      </S.FilterContainer>
      <S.CountDiv>{count}개의 작품이 검색되었습니다!</S.CountDiv>
    </>
  );
};

export default AnimeFilter;
