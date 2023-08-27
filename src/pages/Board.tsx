import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

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
    data: posts,
    isLoading,
    isFetching,
  } = useQuery<ReadPosts[]>(
    ['posts', selectedCategory, searchKeyword],
    () => getPosts(selectedCategory || ''),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );

  // 검색 결과에 따라 게시물 리스트를 필터링
  const filteredPosts = posts?.filter(
    (post) =>
      post.title.includes(searchKeyword) ||
      post.content.includes(searchKeyword),
  );

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      // 검색어가 공백이라면
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
        <S.Button onClick={handleAllClick}>전체</S.Button>
        <S.Button onClick={() => handleCategoryClick('애니')}>애니</S.Button>
        <S.Button onClick={() => handleCategoryClick('자유')}>자유</S.Button>
        <S.Button onClick={() => handleCategoryClick('오류 신고')}>
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
    </div>
  );
};

export default Board;
