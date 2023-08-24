import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createPost } from '../api/boardapi';
import { Database } from '../types/supabase';

import { S } from './WriteBoard.style';
import { atom, useAtom, useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import { v4 as uuidv4 } from 'uuid';
type InsertPosts = Database['public']['Tables']['posts']['Insert'];

const WriteBoard = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const user = useAtomValue(userStore.user);

  // 입력값 받기
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 취소
  const cancellButton = () => {
    navigate('/board');
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      // 유효성 검사
      if (!category) {
        alert('카테고리를 선택해주세요.');
        return;
      }
      if (!title) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      // 날짜
      const currentTime = new Date();

      const year = currentTime.getFullYear();
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

      const newPost: InsertPosts = {
        id: uuidv4(),
        user_id: user.id,
        category: category as string,
        title,
        content,
        created_at: formattedDateTime,
      };

      console.log('💛💛💛', newPost);
      // DB 추가
      createMutation.mutate(newPost, {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
          // // 글 작성 후 게시판 페이지로 이동
          navigate(`/board/${newPost.id}`);
        },
        onError: (error) => {
          console.error('Error adding post:', error);
        },
      });

      // 페이지 이동
      // navigate(`/board/${newPost.id}`);
    }
  };

  return (
    <S.Layout>
      <S.Form onSubmit={onSubmitHandler}>
        <S.InputContainer>
          <S.Label>카테고리</S.Label>
          <S.Select onChange={onChangeCategory}>
            <option value={''}>카테고리를 선택해주세요.</option>
            <option value={'자유'}>자유</option>
            <option value={'애니'}>애니</option>
            <option value={'오류 신고'}>오류 신고</option>
          </S.Select>
        </S.InputContainer>
        <S.InputContainer>
          <S.Label>제목</S.Label>
          <S.Input
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요."
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.LabelContent>내용</S.LabelContent>
          <S.Textarea
            value={content}
            onChange={onChangeContent}
            placeholder="내용을 입력해주세요. "
          />
        </S.InputContainer>
        <S.ButtonContainer>
          <S.Button onClick={cancellButton}>취소</S.Button>
          <S.Button type="submit">등록</S.Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Layout>
  );
};

export default WriteBoard;
