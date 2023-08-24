import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const navigate = useNavigate();

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

  const { data: posts, isLoading } = useQuery<ReadPosts[]>(
    ['posts'],
    getPosts,
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
        <S.Button onClick={handleAniClick}>애니</S.Button>
        <S.Button onClick={handleFreeClick}>자유</S.Button>
        <S.Button onClick={handleErrorClick}>오류 신고</S.Button>
      </div>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : posts ? (
          <ul>
            {posts.map((post: ReadPosts) => (
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
