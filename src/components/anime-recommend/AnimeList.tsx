import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { throttle } from 'lodash';
import useIntersect from '../../hooks/useIntersect';
import AnimeFilter from './top-menu/AnimeFilter';
import { S } from './styled.AnimeList';
import { fetchAllAnimeLikes, toggleAnimeLike } from '../../api/likeApi';
import { fetchAnimeList } from '../../api/laftel';
import {
  offsetAtom,
  selectedGenresAtom,
  selectedCategoryAtom,
  selectedYearsAtom,
  isEndingAtom,
  keywordAtom,
} from '../../store/animeRecommendStore';
import * as userStore from '../../store/userStore';

import { ReadAnimeLikeG } from '../../types/likes';
import type { AnimeG } from '../../types/anime';
import AnimeCard from './AnimeCard';

const AnimeList = () => {
  const queryClient = useQueryClient();

  const user = useAtomValue(userStore.user);
  const genres = useAtomValue(selectedGenresAtom);
  const category = useAtomValue(selectedCategoryAtom);
  const years = useAtomValue(selectedYearsAtom);
  const ending = useAtomValue(isEndingAtom);
  const keyword = useAtomValue(keywordAtom);

  const size = 18;
  const sort = 'rank';

  const [offset, setOffset] = useAtom(offsetAtom);
  const [animeList, setAnimeList] = useState<AnimeG[]>([]);
  const [isNextPage, setIsNextPage] = useState(false);
  const [count, setCount] = useState(0);

  const defaultQueryOptions = {
    queryKey: ['animeList', genres, offset, years, ending, category, keyword],
    queryFn: () =>
      fetchAnimeList({ sort, genres, offset, size, years, ending, keyword }),
    refetchOnWindowFocus: false,
  };

  const { isLoading, isError, isFetching, data } =
    useQuery(defaultQueryOptions);

  const likesQueryOptions = {
    queryKey: ['animeLikes'],
    queryFn: () => fetchAllAnimeLikes(),
    refetchOnWindowFocus: false,
  };

  const { data: likesData } = useQuery(likesQueryOptions);

  const toggleLikeMutation = useMutation(toggleAnimeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['animeLikes']);
    },
    onError: (error) => {
      alert(`toggleAnimeLike 오류가 발생했습니다. : ${error}`);
    },
  });

  const likesCount = (anime_id: string): number => {
    return likesData
      ? likesData.filter((like: ReadAnimeLikeG) => like.anime_id === anime_id)
          .length
      : 0;
  };

  const handleLike = (anime_id: string) => {
    if (!user) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    const data = {
      user_id: user.id,
      anime_id,
    };
    toggleLikeMutation.mutate(data);
  };

  // 여기서 find 하는것과 Card에서 db통신 고르기.
  const isLike = (anime_id: string) => {
    const likedAnime = likesData?.find(
      (like: ReadAnimeLikeG) =>
        like.anime_id === anime_id && like.user_id === user?.id,
    );
    return !!likedAnime;
  };

  // 스로틀링된 무한 스크롤 콜백 함수
  // 카테고리를 변경할 때 무한스크롤 실행되는 이슈 발견 > 아래 useEffect를 clean-up 함수로 변경.
  const throttledLoadMore = throttle(() => {
    if (isNextPage && !isFetching) {
      // 이전 offset에 size를 더하여 다음 페이지 데이터를 가져오도록 설정
      setOffset((prevOffset) => prevOffset! + size);
    }
  }, 2000); // 1초에 한 번만 호출되도록 설정

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    throttledLoadMore();
  });

  // 장르, 카테고리, 분기 선택 시 변경.
  useEffect(() => {
    return () => {
      // console.log('클린업', offset);
      setOffset(0);
      setAnimeList([]);
    };
  }, [genres, category, years]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setIsNextPage(data.isNextPage);
    setCount(data.count);
    setAnimeList((prevAnimeList) => [...prevAnimeList, ...data.animeList]);
  }, [data]);

  if (isError) {
    return <div>Anime List를 가져오는 중 오류가 발생했습니다.</div>;
  }

  // console.log(animeList);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <S.PageNameDiv>
        <S.PageNameSpan>애니 </S.PageNameSpan>
        <S.PageNameBold>추천</S.PageNameBold>
      </S.PageNameDiv>
      <AnimeFilter count={count} setAnimeList={setAnimeList} />
      <S.AnimeContainer>
        {/* 스켈레톤으로 변경하기! > mvp 종료 후에 */}
        {isLoading && !animeList.length ? (
          <div>로딩중입니다.</div>
        ) : (
          animeList.map((anime: AnimeG) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              likesCount={likesCount}
              isLike={isLike}
              handleLike={handleLike}
            />
          ))
        )}
      </S.AnimeContainer>
      {isNextPage && !isLoading && <S.Target ref={ref} />}
    </div>
  );
};

export default AnimeList;
