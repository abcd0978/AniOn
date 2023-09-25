import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { throttle } from 'lodash';

// component
import AnimeCardSkeleton from './AnimeCardSkeleton';
import AnimeFilter from '../TopMenu/AnimeFilter';
import ScrollToTop from '../../Scroll/ScrollToTop';
import { S } from './animeList.styles';
import AnimeCard from './AnimeCard';

// hooks
import useViewport from '../../../hooks/useViewPort';
import useIntersect from '../../../hooks/useIntersect';

// api
import { fetchAnimeList } from '../../../api/laftel';
import { fetchAllAnimeComments } from '../../../api/aniComment';
import { fetchAllAnimeLikes, toggleAnimeLike } from '../../../api/aniLike';

// store
import * as userStore from '../../../store/userStore';
import * as animeStore from '../../../store/animeListStore';

// type
import type { ReadAnimeLikeG } from '../../../types/likes';
import type { AnimeG, laftelParamsM } from '../../../types/anime';
import { AniCommentType } from '../../../types/comment';

const AnimeList = () => {
  // 상세페이지로 이동했을때만 offset, genres 등등 저장해서 뒤로가기시 데이터 그대로 보여주는 방법 찾아보기
  const queryClient = useQueryClient();
  const { isMobile } = useViewport();

  const user = useAtomValue(userStore.user);
  const ending = useAtomValue(animeStore.isEndingAtom);
  const years = useAtomValue(animeStore.selectedYearsAtom);
  const genres = useAtomValue(animeStore.selectedGenresAtom);
  const category = useAtomValue(animeStore.selectedCategoryAtom);
  const isMobileFilterOpen = useAtomValue(animeStore.isMobileFilterAtom);

  const size = useMemo(() => {
    return isMobile ? 6 : 18;
  }, [isMobile]);

  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [animeList, setAnimeList] = useAtom(animeStore.animeListAtom);
  const [offset, setOffset] = useAtom(animeStore.offsetAtom);
  const [keyword, setKeyword] = useAtom(animeStore.keywordAtom);

  const params: laftelParamsM = {
    genres,
    offset,
    size,
    years,
    ending,
    keyword,
  };

  const animeListQueryKey = [
    'animeList',
    genres,
    offset,
    years,
    ending,
    category,
    keyword,
  ];

  const animeListQueryOptions = {
    queryKey: animeListQueryKey,
    queryFn: async () => {
      setIsLoaded(false);
      const data = await fetchAnimeList(params);
      return data;
    },
    refetchOnWindowFocus: false,
    // 타입 명시하기
    onSuccess: (data: any) => {
      setIsNextPage(data.isNextPage);
      setCount(data.count);
      setAnimeList((prevAnimeList) => [...prevAnimeList, ...data.animeList]);
      setIsLoaded(true);
    },
  };

  const { isLoading, isError, isFetching } = useQuery(animeListQueryOptions);

  const likesQueryOptions = {
    queryKey: ['animeLikes'],
    queryFn: () => fetchAllAnimeLikes(),
    refetchOnWindowFocus: false,
  };

  const { data: likesData } = useQuery(likesQueryOptions);

  const animeCommentsQueryOptions = {
    queryKey: ['animeListComments'],
    queryFn: () => fetchAllAnimeComments(),
    refetchOnWindowFocus: false,
    staletime: 60 * 1000,
  };

  const { data: commentsData } = useQuery(animeCommentsQueryOptions);

  const toggleLikeMutation = useMutation(toggleAnimeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['animeLikes']);
      queryClient.invalidateQueries(['genre']);
    },
    onError: (error) => {
      toast.error(`좋아요 도중 오류가 발생했어요.. : ${error}`, {
        autoClose: 800,
      });
    },
  });

  const likesCount = useMemo(() => {
    console.log('실행됨메모');
    return (animeId: string) => {
      return likesData
        ? likesData.filter((like: ReadAnimeLikeG) => like.anime_id === animeId)
            .length
        : 0;
    };
  }, [likesData]);

  const handleLike = (anime_id: string, genres: string[]) => {
    if (!user) {
      toast.warning('로그인 후 찜해주세요!💗', {
        autoClose: 800,
      });
      return;
    }

    const insertLike = {
      user_id: user.id,
      anime_id,
      isDetailPage: false,
    };
    const data = {
      insertLike,
      genres,
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

  // 댓글 개수 확인
  const commentsCount = useMemo(() => {
    return (animeId: string) => {
      if (!commentsData) {
        return 0;
      }
      return commentsData
        ? commentsData.filter(
            (comment: Pick<AniCommentType, 'ani_id'>) =>
              comment.ani_id === animeId,
          ).length
        : 0;
    };
  }, [commentsData]);

  // 스로틀링된 무한 스크롤 콜백 함수
  // 카테고리를 변경할 때 무한스크롤 실행되는 이슈 발견 > 아래 useEffect를 clean-up 함수로 변경.
  const throttledLoadMore = throttle(() => {
    if (isNextPage && !isFetching && !isLoading && isLoaded) {
      // 이전 offset에 size를 더하여 다음 페이지 데이터를 가져오도록 설정
      setOffset((prevOffset) => prevOffset! + size);
    }
  }, 1000);

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (!isFetching && !isLoading) {
        throttledLoadMore(); // 요소를 관찰 대상으로 추가
      }
    },
    { threshold: 0.5 },
  );

  // 장르, 카테고리, 분기 선택 시 변경.
  useEffect(() => {
    return () => {
      setOffset(0);
      setAnimeList([]);
      setKeyword('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, category, years]);

  if (isError) {
    return <div>Anime List를 가져오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <S.AnimeListSection $isMobileFilterOpen={isMobileFilterOpen}>
        <S.PageNameDiv>
          <S.PageNameFisrt>애니 </S.PageNameFisrt>
          <S.PageNameSecond>찾기</S.PageNameSecond>
        </S.PageNameDiv>
        <AnimeFilter count={count} setAnimeList={setAnimeList} />
        <S.AnimeContainer>
          {isLoading && !animeList.length ? (
            <>
              {Array(36)
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
                commentsCount={commentsCount}
              />
            ))
          )}
          {isFetching && (
            <>
              {Array(9)
                .fill(undefined)
                .map((_, index) => (
                  <AnimeCardSkeleton key={index} />
                ))}
            </>
          )}
        </S.AnimeContainer>
        <ScrollToTop />
      </S.AnimeListSection>
      <S.Target ref={ref} />
    </>
  );
};

export default AnimeList;
