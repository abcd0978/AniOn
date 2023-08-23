import React from "react";
import Comments from "../components/Board/Comments";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { Database } from "../types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, updatePost, getPost } from "../api/boardapi";
import { useState } from "react";
import { S } from "../pages/BoardDetail.style";
type InsertPosts = Database["public"]["Tables"]["posts"]["Insert"];
type ReadPosts = Database["public"]["Tables"]["posts"]["Row"];
type UpdatePosts = Database["public"]["Tables"]["posts"]["Update"];

const userAtom = atom<null | any>(null);

const BoardDetail = () => {
  const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;
  const BlinkingText = styled.span`
    animation: ${blinkAnimation} 1s infinite;
  `;

  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  // Post id 가져오기
  const { id } = useParams<{ id: string }>();
  // Post 상세조회
  // const { data: posts } = useQuery<ReadPosts | undefined>(["posts", id], () =>
  //   getPost(id)
  // );

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // // 뒤로가기
  // const backButton = () => {
  //   navigate(-1);
  // };

  // Post 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const deleteButton = (id: string) => {
    // 삭제 확인
    const confirm = window.confirm("게시물을 삭제하시겠습니까?");
    if (confirm) {
      // DB 삭제
      deleteMutation.mutate(id);

      // 페이지 이동 (어디로? 게시판 혹은 메인)
      alert("삭제되었습니다!");
      navigate("/");
    }
  };

  // Post 수정
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
  const editButton = (post: UpdatePosts) => {
    setIsEdit(!isEdit);
    // 수정된 Post 선언
    if (!isEdit) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      const editPost = {
        ...post,
        title,
        content,
      };
      updateMutation.mutate(editPost);
      setIsEdit(!isEdit);
    }
  };
  return (
    // <S.Layout>
    //   {posts ? (
    //     user?.user_id === posts.user_id && (
    //       <S.ButtonContainer>
    //         <div>
    //           <button onClick={() => deleteButton(posts.id)}>삭제</button>
    //           <button onClick={() => editButton(posts)}>
    //             {isEdit ? "저장" : "수정"}
    //           </button>
    //           <div>
    //             {/* 뒤로 가기 버튼 */}
    //             <button onClick={() => navigate("/board")}>뒤로 가기</button>
    //           </div>
    //         </div>
    //       </S.ButtonContainer>
    //     )
    //   ) : (
    //     <div>Loading...</div>
    //   )}
    //   {posts ? (
    //     <S.PostContainer key={posts.id}>
    //       <S.Category>{posts.category}</S.Category>
    //       {isEdit ? (
    //         <S.Box>
    //           <BlinkingText>
    //             <S.Info>(수정중)&nbsp;{posts.created_at}</S.Info>
    //           </BlinkingText>
    //           <S.Input
    //             value={title}
    //             onChange={onChangeTitle}
    //             style={{ fontSize: "28px", fontWeight: "500" }}
    //           />
    //         </S.Box>
    //       ) : (
    //         <S.Box>
    //           <S.Info>{posts.created_at}</S.Info>
    //           <S.Title>{posts.title}</S.Title>
    //         </S.Box>
    //       )}

    //       {isEdit ? (
    //         <S.Box>
    //           <S.Textarea value={content} onChange={onChangeContent} />
    //         </S.Box>
    //       ) : (
    //         <S.Content>{posts.content}</S.Content>
    //       )}
    //     </S.PostContainer>
    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </S.Layout>
    <div>
      <Comments />
    </div>
  );
};

export default BoardDetail;
