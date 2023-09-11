import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as animeRecommendStore from '../store/animeRecommendStore';
import * as headerStore from '../store/headerStore';
import * as sidebarStore from '../store/sidebarStore';
type Props = {};

const DownBar = (props: Props) => {
  const [downBarOpened, setDownBarOpened] = useAtom(sidebarStore.downBarOpened);
  const [menuSearchClicked, setMenuSearchCliked] = useAtom(
    headerStore.searchMobileClicked,
  );
  const setKeyword = useSetAtom(animeRecommendStore.keywordAtom);
  const setAnimeList = useSetAtom(animeRecommendStore.animeListAtom);
  const setOffset = useSetAtom(animeRecommendStore.offsetAtom);
  const [recentSearch, setRecentSearch] = useState<Array<string>>([]);
  const searchAndSetRecentSearch = (keyword: string) => {
    const recentSearch: Array<string> | null = JSON.parse(
      localStorage.getItem('recentSearch')!,
    );
    if (recentSearch) {
      recentSearch.push(keyword);
      const stringifiedArr = JSON.stringify(recentSearch);
      localStorage.setItem('recentSearch', stringifiedArr);
    } else {
      const stringifiedArr = JSON.stringify([keyword]);
      localStorage.setItem('recentSearch', stringifiedArr);
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
  const navigate = useNavigate();
  return (
    <StHamburger
      className={downBarOpened ? 'downbar opened' : 'downbar closed'}
    >
      <StHamburgerContainerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>최근검색어</StHamburgerTitleTypo>
          <StHamburgerRecentSearchContainer>
            {recentSearch.map((__, index) => {
              if (index < 8) {
                return (
                  <StHamburgerRecentSearch
                    onClick={() => {
                      setMenuSearchCliked(false);
                      setDownBarOpened(false);
                      document.body.style.overflow = 'unset';
                      goSearch(recentSearch[recentSearch.length - 1 - index]);
                    }}
                  >
                    {recentSearch[recentSearch.length - 1 - index]}
                  </StHamburgerRecentSearch>
                );
              }
            })}
          </StHamburgerRecentSearchContainer>
        </StHamburgerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>추천장르</StHamburgerTitleTypo>
        </StHamburgerContainer>
        <StHamburgerContainer>
          <StHamburgerTitleTypo>추천검색어</StHamburgerTitleTypo>
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
  z-index: 3;
`;
const StHamburgerContainerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 52px;
  align-self: stretch;
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
const StHamburgerRecentSearchContainer = styled.div`
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
const StHamburgerRecommendContainer = styled.div``;
export default DownBar;
