import React from 'react';
import AnimeCategoryButtons from './AnimeCategoryButtons';
import AnimeSearch from './AnimeSearch';
import AnimeCategory from './AnimeCategory';
import { S } from './styled.animeFilter';

const AnimeFilter = () => {
  return (
    <>
      <S.FilterContainer>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AnimeCategoryButtons />
          <AnimeSearch />
        </section>
        <AnimeCategory />
      </S.FilterContainer>
    </>
  );
};

export default AnimeFilter;
