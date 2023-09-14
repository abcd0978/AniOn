import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Pagination from '../Pagenation';
import * as S from './Comments.Styles';
import * as commentApi from '../../api/commentapi';
import ProfileWithBorder, { processItem } from '../ProfileWithBorder';
import * as userStore from '../../store/userStore';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import commentpointer from '../../assets/commentpointer.svg';
import commentpointerUp from '../../assets/commentPointerUp.svg';
import {
  CommentType,
  InsertPostComment,
  UpdatePostComment,
} from '../../types/comment';
import { updatePoint } from '../../api/items';
import { useConfirm } from '../../hooks/useConfirm';
import useViewport from '../../hooks/useViewPort';
import ReplyComment from './reply/ReplyComment';

const Comments = () => {
  const { post_id } = useParams() as { post_id: string };
  const [collapsedComments, setCollapsedComments] = useState<string[]>([]); //더보기
  const user = useAtomValue(userStore.user);

  const queryClient = useQueryClient();
  const { openConfirm } = useConfirm();
  const { isMobile } = useViewport();

  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  // 대댓글
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingId, setReplyingId] = useState<string | null>(null);

  // 로그인 여부 체크
  const isLoggedIn = !!user;
  // 로그인하지 않은 경우 댓글 입력 상태 변수에 메시지와 글씨를 설정
  const commentInputPlaceholder = isLoggedIn
    ? '댓글을 작성해주세요!'
    : '리뷰는 로그인/회원가입 후 이용해주세요.';

  const addMutation = useMutation(commentApi.addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
      queryClient.invalidateQueries(['posts']);
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

  const deleteMutation = useMutation(commentApi.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
  });
  const handleCommentDelete = async (commentId: string) => {
    const deleteConfirmData = {
      title: '댓글 삭제',
      content: '정말 삭제하실건가요?',
      callback: () => {
        deleteMutation.mutate(commentId);
        toast.success('댓글을 삭제했습니다❗', {
          autoClose: 800,
        });
      },
    };

    openConfirm(deleteConfirmData);
  };

  const editMutation = useMutation(commentApi.updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
  });

  const handleCommentEdit = (comment: UpdatePostComment) => {
    if (editingCommentId === comment.id) {
      // 수정 할 내용 빈 input 일 경우
      if (!editedCommentText) {
        // 이전 댓글 내용으로 복원
        setEditedCommentText(comment.comment);
        setEditingCommentId(null);
      } else if (editedCommentText === comment.comment) {
        setEditedCommentText(comment.comment);
        setEditingCommentId(null);
      } else {
        const editComment = {
          ...comment,
          comment: editedCommentText,
        };
        const editConfirmData = {
          title: '댓글 수정',
          content: '댓글을 수정 할까요?',
          callback: () => {
            editMutation.mutate(editComment);
            setEditingCommentId(null);
            toast.success('댓글을 수정했습니다❗', {
              autoClose: 800,
            });
          },
        };

        openConfirm(editConfirmData);
      }
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
        return commentApi.fetchComments(post_id, page);
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

  //더보기
  const toggleCommentCollapse = (commentId: string) => {
    if (collapsedComments.includes(commentId)) {
      // 댓글을 펼칩니다.
      setCollapsedComments(collapsedComments.filter((id) => id !== commentId));
    } else {
      // 댓글을 접습니다.
      setCollapsedComments([...collapsedComments, commentId]);
    }
  };

  const handleReplyButtonClick = (commentId: string) => {
    if (!user) {
      toast.warning('로그인 후 사용이 가능해요🙄', {
        autoClose: 800,
      });
      return;
    }
    if (isReplying) {
      setIsReplying(false);
      setReplyingId(null);
    } else {
      setIsReplying(true);
      setReplyingId(commentId);
    }
  };

  return (
    <S.Outer>
      <S.CommentContainer>
        <S.CommentTitle>댓글</S.CommentTitle>
        <S.CommentTop>
          <S.WriteInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
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
            <React.Fragment key={comment.id}>
              <S.Comment>
                <S.CommentInfo>
                  <S.Profile>
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
                    {comment.users.inventory.length > 0 &&
                    processItem(comment.users.inventory).award.img_url ? (
                      <S.Award
                        src={
                          processItem(comment.users.inventory).award.img_url!
                        }
                        alt={processItem(comment.users.inventory).award.name!}
                      />
                    ) : (
                      <S.AwardNo>칭호없음</S.AwardNo>
                    )}
                  </S.Profile>
                  {!isMobile && (
                    <S.CommentDate>
                      {new Date(comment.created_at).toLocaleString()}
                    </S.CommentDate>
                  )}
                </S.CommentInfo>
                {comment.id === editingCommentId ? (
                  <S.EditInput
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                ) : (
                  //더보기
                  <S.CommentBox>
                    {comment.comment.length > 250 &&
                    !collapsedComments.includes(comment.id) ? (
                      <>
                        {comment.comment.slice(0, 250)}
                        <S.CommentMore
                          onClick={() => toggleCommentCollapse(comment.id)}
                        >
                          댓글 더보기 <img src={commentpointer} alt="더보기" />
                        </S.CommentMore>
                      </>
                    ) : (
                      <>
                        {comment.comment}
                        {comment.comment.length > 250 && (
                          <S.CommentMore
                            onClick={() => toggleCommentCollapse(comment.id)}
                          >
                            접기 <img src={commentpointerUp} alt="접기" />
                          </S.CommentMore>
                        )}
                      </>
                    )}
                    {isMobile && ( // 모바일일 때 날짜
                      <S.MobieDate>
                        {new Date(comment.created_at).toLocaleString()}
                      </S.MobieDate>
                    )}
                  </S.CommentBox>
                )}
                <S.ReplyButton>
                  <S.button onClick={() => handleReplyButtonClick(comment.id)}>
                    답글달기
                  </S.button>
                </S.ReplyButton>
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
                        <S.button
                          onClick={() => handleCommentDelete(comment.id)}
                        >
                          삭제
                        </S.button>
                      </>
                    )}
                  </S.ButtonBox>
                )}
              </S.Comment>
              <ReplyComment
                postId={post_id}
                commentId={comment.id}
                isReplying={isReplying}
                setIsReplying={setIsReplying}
                replyingId={replyingId}
              />
            </React.Fragment>
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
