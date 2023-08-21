import React from 'react';
import AnimeCategory from './AnimeCategory';
import AnimeSearch from './AnimeSearch';
import AnimeTag from './AnimeTag';
import { S } from './styled.animeFilter';

const AnimeFilter = () => {
  return (
    <>
      <S.FilterContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AnimeCategory />
          <AnimeSearch />
        </div>
        <AnimeTag />
      </S.FilterContainer>
    </>
  );
};

export default AnimeFilter;
