import React from 'react';
import Comments from '../components/Board/Comments';
import { useNavigate, useParams } from 'react-router-dom';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, updatePost, getPost } from '../api/boardapi';
import { useState } from 'react';
import { S } from '../pages/BoardDetail.style';
import * as userStore from '../store/userStore';

type ReadPosts = Database['public']['Tables']['posts']['Row'];
type UpdatePosts = Database['public']['Tables']['posts']['Update'];

const BoardDetail = () => {
  const user = useAtomValue(userStore.user);

  const navigate = useNavigate();

  // Post id 가져오기
  const { post_id } = useParams<{ post_id: string }>();

  // Post 상세조회
  const { data: posts } = useQuery<ReadPosts>(['posts'], () =>
    getPost(post_id!),
  );

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // // 뒤로가기
  // const backButton = () => {
  //   navigate(-1);
  // };

  // Post 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deleteButton = (id: string) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirm) {
      // DB 삭제
      deleteMutation.mutate(id);

      // 페이지 이동
      alert('삭제되었습니다!');
      navigate('/board');
    }
  };

  // Post 수정
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  const editButton = (posts: UpdatePosts) => {
    setIsEdit(!isEdit);
    // 수정된 Post 선언
    if (!isEdit) {
      setTitle(posts.title);
      setContent(posts.content);
    } else {
      const editPost = {
        ...posts,
        title,
        content,
      };
      updateMutation.mutate(editPost);
      setIsEdit(!isEdit);
    }
  };
  return (
    <S.Layout>
      {posts ? (
        <>
          {user?.id === posts.user_id && (
            <S.ButtonContainer>
              <div>
                <button onClick={() => deleteButton(posts.id!)}>삭제</button>
                <button onClick={() => editButton(posts)}>
                  {isEdit ? '저장' : '수정'}
                </button>
              </div>
            </S.ButtonContainer>
          )}
          <S.PostContainer key={posts.id}>
            <S.Category>{posts.category}</S.Category>
            {isEdit ? (
              <S.Box>
                <S.Input
                  value={title}
                  onChange={onChangeTitle}
                  style={{ fontSize: '24px', fontWeight: '500' }}
                />
              </S.Box>
            ) : (
              <S.Box>
                <S.Izz>{posts.created_at}</S.Izz>
                <S.Title>{posts.title}</S.Title>
              </S.Box>
            )}
            {isEdit ? (
              <S.Box>
                <S.Textarea value={content} onChange={onChangeContent} />
              </S.Box>
            ) : (
              <S.Content>{posts.content}</S.Content>
            )}
          </S.PostContainer>
          <Comments />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </S.Layout>
  );
};

export default BoardDetail;
