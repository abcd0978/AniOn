import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';

import { useAtom, useAtomValue } from 'jotai';
import { HoverInfo, S } from './styled.AnimeList';
import AnimeFilter from './top-menu/AnimeFilter';

import { fetchAnimeList } from '../../api/laftel';
import useIntersect from '../../hooks/useIntersect';

// import type { laftelParamsM } from '../../types/anime';
import type { AnimeG } from '../../types/anime';
import { offsetAtom, selectedGenresAtom } from '../../jotai/jotai';

const AnimeList = () => {
  const genres = useAtomValue(selectedGenresAtom);

  const sort = 'rank';
  // const [sort, setSort] = useState<laftelParamsM['sort']>('rank');
  // const [tags, setTags] = useState<laftelParamsM['tags']>([]);
  const [offset, setOffset] = useAtom(offsetAtom);
  const [animeList, setAnimeList] = useState<AnimeG[]>([]);
  const [isNextPage, setIsNextPage] = useState(false);
  const [count, setCount] = useState(0);
  const size = 18;

  const defaultQueryOptions = {
    queryKey: ['animeList', genres, offset],
    queryFn: () => fetchAnimeList({ sort, genres, offset, size }),
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
  }, 2000); // 1초에 한 번만 호출되도록 설정

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    throttledLoadMore();
  });

  // 장르 선택 시 변경, 추후 분기, 방영 중 여부 추가

  useEffect(() => {
    setOffset(0);
    setAnimeList([]);
  }, [genres]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setIsNextPage(data.isNextPage);
    setCount(data.count);
    // 새로운 데이터를 현재 데이터 뒤에 추가
    setAnimeList((prevAnimeList) => [...prevAnimeList, ...data.animeList]);
  }, [data]);

  if (isError) {
    return <div>Anime List를 가져오는 중 오류가 발생했습니다.</div>;
  }

  // console.log(animeList);

  return (
    <>
      <AnimeFilter />
      <h1 style={{ marginBottom: '20px', fontWeight: '600' }}>
        {count}개의 작품이 검색되었습니다!
      </h1>
      <S.AnimeContainer>
        {/* 스켈레톤으로 변경하기! */}
        {isLoading && !animeList.length ? (
          <div>로딩중입니다.</div>
        ) : (
          animeList.map((anime: AnimeG) => (
            <S.CardDiv key={anime.id}>
              <S.CardInfo>
                <S.CardThumbnail
                  src={
                    anime.images?.length !== 0
                      ? anime.images![0].img_url
                      : anime.img
                  }
                ></S.CardThumbnail>
                <HoverInfo>
                  <S.CardGenres>
                    <S.Genre key={anime.id}>
                      <S.GenreText>{anime.genres![0]}</S.GenreText>
                    </S.Genre>
                  </S.CardGenres>
                  <S.HoverTitle>{anime.name}</S.HoverTitle>
                </HoverInfo>
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
          ))
        )}
        {isNextPage && <S.Target ref={ref} />}
      </S.AnimeContainer>
    </>
  );
};

export default AnimeList;
