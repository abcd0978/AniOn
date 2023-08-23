import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPost } from "../api/boardapi";
import { Database } from "../types/supabase";
import { v4 as uuidv4 } from "uuid";
import { S } from "./WriteBoard.style";
type Posts = Database["public"]["Tables"]["posts"]["Row"];

const userAtom = atom<null | any>(null);

const WriteBoard = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const [user, setUser] = useAtom(userAtom);

  // 입력값 받기
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
  };

  // 취소
  const cancellButton = () => {
    navigate("/");
  };
  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      // 유효성 검사
      if (!category) {
        return alert("카테고리를 선택해주세요.");
      }
      if (!title) {
        return alert("제목을 입력해주세요.");
      }
      if (title.length > 100) {
        return alert("제목은 100글자 미만으로 작성해주세요.");
      }
      if (!body) {
        return alert("내용을 입력해주세요.");
      }
      // 날짜
      const currentTime = new Date();

      const year = currentTime.getFullYear();
      const month = String(currentTime.getMonth() + 1).padStart(2, "0");
      const day = String(currentTime.getDate()).padStart(2, "0");
      const hours = String(currentTime.getHours()).padStart(2, "0");
      const minutes = String(currentTime.getMinutes()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

      const newPost: Posts = {
        id: uuidv4(),
        user_id: user.userid,
        created_at: formattedDateTime,
        category_id: category,
        title,
        content: body,
        updated_at: null,
        deleted_at: null,
      };

      try {
        await createMutation.mutateAsync(newPost);

        navigate(`/detail/${newPost.id}`);
      } catch (error) {
        console.error("게시물 추가 중 오류 발생:", error);
        alert("게시물을 추가하는 동안 오류가 발생했습니다.");
      }
    }
    // else {
    //   alert("로그인이 필요합니다.");
    // }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.FormContainer onSubmit={onSubmitHandler}>
          <S.InputContainer>
            <S.Label>카테고리</S.Label>
            <S.Select onChange={onChangeCategory}>
              <option value={""}>카테고리를 선택해주세요.</option>
              <option value={"자유"}>자유</option>
              <option value={"애니"}>애니</option>
              <option value={"오류 신고"}>오류 신고</option>
            </S.Select>
          </S.InputContainer>
          <S.InputContainer>
            <S.Label>제목</S.Label>
            <S.Input
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력해주세요."
            />
          </S.InputContainer>
          <S.InputContainer>
            <S.Label>내용</S.Label>
            <S.Textarea
              value={body}
              onChange={onChangeBody}
              placeholder="내용을 입력해주세요. 커뮤니티 가이드라인에 "
            />
          </S.InputContainer>
          <S.ButtonContainer>
            <S.Button onClick={cancellButton}>취소</S.Button>
            <S.Button>등록</S.Button>
          </S.ButtonContainer>
        </S.FormContainer>
      </S.Container>
    </S.Layout>
  );
};

export default WriteBoard;
