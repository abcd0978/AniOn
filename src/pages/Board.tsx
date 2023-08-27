import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleWriteClick = () => {
    navigate('/board/write');
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const {
    data: postsAndTotalPages,
    isLoading,
    isFetching,
  } = useQuery<{ data: ReadPosts[]; totalPages: number }>(
    ['posts', selectedCategory, searchKeyword, page],
    () => getPosts(selectedCategory || '', page),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: any) => prev - 1);
      return;
    }
    if (selected === 'next' && postsAndTotalPages?.totalPages) {
      setPage((prev: any) => prev + 1);
      return;
    }
  };

  // 검색 결과에 따라 게시물 리스트를 필터링
  const filteredPosts: ReadPosts[] | undefined =
    postsAndTotalPages?.data?.filter(
      (post: any) =>
        post.title.includes(searchKeyword) ||
        post.content.includes(searchKeyword),
    );

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setSelectedCategory(null);
    queryClient.invalidateQueries(['posts', null, searchKeyword]);
  };

  return (
    <div>
      <S.Title>게시판</S.Title>
      <S.WriteButton onClick={handleWriteClick}>글 작성</S.WriteButton>
      <div>
        <S.Button
          onClick={handleAllClick}
          style={{
            backgroundColor: selectedCategory === null ? '#8200FF' : '#f3e7ff',
            color: selectedCategory === null ? '#ffffff' : 'black',
          }}
        >
          전체
        </S.Button>
        <S.Button
          onClick={() => handleCategoryClick('애니')}
          style={{
            backgroundColor:
              selectedCategory === '애니' ? '#8200FF' : '#f3e7ff',
            color: selectedCategory === '애니' ? '#ffffff' : 'black',
          }}
        >
          애니
        </S.Button>
        <S.Button
          onClick={() => handleCategoryClick('자유')}
          style={{
            backgroundColor:
              selectedCategory === '자유' ? '#8200FF' : '#f3e7ff',
            color: selectedCategory === '자유' ? '#ffffff' : 'black',
          }}
        >
          자유
        </S.Button>
        <S.Button
          onClick={() => handleCategoryClick('오류 신고')}
          style={{
            backgroundColor:
              selectedCategory === '오류 신고' ? '#8200FF' : '#f3e7ff',
            color: selectedCategory === '오류 신고' ? '#ffffff' : 'black',
          }}
        >
          오류 신고
        </S.Button>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요!"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      <ul>
        {isFetching ? (
          <div>Loading...</div>
        ) : filteredPosts ? (
          filteredPosts.map((post: ReadPosts) => (
            <S.Postbox
              key={post.id}
              onClick={() => post.id && handlePostClick(post.id.toString())}
            >
              <p>{post.users?.nickname}</p>
              <S.Img src={post.users?.profile_img_url} alt="프로필 이미지" />
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p> {new Date(post.created_at).toLocaleString()}</p>
            </S.Postbox>
          ))
        ) : (
          <div>검색 결과 없음</div>
        )}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={postsAndTotalPages?.totalPages || 1}
        onClick={onClickPage}
      />
    </div>
  );
};

export default Board;
