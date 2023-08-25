import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';
import { throttle } from 'lodash';
import useIntersect from '../../hooks/useIntersect';
import AnimeFilter from './top-menu/AnimeFilter';
import { HoverInfo, S } from './styled.AnimeList';
import { fetchAnimeLikes, toggleAnimeLike } from '../../api/likeApi';
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
import LikeSvg from './LikeSvg';
import viewDetail from '../../assets/viewdetail.svg';

import { ReadAnimeLikeG } from '../../types/likes';
import type { AnimeG } from '../../types/anime';

const AnimeList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const genres = useAtomValue(selectedGenresAtom);
  const category = useAtomValue(selectedCategoryAtom);
  const years = useAtomValue(selectedYearsAtom);
  const ending = useAtomValue(isEndingAtom);
  const keyword = useAtomValue(keywordAtom);

  const size = 18;
  const sort = 'rank';

  // const [sort, setSort] = useState<laftelParamsM['sort']>('rank');
  // const [tags, setTags] = useState<laftelParamsM['tags']>([]);

  // const [prevCategory, setPrevCategory] = useState(category); // 무한 스크롤 이슈 해결을 위해. 최적화가 필요할 듯.
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
    queryFn: () => fetchAnimeLikes(),
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

  const likesCount = (anime_id: string) => {
    return likesData?.filter(
      (like: ReadAnimeLikeG) => like.anime_id === anime_id,
    ).length;
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

  const isLike = (anime_id: string) => {
    const likedAnime = likesData?.find(
      (like: ReadAnimeLikeG) =>
        like.anime_id === anime_id && like.user_id === user?.id,
    );
    return !!likedAnime;
  };

  // 스로틀링된 무한 스크롤 콜백 함수
  // 카테고리를 변경할 때 무한스크롤 실행되는 이슈 발견 > 해결
  const throttledLoadMore = throttle(() => {
    if (isNextPage && !isFetching) {
      // 이전 offset에 size를 더하여 다음 페이지 데이터를 가져오도록 설정
      setOffset((prevOffset) => prevOffset! + size);
    }
  }, 2000); // 1초에 한 번만 호출되도록 설정

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    throttledLoadMore();
    // 이전 카테고리를 현재 카테고리로 업데이트
    // setPrevCategory(category);
  });

  // 장르, 카테고리, 분기 선택 시 변경.
  useEffect(() => {
    setOffset(0);
    setAnimeList([]);
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
        {/* 스켈레톤으로 변경하기! */}
        {isLoading && !animeList.length ? (
          <div>로딩중입니다.</div>
        ) : (
          animeList.map((anime: AnimeG) => (
            <S.CardDiv key={anime.id}>
              <S.CardInfo onClick={() => navigate(`/recommend/${anime.id}`)}>
                <S.HoverDiv>
                  <S.CardThumbnail
                    src={
                      anime.images?.length !== 0
                        ? anime.images![0].img_url
                        : anime.img
                    }
                    alt={anime.name}
                  />
                  <HoverInfo>
                    <S.HoverGenre key={anime.id}>
                      <S.GenreText>{anime.genres![0]}</S.GenreText>
                    </S.HoverGenre>
                    <S.HoverTitleAndDetail>
                      <S.HoverTitle>{anime.name}</S.HoverTitle>
                      <S.HoverViewDetail>
                        자세히 보기
                        <img
                          className="viewDetail"
                          src={viewDetail}
                          alt="viewdetail"
                          style={{ zIndex: '99' }}
                        />
                      </S.HoverViewDetail>
                    </S.HoverTitleAndDetail>

                    <S.HoverLikeBox>
                      <LikeSvg
                        onClick={() => handleLike(String(anime.id))}
                        is_like={isLike(String(anime.id))}
                      />
                      <div>{likesCount(String(anime.id))}</div>
                    </S.HoverLikeBox>
                  </HoverInfo>
                </S.HoverDiv>
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
      </S.AnimeContainer>
      {isNextPage && !isLoading && <S.Target ref={ref} />}
    </div>
  );
};

export default AnimeList;
