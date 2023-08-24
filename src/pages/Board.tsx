import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query'; // QueryKey 타입을 불러옵니다.
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

function Board() {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('/board/write');
  };

  const { data: posts, isLoading } = useQuery<ReadPosts[], unknown>(
    ['posts'],
    getPosts,
  );

  return (
    <div>
      <h1>게시판</h1>
      <S.Button onClick={handleWriteClick}>글 작성</S.Button>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : posts ? (
          <ul>
            {posts.map((post: ReadPosts) => (
              <S.Postbox key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </S.Postbox>
            ))}
          </ul>
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
}

export default Board;
