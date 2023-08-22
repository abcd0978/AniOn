import React, { useEffect, useState } from 'react';
import { S } from './styled.AnimeList';
import AnimeFilter from './top-menu/AnimeFilter';
import { fetchAnimeList } from '../../api/laftel';
import { useQuery } from '@tanstack/react-query';
import useIntersect from '../../hooks/useIntersect';

import type { laftelParamsM } from '../../consts';
import type { AnimeG } from '../../types/anime';
import { throttle } from 'lodash';

const AnimeList = () => {
  const [sort, setSort] = useState<laftelParamsM['sort']>('rank');
  const [genres, setGenres] = useState<laftelParamsM['genres']>(['음악']);
  const [tags, setTags] = useState<laftelParamsM['tags']>([]);
  const [offset, setOffset] = useState<laftelParamsM['offset']>(0);
  const [animeList, setAnimeList] = useState<AnimeG[]>([]);
  const [isNextPage, setIsNextPage] = useState(false);

  const size = 18;

  const defaultQueryOptions = {
    queryKey: ['animeList'],
    queryFn: () => fetchAnimeList({ sort, genres, tags, offset, size }),
    refetchOnWindowFocus: false,
  };

  const { isLoading, isError, isFetching, refetch, data } =
    useQuery(defaultQueryOptions);

  // 스로틀링된 무한 스크롤 콜백 함수
  const throttledLoadMore = throttle(() => {
    if (isNextPage && !isFetching) {
      // 이전 offset에 size를 더하여 다음 페이지 데이터를 가져오도록 설정
      setOffset((prevOffset) => prevOffset! + size);
      refetch();
    }
  }, 1000); // 1초에 한 번만 호출되도록 설정

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    throttledLoadMore();
  });

  useEffect(() => {
    if (data) {
      setIsNextPage(data.isNextPage);
      // 새로운 데이터를 현재 데이터 뒤에 추가
      setAnimeList((prevAnimeList) => [...prevAnimeList, ...data.animeList]);
    }
  }, [data]);

  if (isLoading && !animeList.length) {
    return <div>Anime List를 가져오는 중입니다.</div>;
  }

  if (isError) {
    return <div>Anime List를 가져오는 중 오류가 발생했습니다.</div>;
  }

  console.log(animeList);

  return (
    <>
      <AnimeFilter />
      <S.AnimeContainer>
        {animeList.map((anime: AnimeG) => (
          <S.CardDiv key={anime.id}>
            <S.CardInfo>
              <S.CardThumbnail src={anime.img}></S.CardThumbnail>
              <S.CardTitle>{anime.name}</S.CardTitle>
            </S.CardInfo>
            <S.CardGenres>
              {anime.genres?.slice(0, 2).map((genre, index) => {
                return (
                  <S.Genre key={index}>
                    <S.GenreText># {genre}</S.GenreText>
                  </S.Genre>
                );
              })}
            </S.CardGenres>
          </S.CardDiv>
        ))}
        {isNextPage && <S.Target ref={ref} />}
      </S.AnimeContainer>
    </>
  );
};

export default AnimeList;
