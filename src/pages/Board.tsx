import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/boardapi';
import { S } from '../pages/Board.style';

function Board() {
  const navigate = useNavigate(); // useNavigate hook 사용
  const { data: posts = [] } = useQuery(['posts'], getPosts);

  const handleWriteClick = () => {
    navigate('/board/write'); // 버튼 클릭 시 페이지 이동
  };

  return (
    <div>
      <h1>게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <S.Button onClick={handleWriteClick}>글 작성</S.Button>
    </div>
  );
}

export default Board;
