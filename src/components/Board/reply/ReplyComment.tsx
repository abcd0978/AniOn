import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// component
import { S } from './styled.ReplyComment';
import ProfileWithBorder, { processItem } from '../../ProfileWithBorder';

// api
import { updatePoint } from '../../../api/items';
import * as commentApi from '../../../api/commentapi';

// store
import * as userStore from '../../../store/userStore';

// hooks
import { useConfirm } from '../../../hooks/useConfirm';
import useViewport from '../../../hooks/useViewPort';

// file
import commentpointer from '../../../assets/commentpointer.svg';
import commentpointerUp from '../../../assets/commentPointerUp.svg';

type Props = {
  postId: string;
  commentId: string;
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  replyingId?: string | null;
};

const ReplyComment = ({
  commentId,
  postId,
  isReplying,
  setIsReplying,
  replyingId,
}: Props) => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const { isMobile } = useViewport();
  const { openConfirm } = useConfirm();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  const [collapsedComments, setCollapsedComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  // ----------------query-------------------- //

  // 1. fetch
  const replyCommentQueryOption = {
    queryKey: ['replyComments'],
    queryFn: () => commentApi.fetchReplyComments(postId),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 6000,
    enabled: !!postId,
  };
  const { data } = useQuery(replyCommentQueryOption);

  const replies = data?.filter((item) => item.comment_id === commentId);

  // 2. insert
  const addMutation = useMutation(commentApi.addReplyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['replyComments']);
      updatePoint({ userId: user?.id!, point: 1 });
      toast.success(
        '댓글이 작성되었습니다!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 💰1포인트 적립',
        {
          autoClose: 800,
        },
      );
    },
  });

  // 3. update
  const editMutation = useMutation(commentApi.updateReplyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['replyComments']);

      toast.success('댓글을 수정했습니다❗', {
        autoClose: 800,
      });
    },
  });

  // 4. delete
  const deleteMutation = useMutation(commentApi.deleteReplyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['replyComments']);
    },
  });

  // ----------------function-------------------- //
  // 1. insert
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
    const createComment: any = {
      comment: newComment,
      post_id: postId,
      comment_id: commentId,
      user_id: user.id,
    };

    addMutation.mutate(createComment);
    setNewComment('');
  };

  // 2. update
  const handleCommentEdit = (comment: any) => {
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
          id: comment.id,
          comment: editedCommentText,
        };

        const editConfirmData = {
          title: '댓글 수정',
          content: '댓글을 수정 할까요?',
          callback: () => {
            editMutation.mutate(editComment);
            setEditingCommentId(null);
          },
        };

        openConfirm(editConfirmData);
      }
    } else {
      setEditingCommentId(comment.id!);
      setEditedCommentText(comment.comment);
    }
  };

  // 3. delete
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

  // 4. 더 보기
  const toggleCommentCollapse = (commentId: string) => {
    if (collapsedComments.includes(commentId)) {
      // 댓글을 펼칩니다.
      setCollapsedComments(collapsedComments.filter((id) => id !== commentId));
    } else {
      // 댓글을 접습니다.
      setCollapsedComments([...collapsedComments, commentId]);
    }
  };

  if (commentId !== replies?.[0]?.comment_id) {
    return (
      <>
        {isReplying && replyingId === commentId && (
          <S.ReplyingContainer>
            <S.WriteInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit();
                }
              }}
              placeholder="댓글을 남겨보세요."
              disabled={!user}
            />
            <S.ReplyButton onClick={() => setIsReplying(!isReplying)}>
              취소
            </S.ReplyButton>
            <S.ReplyButton onClick={handleCommentSubmit} disabled={!user}>
              등록
            </S.ReplyButton>
          </S.ReplyingContainer>
        )}
      </>
    );
  }

  return (
    <>
      {replies.map((reply) => (
        <S.ReplyContainer key={reply.id}>
          <S.CommentInfo>
            <S.Profile>
              <ProfileWithBorder
                width={75}
                $mediawidth={1920}
                border_img_url={
                  reply.users.inventory.length > 0
                    ? processItem(reply.users.inventory).border
                    : undefined
                }
                profile_img_url={reply.users?.profile_img_url}
                key={reply.id!}
              />
              <S.Ninkname>{reply.users.nickname}</S.Ninkname>
              {reply.users.inventory.length > 0 &&
              processItem(reply.users.inventory).award.img_url ? (
                <S.Award
                  src={processItem(reply.users.inventory).award.img_url!}
                  alt={processItem(reply.users.inventory).award.name!}
                />
              ) : (
                <S.AwardNo>칭호없음</S.AwardNo>
              )}
            </S.Profile>
            {!isMobile && (
              <S.CommentDate>
                {new Date(reply.created_at).toLocaleString()}
              </S.CommentDate>
            )}
          </S.CommentInfo>
          {user?.id === reply.user_id && (
            <S.ButtonBox>
              {reply.id === editingCommentId ? (
                <>
                  <S.Button onClick={() => handleCommentEdit(reply)}>
                    저장
                  </S.Button>
                  <S.Button onClick={() => setEditingCommentId(null)}>
                    취소
                  </S.Button>
                </>
              ) : (
                <>
                  <S.Button onClick={() => handleCommentEdit(reply)}>
                    수정
                  </S.Button>
                  <S.Button onClick={() => handleCommentDelete(reply.id)}>
                    삭제
                  </S.Button>
                </>
              )}
            </S.ButtonBox>
          )}
          {reply.id === editingCommentId ? (
            <S.EditInput
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
            />
          ) : (
            //더보기
            <S.CommentBox>
              {reply.comment.length > 250 &&
              !collapsedComments.includes(reply.id) ? (
                <>
                  {reply.comment.slice(0, 250)}
                  <S.CommentMore
                    onClick={() => toggleCommentCollapse(reply.id)}
                  >
                    댓글 더보기 <img src={commentpointer} alt="더보기" />
                  </S.CommentMore>
                </>
              ) : (
                <>
                  {reply.comment}
                  {reply.comment.length > 250 && (
                    <S.CommentMore
                      onClick={() => toggleCommentCollapse(reply.id)}
                    >
                      접기 <img src={commentpointerUp} alt="접기" />
                    </S.CommentMore>
                  )}
                </>
              )}
              {isMobile && ( // 모바일일 때 날짜
                <S.MobieDate>
                  {new Date(reply.created_at).toLocaleString()}
                </S.MobieDate>
              )}
            </S.CommentBox>
          )}
        </S.ReplyContainer>
      ))}
      {isReplying && replyingId === commentId && (
        <S.ReplyingContainer>
          <S.WriteInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit();
              }
            }}
            placeholder="댓글을 남겨보세요."
            disabled={!user}
          />
          <S.ReplyButton onClick={() => setIsReplying(!isReplying)}>
            취소
          </S.ReplyButton>
          <S.ReplyButton onClick={handleCommentSubmit}>등록</S.ReplyButton>
        </S.ReplyingContainer>
      )}
    </>
  );
};

export default ReplyComment;
