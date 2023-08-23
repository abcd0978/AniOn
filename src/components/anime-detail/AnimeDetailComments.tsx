import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Pagination from "../Pagenation";
import * as S from "../Board.detail/Comments.Styles";
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from "../../api/aniComment";
import { Database } from "../../types/supabase";
import { atom, useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
type AniComment = Database["public"]["Tables"]["ani_comments"]["Row"];

const userAtom = atom<null | any>(null);

const AnimeDetailComments = () => {
  const { ani_id } = useParams() as { ani_id: string };
  // console.log("현재id!!!", ani_id);

  const [user, setUser] = useAtom(userAtom);
  console.log("user>>>", user); //null

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>("");
  const [editedCommentText, setEditedCommentText] = useState<string>("");

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ani_comments"]);
    },
  });

  const handleCommentSubmit = () => {
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString();

    const createComment: AniComment = {
      id: uuidv4(),
      ani_id,
      created_at: formattedDate,
      comment: newComment,
      user_id: user?.userid as string,
      deleted_at: null, //확인
    };

    console.log("Creating comment:", createComment);

    addMutation.mutate(createComment);
    setNewComment("");
  };

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ani_comments"]);
    },
  });
  const handleCommentDelete = async (commentId: string) => {
    const shouldDelete = window.confirm("삭제 하시겠습니까?");
    if (shouldDelete) {
      deleteMutation.mutate(commentId);
    }
  };

  const editMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ani_comments"]);
    },
  });

  const handleCommentEdit = (comment: AniComment) => {
    if (editingCommentId === comment.id) {
      const editComment = {
        ...comment,
        comment: editedCommentText,
      };
      editMutation.mutate(editComment);
      setEditingCommentId(null);
    } else {
      setEditingCommentId(comment.id);
      setEditedCommentText(comment.comment);
    }
  };

  const [page, setPage] = useState<number>(1);
  const { data: aniCommentsData } = useQuery<any>(
    ["ani_comments", ani_id, page],
    () => {
      if (ani_id) {
        return fetchComments(ani_id, page);
      }
      return Promise.resolve({ data: [], totalPages: 1 });
    },
    { keepPreviousData: true }
  );

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === "number") {
      setPage(selected);
      return;
    }
    if (selected === "prev" && page > 1) {
      setPage((prev: any) => prev - 1);
      return;
    }
    if (selected === "next" && page < aniCommentsData.totalPages) {
      setPage((prev: any) => prev + 1);
      return;
    }
  };

  console.log("AniCommentsData:", aniCommentsData);

  return (
    <S.Outer>
      <S.CommentContainer>
        <S.CommentTop>
          <S.WriteInput
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCommentSubmit();
              }
            }}
            placeholder="댓글을 작성해주세요!"
          />
          <S.WriteButton onClick={handleCommentSubmit}>작성</S.WriteButton>
        </S.CommentTop>
        <S.CommentBot>
          {aniCommentsData?.data?.map((comment: AniComment) => (
            <S.Comment key={comment.id}>
              <div>
                <div>{user?.nickname}</div>
                <S.CommentDate>
                  {new Date(comment.created_at).toLocaleString()}
                </S.CommentDate>
              </div>
              {user?.user_id === comment.user_id && (
                <S.ButtonBox>
                  <S.button onClick={() => handleCommentEdit(comment)}>
                    {comment.id === editingCommentId ? "저장" : "수정"}
                  </S.button>
                  <S.button onClick={() => handleCommentDelete(comment.id)}>
                    삭제
                  </S.button>
                </S.ButtonBox>
              )}
              {comment.id === editingCommentId ? (
                <S.EditInput
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                comment.comment
              )}
            </S.Comment>
          ))}
          <Pagination
            currentPage={page}
            totalPages={aniCommentsData?.totalPages ?? 1}
            onClick={onClickPage}
          />
        </S.CommentBot>
      </S.CommentContainer>
    </S.Outer>
  );
};

export default AnimeDetailComments;
