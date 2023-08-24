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
          <div>로딩중</div>
        )}
      </div>
    </div>
  );
};

export default Board;
