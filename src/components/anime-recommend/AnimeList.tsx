import React, { useState, useEffect } from 'react';
import { S } from './styled.AnimeList';
import AnimeFilter from './top-menu/AnimeFilter';
import { getAnimeList } from '../../api/laftel';

import type { laftelParamsM } from '../../consts';
import { useQuery } from '@tanstack/react-query';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const AnimeList = () => {
  const [sort, setSort] = useState<laftelParamsM['sort']>('rank');
  const [genres, setGenres] = useState<laftelParamsM['genres']>([
    '드라마',
    '일상',
  ]);
  const [tags, setTags] = useState<laftelParamsM['tags']>([]);

  const defaultQueryOptions = {
    queryKey: ['animeList'],
    queryFn: () => getAnimeList({ sort, genres, tags }),
    refetchOnWindowFocus: false,
  };

  const { isLoading, isError, data: animeList } = useQuery(defaultQueryOptions);

  if (isLoading) {
    return <div>Anime List를 가져오는 중입니다.</div>;
  }
  if (isError) {
    return <div>Anime List를 가져오는 중 오류가 발생했습니다.</div>;
  }

  console.log(animeList);

  return (
    <>
      <AnimeFilter />
      ###개의 작품이 검색되었습니다!
      <S.AnimeContainer>
        {cards.map((card, index) => (
          <S.CardDiv key={index}>{card}</S.CardDiv>
        ))}
      </S.AnimeContainer>
    </>
  );
};

export default AnimeList;
