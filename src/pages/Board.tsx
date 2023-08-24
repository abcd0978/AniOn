import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';
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

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`); // 게시글을 클릭했을 때 해당 게시글의 상세 페이지로 이동합니다.
  };

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
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
}

export default Board;
