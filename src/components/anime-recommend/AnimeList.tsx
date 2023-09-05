import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import ScrollToTop from '../ScrollToTop';
import { toast } from 'react-toastify';
import { throttle } from 'lodash';

// component
import AnimeCardSkeleton from './AnimeCardSkeleton';
import useIntersect from '../../hooks/useIntersect';
import AnimeFilter from './top-menu/AnimeFilter';
import { S } from './styled.AnimeList';
import AnimeCard from './AnimeCard';

// api
import { fetchAllAnimeLikes, toggleAnimeLike } from '../../api/likeApi';
import { fetchAnimeList } from '../../api/laftel';

// store
import * as animeStore from '../../store/animeRecommendStore';
import * as userStore from '../../store/userStore';

// type
import type { ReadAnimeLikeG } from '../../types/likes';
import type { AnimeG } from '../../types/anime';

const AnimeList = () => {
  const queryClient = useQueryClient();

  const user = useAtomValue(userStore.user);
  const genres = useAtomValue(animeStore.selectedGenresAtom);
  const category = useAtomValue(animeStore.selectedCategoryAtom);
  const years = useAtomValue(animeStore.selectedYearsAtom);
  const ending = useAtomValue(animeStore.isEndingAtom);
  const keyword = useAtomValue(animeStore.keywordAtom);

  const size = 18;
  const sort = 'rank';

  const [offset, setOffset] = useAtom(animeStore.offsetAtom);
  const [animeList, setAnimeList] = useState<AnimeG[]>([]);
  const [isNextPage, setIsNextPage] = useState(false);
  const [count, setCount] = useState(0);

  const animeListQueryOptions = {
    queryKey: ['animeList', genres, offset, years, ending, category, keyword],
    queryFn: () =>
      fetchAnimeList({ sort, genres, offset, size, years, ending, keyword }),
    refetchOnWindowFocus: false,
  };

  const { isLoading, isError, isFetching, data } = useQuery(
    animeListQueryOptions,
  );

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
      toast.error(`toggleAnimeLike 오류가 발생했습니다. : ${error}`, {
        autoClose: 1000,
      });
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
      toast.warning('로그인 후 찜해주세요!💗', {
        autoClose: 1000,
      });
      return;
    }

    const data = {
      user_id: user.id,
      anime_id,
      isDetailPage: false,
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

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
    >
      <S.PageNameDiv>
        <S.PageNameFisrt>애니 </S.PageNameFisrt>
        <S.PageNameSecond>추천</S.PageNameSecond>
      </S.PageNameDiv>
      <AnimeFilter count={count} setAnimeList={setAnimeList} />
      <S.AnimeContainer>
        {/* 스켈레톤으로 변경하기! > mvp 종료 후에 */}
        {isLoading && !animeList.length ? (
          <>
            {Array()
              .fill(undefined)
              .map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
          </>
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
        <>
          {isFetching &&
            Array(6)
              .fill(undefined)
              .map((_, index) => <AnimeCardSkeleton key={index} />)}
        </>
      </S.AnimeContainer>
      <ScrollToTop />
      {isNextPage && !isLoading && <S.Target ref={ref} />}
    </div>
  );
};

export default AnimeList;
