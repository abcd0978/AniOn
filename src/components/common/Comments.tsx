import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Pagination from "../../components/Pagenation";
import * as S from "./Comments.Styles";
import {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
} from "../../api/comment";
import { Database } from "../../types/supabase";
import { atom, useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
type PostComment = Database["public"]["Tables"]["post_comments"]["Row"];

const userAtom = atom<null | any>(null);

const Board = () => {
  const { id } = useParams();
  console.log("id", id);
  const [user, setUser] = useAtom(userAtom);

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>("");
  const [editedCommentText, setEditedCommentText] = useState<string>("");

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post_comments"]);
    },
  });

  const handleCommentSubmit = () => {
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString();

    const createComment: PostComment = {
      id: uuidv4(),
      created_at: formattedDate,
      comment: newComment,
      post_id: id as string,
      user_id: user?.userid as string,
    };

    console.log("Creating comment:", createComment);

    addMutation.mutate(createComment);
    setNewComment("");
  };

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post_comments"]);
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
      queryClient.invalidateQueries(["post_comments"]);
    },
  });

  const handleCommentEdit = (comment: PostComment) => {
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
  const { data: postCommentsData } = useQuery<any>(
    ["post_comments", id, page],
    () => {
      if (id) {
        return fetchComments(id, page);
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
    if (selected === "next" && page < postCommentsData.totalPages) {
      setPage((prev: any) => prev + 1);
      return;
    }
  };

  console.log("postCommentsData:", postCommentsData);

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
          {postCommentsData?.data?.map((comment: PostComment) => (
            <S.Comment key={comment.id}>
              <div>
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
            totalPages={postCommentsData?.totalPages ?? 1}
            onClick={onClickPage}
          />
        </S.CommentBot>
      </S.CommentContainer>
    </S.Outer>
  );
};

export default Board;
