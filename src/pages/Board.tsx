import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { S } from '../pages/Board.style';

function Board() {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('/board/write');
  };

  return (
    <div>
      <h1>게시판</h1>

      <S.Button onClick={handleWriteClick}>글 작성</S.Button>
    </div>
  );
}

export default Board;
