import React, { SetStateAction, useCallback } from 'react';
import { S } from './animeSearch.styles';
import useInput from '../../../hooks/useInput';
import { useSetAtom } from 'jotai';
import {
  keywordAtom,
  offsetAtom,
  selectedCategoryAtom,
} from '../../../store/animeListStore';
import { AnimeG } from '../../../types/anime';

interface Props {
  setAnimeList: React.Dispatch<SetStateAction<AnimeG[]>>;
}

const AnimeSearch = ({ setAnimeList }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyword, __, onChangeKeyword] = useInput('');
  const setOffset = useSetAtom(offsetAtom);
  const setCategory = useSetAtom(selectedCategoryAtom);
  const setKeywordAtom = useSetAtom(keywordAtom);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = useCallback(() => {
    if (!keyword) {
      return;
    }
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
    setKeywordAtom(keyword);
    setCategory('전체');
    setAnimeList([]);
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <>
      <S.SearchContainer>
        <S.SearchInput
          placeholder="검색어를 입력해보세요!"
          onChange={onChangeKeyword}
          value={keyword}
          onKeyDown={handleKeyPress}
        />
        <S.SearchSVG
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          onClick={handleSearch}
        >
          <path
            d="M14.2474 15.5L8.9974 10.25C8.58073 10.5833 8.10156 10.8472 7.5599 11.0417C7.01823 11.2361 6.44184 11.3333 5.83073 11.3333C4.31684 11.3333 3.03559 10.809 1.98698 9.76042C0.938368 8.71181 0.414062 7.43056 0.414062 5.91667C0.414062 4.40278 0.938368 3.12153 1.98698 2.07292C3.03559 1.02431 4.31684 0.5 5.83073 0.5C7.34462 0.5 8.62587 1.02431 9.67448 2.07292C10.7231 3.12153 11.2474 4.40278 11.2474 5.91667C11.2474 6.52778 11.1502 7.10417 10.9557 7.64583C10.7613 8.1875 10.4974 8.66667 10.1641 9.08333L15.4141 14.3333L14.2474 15.5ZM5.83073 9.66667C6.8724 9.66667 7.75781 9.30208 8.48698 8.57292C9.21615 7.84375 9.58073 6.95833 9.58073 5.91667C9.58073 4.875 9.21615 3.98958 8.48698 3.26042C7.75781 2.53125 6.8724 2.16667 5.83073 2.16667C4.78906 2.16667 3.90365 2.53125 3.17448 3.26042C2.44531 3.98958 2.08073 4.875 2.08073 5.91667C2.08073 6.95833 2.44531 7.84375 3.17448 8.57292C3.90365 9.30208 4.78906 9.66667 5.83073 9.66667Z"
            fill="#C2C2C2"
          />
        </S.SearchSVG>
      </S.SearchContainer>
    </>
  );
};

export default AnimeSearch;
