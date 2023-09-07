import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Pagination from '../Pagenation';
import { S } from '../anime-detail/animeDetailComments.style';
import * as userStore from '../../store/userStore';
import commentpointer from '../../assets/commentpointer.svg';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from '../../api/aniComment';
import ProfileWithBorder, { processItem } from '../ProfileWithBorder';
import { Database } from '../../types/supabase';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { AniCommentType } from '../../types/comment';
import { updatePoint } from '../../api/items';
import { useConfirm } from '../../hooks/useConfirm';

type InsertAniComment = Database['public']['Tables']['ani_comments']['Insert'];
type UpdateAniComment = Database['public']['Tables']['ani_comments']['Update'];

const AnimeDetailComments = () => {
  const { ani_id } = useParams() as { ani_id: string };
  const user = useAtomValue(userStore.user);
  const { openConfirm } = useConfirm();

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  const [collapsedComments, setCollapsedComments] = useState<string[]>([]);

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
      updatePoint({ userId: user?.id!, point: 1 });
      toast.success(
        '리뷰가 작성되었습니다!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 💰1포인트 적립',
        {
          autoClose: 800,
        },
      );
    },
  });

  const handleCommentSubmit = () => {
    if (!user) {
      toast.warning('로그인 후 리뷰 작성이 가능해요🙄', {
        autoClose: 800,
      });
      return;
    }

    if (!newComment) {
      toast.warning('리뷰를 작성해주세요💜', {
        autoClose: 800,
      });
      return;
    }

    // 댓글 생성
    const createComment: InsertAniComment = {
      ani_id,
      comment: newComment,

      user_id: user.id,

      deleted_at: null, //확인
    };

    addMutation.mutate(createComment);
    setNewComment('');
  };

  // 댓글 삭제시
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
    },
  });

  const handleCommentDelete = async (commentId: string) => {
    const deleteConfirmData = {
      title: '리뷰 삭제',
      content: '정말 삭제하실건가요?',
      callback: () => {
        deleteMutation.mutate(commentId);
        toast.success('리뷰를 삭제했습니다❗', {
          autoClose: 800,
        });
      },
    };

    openConfirm(deleteConfirmData);
  };

  // 댓글 수정시
  const editMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
    },
  });

  const handleCommentEdit = (comment: UpdateAniComment) => {
    if (editingCommentId === comment.id) {
      // 수정 할 내용 빈 input 일 경우
      if (!editedCommentText) {
        // 이전 댓글 내용으로 복원
        setEditedCommentText(comment.comment);
        setEditingCommentId(null);
      } else {
        const editComment = {
          ...comment,
          comment: editedCommentText,
        };

        const editConfirmData = {
          title: '리뷰 수정',
          content: '리뷰를 수정 할까요?',
          callback: () => {
            editMutation.mutate(editComment);
            setEditingCommentId(null);
            toast.success('리뷰를 수정했습니다❗', {
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

  // 페이지네이션
  const [page, setPage] = useState<number>(1);

  const aniCommentQueryOptions = {
    queryKey: ['ani_comments', page, ani_id],
    queryFn: () => {
      if (ani_id) {
        return fetchComments(ani_id, page);
      }
      return Promise.resolve({ data: [], totalPages: 1 });
    },
    keepPreviousData: true,
    refetchOnMount: false,
  };

  const { data: aniCommentsData } = useQuery(aniCommentQueryOptions);

  //페이지 이동할 때
  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: any) => prev - 1);
      return;
    }
    if (selected === 'next' && page < aniCommentsData.totalPages) {
      setPage((prev: any) => prev + 1);
      return;
    }
  };

  // 이전 페이지 버튼 비활성화 여부 계산
  const isPreviousDisabled = page === 1;

  // 다음 페이지 버튼 비활성화 여부 계산
  const isNextDisabled = page >= (aniCommentsData?.totalPages ?? 1);

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

  return (
    <S.AniCommentContainer>
      <S.Outer>
        {user ? (
          <S.AniCommentInputBox>
            {/* <p>{user.nickname}</p> */}
            <S.AniCommentInput
              // type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit();
                }
              }}
              placeholder="작품에 대한 나의 리뷰를 남겨 보세요. "
            />
            <S.AniCommentInputButton onClick={handleCommentSubmit}>
              등록
            </S.AniCommentInputButton>
          </S.AniCommentInputBox>
        ) : (
          <S.AniCommentInputBox>
            <S.AniCommentInput
              placeholder="리뷰는 로그인/회원가입 후 이용해주세요. "
              readOnly
            />
          </S.AniCommentInputBox>
        )}

        <S.CommentSpace>
          {aniCommentsData?.data?.map((comment: AniCommentType) => (
            <S.AniCommentBox key={comment.id}>
              <S.AniCommentUp>
                <S.AniCommentUser>
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
                  <S.AniUserNickname>
                    {comment.users.nickname}
                  </S.AniUserNickname>
                  <S.AniUserAward>
                    {comment.users.inventory.length > 0 &&
                    processItem(comment.users.inventory).award.img_url ? (
                      <img
                        src={
                          processItem(comment.users.inventory).award.img_url!
                        }
                        alt={processItem(comment.users.inventory).award.name!}
                        style={{ width: '172px', height: '32px' }}
                      ></img>
                    ) : (
                      <S.AniAwardNo>칭호없음</S.AniAwardNo>
                    )}
                  </S.AniUserAward>
                </S.AniCommentUser>
                <S.date>{new Date(comment.created_at).toLocaleString()}</S.date>
              </S.AniCommentUp>
              {comment.id === editingCommentId ? (
                <S.AniEditCommentInput
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <div>
                  <S.AniCommentText>
                    {comment.comment.length > 200 &&
                    !collapsedComments.includes(comment.id) ? (
                      <>
                        {collapsedComments.includes(comment.id) ? (
                          <>{comment.comment.slice(0, 200)}</>
                        ) : (
                          <>{comment.comment.slice(0, 200)}</>
                        )}
                      </>
                    ) : (
                      <>{comment.comment}</>
                    )}
                  </S.AniCommentText>
                </div>
              )}
              {user?.id === comment.user_id && (
                <S.AniCommentButtonBox>
                  {comment.id === editingCommentId ? (
                    <>
                      <S.AniCommentButton
                        onClick={() => handleCommentEdit(comment)}
                      >
                        저장
                      </S.AniCommentButton>
                      <S.AniCommentButton
                        onClick={() => setEditingCommentId(null)}
                      >
                        취소
                      </S.AniCommentButton>
                    </>
                  ) : (
                    <>
                      <S.AniCommentButton
                        onClick={() => handleCommentEdit(comment)}
                      >
                        수정
                      </S.AniCommentButton>
                      <S.AniCommentButton
                        // onClick={() => handleCommentDelete(comment.id)}
                        onClick={() => handleCommentDelete(comment.id)}
                      >
                        삭제
                      </S.AniCommentButton>
                    </>
                  )}
                </S.AniCommentButtonBox>
              )}
              {/* 더보기 버튼 표시 */}
              {comment.comment.length > 200 &&
                comment.id !== editingCommentId && (
                  <S.CommentMore
                    onClick={() => toggleCommentCollapse(comment.id)}
                  >
                    {collapsedComments.includes(comment.id) ? (
                      <>
                        접기 <img src={commentpointer} alt="접기" />
                      </>
                    ) : (
                      <>
                        더보기 <img src={commentpointer} alt="더보기" />
                      </>
                    )}
                  </S.CommentMore>
                )}
            </S.AniCommentBox>
          ))}
          <S.AniCommentPageBox>
            <Pagination
              currentPage={page}
              totalPages={aniCommentsData?.totalPages ?? 1}
              onClick={onClickPage}
              isPreviousDisabled={isPreviousDisabled}
              isNextDisabled={isNextDisabled}
            />
          </S.AniCommentPageBox>
        </S.CommentSpace>
      </S.Outer>
    </S.AniCommentContainer>
  );
};

export default AnimeDetailComments;
