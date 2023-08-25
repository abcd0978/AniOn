import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleWriteClick = () => {
    navigate('/board/write');
  };
  const handleAniClick = () => {
    navigate('/ani');
  };
  const handleFreeClick = () => {
    navigate('/free');
  };
  const handleErrorClick = () => {
    navigate('/error');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useQuery<ReadPosts[]>(
    ['posts', selectedCategory],
    () => getPosts(selectedCategory || ''),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleMenuClick = (menu: string) => {
    navigate(`/menu/${menu}`);
  };

  return (
    <div>
      <S.Title>게시판</S.Title>
      <S.WriteButton onClick={handleWriteClick}>글 작성</S.WriteButton>

      <div>
        <S.Button onClick={() => handleCategoryClick('애니')}>애니</S.Button>
        <S.Button onClick={() => handleCategoryClick('자유')}>자유</S.Button>
        <S.Button onClick={() => handleCategoryClick('오류 신고')}>
          오류 신고
        </S.Button>
      </div>

      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : posts ? (
          <ul>
            {posts
              .filter(
                (post) =>
                  !selectedCategory || post.category === selectedCategory,
              ) // 필터링 추가
              .map((post: ReadPosts) => (
                <S.Postbox
                  key={post.id}
                  onClick={() => post.id && handlePostClick(post.id.toString())}
                >
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </S.Postbox>
              ))}
          </ul>
        ) : (
          <div>로딩중</div>
        )}
      </div>
    </div>
  );
};

export default Board;
