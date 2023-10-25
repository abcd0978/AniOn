import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as animeRecommendStore from '../../store/animeListStore';
import * as headerStore from '../../store/headerStore';
import * as sidebarStore from '../../store/sidebarStore';
import * as userStore from '../../store/userStore';
import * as animeLikeApi from '../../api/aniLike';
import * as animeStore from '../../store/animeListStore';
// import { laftelParamsM } from '../../types/anime';
import { Genres } from '../../types/anime';
type Props = {};
// const genresForUnregistered: laftelParamsM['genres'] = [
//   '개그',
//   '공포',
//   '드라마',
//   '로맨스',
//   '모험',
//   '무협',
//   '미스터리',
//   '범죄',
//   '성인',
//   '스릴러',
//   '스포츠',
//   '시대물',
//   '아동',
//   '아이돌',
//   '액션',
//   '음식',
//   '음악',
//   '이세계',
//   '일상',
//   '재난',
//   '추리',
//   '치유',
//   '특촬',
//   '판타지',
//   '하렘',
//   'BL',
//   'GL 백합',
//   'SF',
// ];

const DownBar = (props: Props) => {
  const [downBarOpened, setDownBarOpened] = useAtom(sidebarStore.downBarOpened);
  const setMenuSearchCliked = useSetAtom(headerStore.searchMobileClicked);
  // const [menuSearchClicked, setMenuSearchCliked] = useAtom(
  //   headerStore.searchMobileClicked,
  // );
  const setKeyword = useSetAtom(animeRecommendStore.keywordAtom);
  const navigate = useNavigate();
  const setAnimeList = useSetAtom(animeRecommendStore.animeListAtom);
  const setOffset = useSetAtom(animeRecommendStore.offsetAtom);
  const user = useAtomValue(userStore.user);
  const [recentSearch, setRecentSearch] = useState<Array<string>>([]);
  const setGenresAnime = useSetAtom(animeStore.selectedGenresAtom);

  const genreQueryOptions = {
    queryKey: ['genre'],
    queryFn: () => {
      return animeLikeApi.getPreferedGenres(user!.id);
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  };

  const { data } = useQuery(genreQueryOptions);

  const deleteRecentSearch = (keyword: string) => {
    const recentSearch: Array<string> | null = JSON.parse(
      localStorage.getItem('recentSearch')!,
    );
    if (recentSearch) {
      const filteredArr = recentSearch.filter((word) => word !== keyword);
      const stringifiedArr = JSON.stringify(filteredArr);
      localStorage.setItem('recentSearch', stringifiedArr);
      return filteredArr;
    } else {
      return [] as string[];
    }
  };
  const getRecentSearch = () => {
    const recentSearch: Array<string> | null = JSON.parse(
      localStorage.getItem('recentSearch')!,
    );
    if (recentSearch) {
      return recentSearch;
    } else {
      return [];
    }
  };
  const goSearch = (keyword: string) => {
    setAnimeList([]);
    setKeyword(keyword);
    setOffset(0);
    navigate('/recommend');
  };
  useEffect(() => {
    setRecentSearch(getRecentSearch());
  }, [downBarOpened]);

  return (
    <StHamburger
      className={downBarOpened ? 'downbar opened' : 'downbar closed'}
    >
      <StHamburgerContainerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>최근검색어</StHamburgerTitleTypo>
          <StHamburgerItemContainer>
            {recentSearch.map((__, index) => {
              if (index < 8) {
                return (
                  <StHamburgerRecentSearch>
                    <p
                      onClick={() => {
                        setMenuSearchCliked(false);
                        setDownBarOpened(false);
                        document.body.style.overflow = 'unset';
                        goSearch(recentSearch[recentSearch.length - 1 - index]);
                      }}
                    >
                      {recentSearch[recentSearch.length - 1 - index]}
                    </p>

                    <img
                      onClick={() =>
                        setRecentSearch(
                          deleteRecentSearch(
                            recentSearch[recentSearch.length - 1 - index],
                          ),
                        )
                      }
                      src={'/images/xForRecent.svg'}
                      alt="x"
                    />
                  </StHamburgerRecentSearch>
                );
              }
            })}
          </StHamburgerItemContainer>
        </StHamburgerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>추천장르</StHamburgerTitleTypo>
          <StHamburgerItemContainer>
            {data &&
              data.map((genre: Genres, index: number) => {
                if (index < 12) {
                  return (
                    <StHamburgerGenre
                      onClick={() => {
                        setMenuSearchCliked(false);
                        setDownBarOpened(false);
                        document.body.style.overflow = 'unset';
                        setGenresAnime([genre]);
                        navigate('/recommend');
                      }}
                    >
                      {genre}
                    </StHamburgerGenre>
                  );
                }
              })}
          </StHamburgerItemContainer>
        </StHamburgerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>추천검색어</StHamburgerTitleTypo>
          <StHamburgerItemContainer>
            <StHamburgerRecommend>최애의아이</StHamburgerRecommend>
            <StHamburgerRecommend>최애의아이</StHamburgerRecommend>
            <StHamburgerRecommend>최애의아이</StHamburgerRecommend>
          </StHamburgerItemContainer>
        </StHamburgerContainer>
      </StHamburgerContainerContainer>
    </StHamburger>
  );
};

const StHamburger = styled.div`
  position: fixed;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 4;
  overflow: scroll;
`;
const StHamburgerContainerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 52px;
  align-self: stretch;
  overflow: unset;
`;

const StHamburgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
const StHamburgerTitleTypo = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.24px;
`;
const StHamburgerItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const StHamburgerRecentSearch = styled.div`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid var(--main-light-2, #f3e7ff);
`;
const StHamburgerRecommend = styled.div`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: var(--main-light-2, #f3e7ff);
`;
const StHamburgerGenre = styled.div`
  display: flex;
  width: 84px;
  height: 60px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: var(--main-light-2, #f3e7ff);
  @media (max-width: 380px) {
    width: 60px;
    height: 42.8px;
  }
`;
export default DownBar;
