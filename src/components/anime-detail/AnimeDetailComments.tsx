import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Pagination from '../Pagenation';
import { S } from '../anime-detail/animeDetailComments.style';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from '../../api/aniComment';
import { Database } from '../../types/supabase';
import { atom, useAtom } from 'jotai';
type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];
type InsertAniComment = Database['public']['Tables']['ani_comments']['Insert'];
type UpdateAniComment = Database['public']['Tables']['ani_comments']['Update'];

// TODO:현재 user 값 넣어야함
const userAtom = atom<null | any>(null);

const AnimeDetailComments = () => {
  const { ani_id } = useParams() as { ani_id: string };
  // console.log("현재id!!!", ani_id);

  const [user, setUser] = useAtom(userAtom);
  // console.log("user>>>", user); //null
  // 테스트용 user
  useEffect(() => {
    setUser({
      user_id: '59787dcd-cc16-4f05-8072-3d7a410b3722',
    });
  }, []);

  // user의 정보 가져오기

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
    const currentTime = new Date();

    // 댓글 생성
    const createComment: InsertAniComment = {
      ani_id,
      comment: newComment,
      // user_id: user?.userid as string,
      user_id: '59787dcd-cc16-4f05-8072-3d7a410b3722', //테스트용
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
    const shouldDelete = window.confirm('삭제 하시겠습니까?');
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

  // console.log('AniCommentsData:', aniCommentsData);

  return (
    <S.AniCommentContainer>
      <S.Outer>
        <S.AniCommentInputBox>
          <S.AniCommentInput
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit();
              }
            }}
            placeholder="댓글을 남겨보세요. "
          />
          <S.AniCommentInputButton onClick={handleCommentSubmit}>
            등록
          </S.AniCommentInputButton>
        </S.AniCommentInputBox>

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
              {user?.user_id === comment.user_id && (
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
            </S.AniCommentBox>
          ))}
          <S.AniCommentPageBox>
            <Pagination
              currentPage={page}
              totalPages={aniCommentsData?.totalPages ?? 1}
              onClick={onClickPage}
            />
          </S.AniCommentPageBox>
        </S.CommentSpace>
      </S.Outer>
    </S.AniCommentContainer>
  );
};

export default AnimeDetailComments;
