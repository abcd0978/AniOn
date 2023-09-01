import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Pagination from '../Pagenation';
import { S } from '../anime-detail/animeDetailComments.style';
import * as userStore from '../../store/userStore';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from '../../api/aniComment';
import { Database } from '../../types/supabase';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';

type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];
type InsertAniComment = Database['public']['Tables']['ani_comments']['Insert'];
type UpdateAniComment = Database['public']['Tables']['ani_comments']['Update'];

// TODO:현재 user 값 넣어야함

// const userAtom = atom<null | any>(null);
// console.log('!!!!!!!!!!!!!', localStorage.getItem('user'));

const AnimeDetailComments = () => {
  const { ani_id } = useParams() as { ani_id: string };
  // console.log("현재id!!!", ani_id);

  const user = useAtomValue(userStore.user);

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
    },
  });

  const handleCommentSubmit = () => {
    if (!user) {
      toast.warning('로그인 후 리뷰 작성이 가능해요🙄', {
        autoClose: 1000,
      });
      return;
    }

    if (!newComment) {
      toast.warning('리뷰를 작성해주세요!', {
        autoClose: 2000,
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

    console.log('Creating comment:', createComment);

    addMutation.mutate(createComment);
    setNewComment('');
  };

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
    },
  });

  // 댓글 삭제시
  const handleCommentDelete = async (commentId: string) => {
    const shouldDelete = window.confirm('댓글을 삭제 하시겠습니까?');
    if (shouldDelete) {
      deleteMutation.mutate(commentId);
    }
  };

  const editMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ani_comments']);
    },
  });

  // 댓글 수정시
  const handleCommentEdit = (comment: UpdateAniComment) => {
    if (editingCommentId === comment.id) {
      const editComment = {
        ...comment,
        comment: editedCommentText,
      };

      if (!editedCommentText) {
        //TODO: 수정 할 내용이 없는 경우 원래 작성 돼 있던 내용으로 돌리기
        toast.warning('수정 할 내용을 작성해주세요.', {
          autoClose: 1000,
        });
        return;
      }
      editMutation.mutate(editComment);
      setEditingCommentId(null);
    } else {
      setEditingCommentId(comment.id!);
      setEditedCommentText(comment.comment);
    }
  };

  // 페이지네이션
  const [page, setPage] = useState<number>(1);
  const { data: aniCommentsData } = useQuery<any>(
    ['ani_comments', ani_id, page],
    () => {
      if (ani_id) {
        return fetchComments(ani_id, page);
      }
      return Promise.resolve({ data: [], totalPages: 1 });
    },
    { keepPreviousData: true },
  );

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

  // console.log('AniCommentsData:', aniCommentsData);

  return (
    <S.AniCommentContainer>
      <S.Outer>
        {user ? (
          <S.AniCommentInputBox>
            {/* <p>{user.nickname}</p> */}
            <S.AniCommentInput
              type="text"
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
          {aniCommentsData?.data?.map((comment: ReadAniComment) => (
            <S.AniCommentBox key={comment.id}>
              <S.AniCommentUp>
                <S.AniCommentUser>
                  <S.AniProfileImg
                    src={comment.users.profile_img_url}
                    alt="프로필이미지"
                  />
                  <S.AniUserNickname>
                    {comment.users.nickname}
                  </S.AniUserNickname>
                </S.AniCommentUser>
                <S.date>{new Date(comment.created_at).toLocaleString()}</S.date>
              </S.AniCommentUp>
              {comment.id === editingCommentId ? (
                <S.AniEditCommentInput
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <div>
                  <S.AniCommentText>{comment.comment}</S.AniCommentText>
                </div>
              )}
              {user?.id === comment.user_id && (
                <S.AniCommentButtonBox>
                  <S.AniCommentButton
                    onClick={() => handleCommentEdit(comment)}
                  >
                    {comment.id === editingCommentId ? '저장' : '수정'}
                  </S.AniCommentButton>
                  <S.AniCommentButton
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    삭제
                  </S.AniCommentButton>
                </S.AniCommentButtonBox>
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
