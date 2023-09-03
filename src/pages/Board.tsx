import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import pencil from '../assets/pencil.svg';
import search from '../assets/search.svg';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;
  const [categoryPage, setCategoryPage] = useState<number | null>(null);

  const handleWriteClick = () => {
    if (!user) {
      toast.warning('로그인 후에 작성할 수 있습니다! 로그인 해주세요😳', {
        autoClose: 1000,
      });
    } else {
      navigate('/board/write');
    }
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
    setPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const getItemsPerPage = () => {
    return 12;
  };

  const {
    data: postsAndTotalPages,
    isLoading,
    isFetching,
  } = useQuery<{ data: ReadPosts[]; totalPages: number }>(
    ['posts', selectedCategory, searchKeyword, page, itemsPerPage],
    () => getPosts(selectedCategory || '', page, itemsPerPage),
    {
      onError: (error) => {
        console.error('게시물을 불러오는 중 에러 발생:', error);
      },
    },
  );

  useEffect(() => {
    // 애니 카테고리에 따라 페이지 수를 동적으로 설정
    if (selectedCategory === '애니' && postsAndTotalPages) {
      const totalPostsCount = postsAndTotalPages.totalPages * itemsPerPage;
      const aniCategoryPostsCount = postsAndTotalPages.data.filter(
        (post) => post.category === '애니',
      ).length;

      // 애니 카테고리의 글 수를 기반으로 페이지 수 설정
      setCategoryPage(Math.ceil(aniCategoryPostsCount / itemsPerPage) || 1);
    } else {
      setCategoryPage(null);
    }
  }, [selectedCategory, postsAndTotalPages]);

  // 자유 카테고리 페이지 수 계산
  const freeCategoryPostsCount = postsAndTotalPages?.data.filter(
    (post) => post.category === '자유',
  ).length;
  const freeCategoryPages = Math.ceil(
    (freeCategoryPostsCount || 0) / itemsPerPage,
  );

  // 오류 신고 카테고리 페이지 수 계산
  const errorCategoryPostsCount = postsAndTotalPages?.data.filter(
    (post) => post.category === '오류 신고',
  ).length;
  const errorCategoryPages = Math.ceil(
    (errorCategoryPostsCount || 0) / itemsPerPage,
  );

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev) => prev - 1);
      return;
    }
    if (selected === 'next' && postsAndTotalPages?.totalPages) {
      setPage((prev) => prev + 1);
      return;
    }
  };

  // 검색 결과에 따라 게시물 리스트를 필터링하고 정렬
  const filteredAndSortedPosts: ReadPosts[] | undefined = useMemo(() => {
    if (!postsAndTotalPages?.data) return undefined;

    return postsAndTotalPages.data
      .filter((post: ReadPosts) => {
        const postTitleIncludesKeyword = post.title.includes(searchKeyword);
        const postContentIncludesKeyword = post.content.includes(searchKeyword);
        const postUserNicknameIncludesKeyword =
          post.users?.nickname?.includes(searchKeyword) ?? false;

        return (
          postTitleIncludesKeyword ||
          postContentIncludesKeyword ||
          postUserNicknameIncludesKeyword
        );
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [postsAndTotalPages, searchKeyword]);

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSelectedCategory(null);
    queryClient.invalidateQueries(['posts', null, searchKeyword]);
  };

  // 카테고리 변경 시 페이지를 1로 설정합니다.
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  return (
    <S.Container>
      <S.Title>게시판</S.Title>
      <S.Post>
        <S.Search>
          <S.Button
            onClick={handleAllClick}
            style={{
              backgroundColor:
                selectedCategory === null ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === null ? '#ffffff' : 'black',
            }}
          >
            전체
          </S.Button>
          <S.Button
            onClick={() => handleCategoryClick('애니')}
            style={{
              backgroundColor:
                selectedCategory === '애니' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '애니' ? '#ffffff' : 'black',
            }}
          >
            애니
          </S.Button>
          <S.Button
            onClick={() => handleCategoryClick('자유')}
            style={{
              backgroundColor:
                selectedCategory === '자유' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '자유' ? '#ffffff' : 'black',
            }}
          >
            자유
          </S.Button>

          <S.Button
            onClick={() => handleCategoryClick('오류 신고')}
            style={{
              backgroundColor:
                selectedCategory === '오류 신고' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '오류 신고' ? '#ffffff' : 'black',
            }}
          >
            오류 신고
          </S.Button>
        </S.Search>
        <S.Write>
          <form onSubmit={handleSearchSubmit}>
            <S.SearchInputContainer>
              <S.SearchInput
                type="text"
                placeholder="검색어를 입력해주세요!"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <S.SearchIcon src={search} alt="Search Icon" />
            </S.SearchInputContainer>
          </form>
          <S.WriteButton onClick={handleWriteClick}>
            <img src={pencil} /> 작성하기
          </S.WriteButton>
        </S.Write>
      </S.Post>

      <ul>
        <S.Header>
          <S.HeaderNo> NO.</S.HeaderNo>
          <S.HeaderTitle> 게시글 제목</S.HeaderTitle>
          <S.HeaderNick>유저 닉네임</S.HeaderNick>
          <S.Headerdate>작성일자</S.Headerdate>
          <S.HeaderLike> 추천수</S.HeaderLike>
        </S.Header>

        {isFetching ? (
          <div>로딩중...</div>
        ) : filteredAndSortedPosts ? (
          filteredAndSortedPosts.map((post: ReadPosts, index: number) => (
            <S.Postbox
              key={post.id}
              onClick={() => post.id && handlePostClick(post.id.toString())}
            >
              <S.BottomNo>{filteredAndSortedPosts.length - index}</S.BottomNo>
              <S.BottomTitle>{post.title}</S.BottomTitle>

              <S.BottomNick>
                <S.Img src={post.users?.profile_img_url} alt="프로필 이미지" />
                <div>{post.users?.nickname}</div>
              </S.BottomNick>
              <S.Bottomdate>
                {new Date(post.created_at).toLocaleString()}
              </S.Bottomdate>
              <S.BottomLike>{post.likes?.length}</S.BottomLike>
            </S.Postbox>
          ))
        ) : (
          <div>검색 결과 없음</div>
        )}
      </ul>

      <S.Page>
        {selectedCategory === '오류 신고' && errorCategoryPages && (
          <Pagination
            currentPage={page}
            totalPages={errorCategoryPages}
            onClick={onClickPage}
            isPreviousDisabled={page === 1}
            isNextDisabled={page >= errorCategoryPages}
          />
        )}
        {selectedCategory === '자유' && freeCategoryPages && (
          <Pagination
            currentPage={page}
            totalPages={freeCategoryPages}
            onClick={onClickPage}
            isPreviousDisabled={page === 1}
            isNextDisabled={page >= freeCategoryPages}
          />
        )}
        {selectedCategory === '애니' && categoryPage && (
          <Pagination
            currentPage={page}
            totalPages={categoryPage}
            onClick={onClickPage}
            isPreviousDisabled={page === 1}
            isNextDisabled={page >= categoryPage}
          />
        )}
        {selectedCategory === null && postsAndTotalPages && (
          <Pagination
            currentPage={page}
            totalPages={postsAndTotalPages.totalPages}
            onClick={onClickPage}
            isPreviousDisabled={page === 1}
            isNextDisabled={page >= postsAndTotalPages.totalPages}
          />
        )}
      </S.Page>
    </S.Container>
  );
};

export default Board;
