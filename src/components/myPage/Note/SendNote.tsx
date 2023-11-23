import React, { SetStateAction } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as userStore from '../../../store/userStore';
import { createNote } from '../../../api/note';

import useInputTest from '../../../hooks/useInputTest';
// import { insertNoteType } from '../../../types/note';

interface Props {
  setSt: React.Dispatch<SetStateAction<number>>;
}

const SendNote = ({ setSt }: Props) => {
  const user = useAtomValue(userStore.user);

  const [title, onChangeTitle] = useInputTest('');
  const [nickname, onChangeNickname] = useInputTest('');
  const [content, onChangeContent] = useInputTest('');

  // 나중에 목록 받아올 때 초기화를 위해
  const queryClient = useQueryClient();
  const createMutation = useMutation(createNote);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    e.preventDefault();
    // toast 출력을 입력받지 않은 값을 검사해서 한줄로 줄일 수 없을까?
    if (!title) {
      toast.warning('제목을 입력해주세요!', {
        autoClose: 800,
      });
      return;
    }

    if (!nickname) {
      toast.warning('받는분의 닉네임을 입력해주세요!', {
        autoClose: 800,
      });
      return;
    }

    if (!content) {
      toast.warning('내용을 입력해주세요!', {
        autoClose: 800,
      });
      return;
    }

    const params = {
      send_id: user.id,
      nickname,
      title,
      content,
    };

    createMutation.mutate(params, {
      onSuccess: (data) => {
        if (data === 'none') {
          toast.warning('받는분의 닉네임을 확인해주세요!', {
            autoClose: 800,
          });
          return;
        }
        alert('성공');
        setSt(2);
      },
    });
  };

  return (
    <div>
      <br />
      <br />
      <form onSubmit={onSubmitHandler}>
        <label>제목</label>
        <input type="text" onChange={onChangeTitle} />
        <br />
        <br />
        <label>닉네임</label>
        <input type="text" onChange={onChangeNickname} />
        <br />
        <br />
        <label>내용</label>
        <textarea onChange={onChangeContent} />
        <br />
        <br />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
};

export default SendNote;
