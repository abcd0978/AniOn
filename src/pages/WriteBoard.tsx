import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createPost } from '../api/boardapi';
import { Database } from '../types/supabase';
import EditorComponent from '../components/editor/EditorComponent';
import { S } from './WriteBoard.style';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import { v4 as uuidv4 } from 'uuid';
import useViewport from '../hooks/useViewPort';
import { toast } from 'react-toastify';
import { updatePoint } from '../api/items';
import { useConfirm } from '../hooks/useConfirm';
type InsertPosts = Database['public']['Tables']['posts']['Insert'];

const WriteBoard = () => {
  const { width } = useViewport();
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const user = useAtomValue(userStore.user);
  const { openConfirm } = useConfirm();

  // 입력값 받기
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setTitle(inputValue);
    } else {
      toast.warning('20자 이하로 입력해주세요!', {
        autoClose: 800,
      });
    }
  };

  // 취소
  const cancelButton = () => {
    const backConfirmData = {
      title: '게시물 작성 취소',
      content: '정말 취소하실건가요?',
      callback: () => {
        navigate('/board');
        toast.success('작성을 취소했습니다❗', {
          autoClose: 800,
        });
      },
    };
    openConfirm(backConfirmData);
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
    const processBody = (bodyStr: string) => {
      let result = '';
      result = bodyStr
        .replace(/\n/g, '')
        .replace(/<[^>]*>?/g, '')
        .replace(/&nbsp;/gi, '');
      return result;
    };
    const getImg = (bodyStr: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(bodyStr, 'text/html');
      const img = doc.querySelector<HTMLImageElement>('img[src]');
      const src = img?.src;
      return src ? src : null;
    };
    if (user) {
      // 유효성 검사
      if (!category) {
        toast.warning('카테고리를 선택해주세요!', {
          autoClose: 800,
        });
        return;
      }

      if (!title) {
        toast.warning('제목을 입력해주세요!', {
          autoClose: 800,
        });
        return;
      }
      if (!content) {
        toast.warning('내용을 입력해주세요!', {
          autoClose: 800,
        });
        return;
      }

      if (processBody(content).length < 10) {
        toast.warning('내용은 10자 이상 입력해주세요!', {
          autoClose: 800,
        });
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
        thumbnail: getImg(content),
      };

      // DB 추가
      createMutation.mutate(newPost, {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
          updatePoint({ userId: user.id, point: 3 });
          toast.success('글작성 성공! 💰3포인트 적립');
          // // 글 작성 후 게시판 페이지로 이동
          navigate(`/board/${newPost.id}`);
        },
        onError: (error) => {
          console.error('Error adding post:', error);
        },
      });
    }
  };

  return (
    <S.Container width={width}>
      <S.Title>게시글 작성하기</S.Title>
      <S.Layout>
        <S.Form onSubmit={onSubmitHandler}>
          <S.CateInput>
            <S.Label>카테고리</S.Label>
            <S.Select onChange={onChangeCategory}>
              <option value={''}>카테고리를 선택해주세요.</option>
              <option value={'자유'}>자유</option>
              <option value={'애니'}>애니</option>
              <option value={'오류 신고'}>오류 신고</option>
            </S.Select>
          </S.CateInput>
          <S.TitleInput>
            <S.Label>제목</S.Label>
            <S.Input
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력해주세요."
            />
          </S.TitleInput>
          <S.ContentInput>
            <S.LabelContent>
              내용
              <br />
              (10자 이상)
            </S.LabelContent>

            <EditorComponent onChange={setContent} />
          </S.ContentInput>
          <S.ButtonContainer>
            <S.Button onClick={cancelButton}>취소</S.Button>
            <S.SubmitButton type="submit">등록</S.SubmitButton>
          </S.ButtonContainer>
        </S.Form>
      </S.Layout>
    </S.Container>
  );
};

export default WriteBoard;
