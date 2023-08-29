import React, { useEffect } from 'react';
import Comments from '../components/Board/Comments';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Database } from '../types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deletePost,
  updatePost,
  getPost,
  getLikesForPost,
  createLike,
  deleteLike,
  getLikeForPost,
} from '../api/boardapi';
import { useState } from 'react';
import { S } from '../pages/BoardDetail.style';
import * as userStore from '../store/userStore';
import filledLike from '../assets/filledLike.svg';
import unfilledLike from '../assets/unfilledLike.svg';

type ReadPosts = Database['public']['Tables']['posts']['Row'];
type UpdatePosts = Database['public']['Tables']['posts']['Update'];
type Like = Database['public']['Tables']['likes']['Row'];

const BoardDetail = () => {
  const user = useAtomValue(userStore.user);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');
  const [existingLike, setExistingLike] = useState<boolean>(false);

  // Post id 가져오기
  const { post_id } = useParams<{ post_id: string }>();

  // Likes 상태 추가
  const [likes, setLikes] = useState<Like[]>([]);

  // Post 상세조회
  const { data: posts, refetch: refetchPost } = useQuery<ReadPosts>(
    ['post'],
    () => getPost(post_id!),
  );

  //전에 좋아요를 눌렀는지 확인
  const { data: like } = useQuery(
    ['like', user],
    () => getLikeForPost({ post_id, user_id: user?.id }),
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    },
  );

  console.log('보드 디테일 like', like);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (posts && !isEdit) {
      // 수정 중이 아닐 때만 게시물 정보 업데이트
      setTitle(posts.title);
      setContent(posts.content);
      setCategory(posts.category);
      setEditCategory(posts.category);
    }
  }, [isEdit, posts]);

  // Post 삭제
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
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
      refetchPost(); // 수정 후 데이터 리패치
      setIsEdit(false); // 수정 모드 종료
    },
  });

  const editButton = (posts: UpdatePosts) => {
    if (!isEdit) {
      setTitle(posts.title);
      setContent(posts.content);
      setEditCategory(posts.category || '');
    } else {
      const editPost = {
        ...posts,
        title,
        content,
        category: editCategory,
      };
      updateMutation.mutate(editPost);
    }
    setIsEdit(!isEdit);
  };

  const insertLikeMutation = useMutation(createLike, {
    onSuccess: () => queryClient.invalidateQueries(['like']),
  });

  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: () => queryClient.invalidateQueries(['like']),
  });

  //좋아요
  const toggleLike = async () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    // mutation 추가
    if (like?.length !== 0) {
      if (!like) {
        return;
      }
      deleteLikeMutation.mutate(like[0].id);
    } else {
      insertLikeMutation.mutate({ post_id: post_id!, user_id: user.id });
    }

    // 좋아요 정보 업데이트
    if (posts) {
      const updatedLikes = await getLikesForPost(posts.id!);
      setLikes(updatedLikes as Like[]);
    }

    // 새로운 게시물 정보를 불러와 업데이트
    const updatedPosts = await getPost(post_id!);
    queryClient.setQueryData(['posts', post_id], updatedPosts);
    // setExistingLike(!existingLike);
  };

  return (
    <S.Layout>
      {posts ? (
        <>
          {user?.id === posts.user_id && (
            <S.ButtonContainer>
              <S.Button
                onClick={() => deleteButton(posts.id!)}
                style={{ backgroundColor: '#dddddd' }}
              >
                삭제
              </S.Button>
              <S.Button
                onClick={() => editButton(posts)}
                style={{
                  backgroundColor: isEdit ? '#8200FF' : '#dddddd',
                  color: isEdit ? 'white' : 'black',
                }}
              >
                {isEdit ? '저장' : '수정'}
              </S.Button>
            </S.ButtonContainer>
          )}

          <S.PostContainer key={posts.id}>
            {isEdit ? (
              <S.Box>
                <S.Select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="애니">애니</option>
                  <option value="자유">자유</option>
                  <option value="오류 신고">오류 신고</option>
                </S.Select>
              </S.Box>
            ) : (
              <S.Category>{category}</S.Category>
            )}
            {isEdit ? (
              <S.Box>
                <S.Input value={title} onChange={onChangeTitle} />
              </S.Box>
            ) : (
              <S.Box>
                <S.Date> {new Date(posts.created_at).toLocaleString()}</S.Date>
                <S.Like onClick={toggleLike}>
                  {like?.length ? (
                    <img src={filledLike} alt="좋아요" />
                  ) : (
                    <img src={unfilledLike} alt="좋아요 취소" />
                  )}
                </S.Like>
                <S.Title>{title}</S.Title>
                <S.User>
                  <S.Img
                    src={posts.users?.profile_img_url}
                    alt="프로필 이미지"
                  />
                  <S.Nickname>{posts.users?.nickname}</S.Nickname>
                </S.User>
              </S.Box>
            )}

            {isEdit ? (
              <S.Box>
                <S.Textarea value={content} onChange={onChangeContent} />
              </S.Box>
            ) : (
              <S.Content
                dangerouslySetInnerHTML={{ __html: posts.content }}
              ></S.Content>
            )}
          </S.PostContainer>

          {!isEdit && <Comments />}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </S.Layout>
  );
};

export default BoardDetail;
