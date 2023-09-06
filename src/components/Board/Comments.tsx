import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Pagination from '../Pagenation';
import * as S from './Comments.Styles';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from '../../api/commentapi';
import ProfileWithBorder, { processItem } from '../ProfileWithBorder';
import * as userStore from '../../store/userStore';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import {
  CommentType,
  InsertPostComment,
  UpdatePostComment,
} from '../../types/comment';
import { updatePoint } from '../../api/items';

const Comments = () => {
  const { post_id } = useParams() as { post_id: string };

  const user = useAtomValue(userStore.user);

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>('');

  const [editingCommentId, setEditingCommentId] = useState<string | null>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  // 로그인 여부 체크
  const isLoggedIn = !!user;
  // 로그인하지 않은 경우 댓글 입력 상태 변수에 메시지와 글씨를 설정
  const commentInputPlaceholder = isLoggedIn
    ? '댓글을 작성해주세요!'
    : '리뷰는 로그인/회원가입 후 이용해주세요.';

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
      updatePoint({ userId: user?.id!, point: 1 });
      toast.success(
        '댓글이 작성되었습니다!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 💰1포인트 적립',
        {
          autoClose: 800,
        },
      );
    },
  });

  const handleCommentSubmit = () => {
    if (!user) {
      toast.warning('로그인 후 댓글 작성이 가능해요🙄', {
        autoClose: 800,
      });
      return;
    }
    if (!newComment) {
      toast.warning('댓글을 작성해주세요💜', {
        autoClose: 800,
      });
      return;
    }

    //생성
    const createComment: InsertPostComment = {
      comment: newComment,
      post_id: post_id as string,
      user_id: user.id,
    };

    addMutation.mutate(createComment);
    setNewComment('');
  };

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
      toast.success('삭제 되었습니다~!', {
        autoClose: 800,
      });
    },
  });
  const handleCommentDelete = async (commentId: string) => {
    const shouldDelete = window.confirm('삭제 하시겠습니까?');
    if (shouldDelete) {
      deleteMutation.mutate(commentId);
    }
  };

  const editMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
  });

  const handleCommentEdit = (comment: UpdatePostComment) => {
    if (editingCommentId === comment.id) {
      const editComment = {
        ...comment,

        comment: editedCommentText,
      };

      editMutation.mutate(editComment);
      setEditingCommentId(null);
    } else {
      setEditingCommentId(comment.id!);
      setEditedCommentText(comment.comment);
    }
  };

  const [page, setPage] = useState<number>(1);

  const { data: postCommentsData } = useQuery(
    ['post_comments', post_id, page],
    () => {
      if (post_id) {
        return fetchComments(post_id, page);
      }
      return Promise.resolve({ data: [], totalPages: 1 });
    },
    { keepPreviousData: true },
  );

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: number) => prev - 1);
      return;
    }
    if (selected === 'next' && page < postCommentsData?.totalPages!) {
      setPage((prev: number) => prev + 1);
      return;
    }
  };
  // 이전 페이지 버튼 비활성화 여부 계산
  const isPreviousDisabled = page === 1;

  // 다음 페이지 버튼 비활성화 여부 계산
  const isNextDisabled = page >= (postCommentsData?.totalPages ?? 1);

  return (
    <S.Outer>
      <S.CommentContainer>
        <S.CommentTitle>댓글</S.CommentTitle>
        <S.CommentTop>
          <S.WriteInput
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit();
              }
            }}
            placeholder={commentInputPlaceholder}
            disabled={!isLoggedIn}
          />
          {isLoggedIn && (
            <S.WriteButton onClick={handleCommentSubmit} disabled={!isLoggedIn}>
              등록
            </S.WriteButton>
          )}
        </S.CommentTop>
        <S.CommentBot>
          {postCommentsData?.data!.map((comment: CommentType) => (
            <S.Comment key={comment.id}>
              <div>
                <S.profile>
                  <ProfileWithBorder
                    width={75}
                    $mediawidth={1920}
                    border_img_url={
                      comment.users.inventory.length > 0
                        ? processItem(comment.users.inventory).border
                        : undefined
                    }
                    profile_img_url={comment.users?.profile_img_url}
                    key={comment.id!}
                  />
                  <S.Ninkname>{comment.users.nickname}</S.Ninkname>
                  {/* <S.Award> */}
                  {comment.users.inventory.length > 0 ? (
                    <S.Award
                      src={processItem(comment.users.inventory).award.img_url!}
                      alt={processItem(comment.users.inventory).award.name!}
                      style={{ width: '172px', height: '32px' }}
                    />
                  ) : (
                    '칭호없음'
                  )}
                  {/* </S.Award> */}
                </S.profile>
                <S.CommentDate>
                  {new Date(comment.created_at).toLocaleString()}
                </S.CommentDate>
              </div>
              {user?.id === comment.user_id && (
                <S.ButtonBox>
                  {comment.id === editingCommentId ? (
                    <>
                      <S.button onClick={() => handleCommentEdit(comment)}>
                        저장
                      </S.button>
                      <S.button onClick={() => setEditingCommentId(null)}>
                        취소
                      </S.button>
                    </>
                  ) : (
                    <>
                      <S.button onClick={() => handleCommentEdit(comment)}>
                        수정
                      </S.button>
                      <S.button onClick={() => handleCommentDelete(comment.id)}>
                        삭제
                      </S.button>
                    </>
                  )}
                </S.ButtonBox>
              )}
              {comment.id === editingCommentId ? (
                <S.EditInput
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <S.CommentBox>{comment.comment}</S.CommentBox>
              )}
            </S.Comment>
          ))}
          <S.Page>
            <Pagination
              currentPage={page}
              totalPages={postCommentsData?.totalPages ?? 1}
              onClick={onClickPage}
              isPreviousDisabled={isPreviousDisabled}
              isNextDisabled={isNextDisabled}
            />
          </S.Page>
        </S.CommentBot>
      </S.CommentContainer>
    </S.Outer>
  );
};

export default Comments;
