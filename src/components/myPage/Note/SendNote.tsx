import React, { SetStateAction, useState } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// style
import { S } from './sendnote.Styles';

import * as userStore from '../../../store/userStore';
import { createNote } from '../../../api/note';

interface Props {
  setSelectedNoteType: React.Dispatch<SetStateAction<string>>;
}

const SendNote = ({ setSelectedNoteType }: Props) => {
  const user = useAtomValue(userStore.user);

  const [title, setTitle] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const queryClient = useQueryClient();
  const createMutation = useMutation(createNote);

  const validateAndToast = (value: string, label: string) => {
    if (!value) {
      toast.warning(`${label}을(를) 입력해주세요!`, { autoClose: 600 });
      return false;
    }
    return true;
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    if (
      !validateAndToast(title, '제목') ||
      !validateAndToast(nickname, '닉네임') ||
      !validateAndToast(content, '내용')
    ) {
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
        queryClient.invalidateQueries(['notes']);
        if (data === 'none') {
          toast.warning('받는분의 닉네임을 확인해주세요!', { autoClose: 600 });
          return;
        }
        toast.warning('쪽지를 보냈습니다!💖', { autoClose: 600 });
        setSelectedNoteType('sent');
      },
    });
  };

  const handleCancel = () => {
    setSelectedNoteType('recv');
  };

  return (
    <S.Container>
      <br />
      <br />
      <form onSubmit={onSubmitHandler}>
        <InputField
          label="받는 사람 "
          value={nickname}
          onChange={setNickname}
          maxLength={8}
        />
        <InputField
          label="제목"
          value={title}
          onChange={setTitle}
          maxLength={20}
        />
        <InputField
          className={S.contentInputBox}
          label="내용"
          value={content}
          onChange={setContent}
          maxLength={300}
        />
        <S.ButtonBox>
          <S.CancelButton type="button" onClick={handleCancel}>
            {' '}
            취소
          </S.CancelButton>
          <S.SendButton type="submit">보내기</S.SendButton>
        </S.ButtonBox>
      </form>
    </S.Container>
  );
};

const InputField = ({ label, value, onChange, maxLength }: any) => {
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > maxLength) {
      toast.warning(`${label}은(는) ${maxLength}자 이하로 입력해주세요!`, {
        autoClose: 600,
        toastId: `${label}Warning`,
      });
    } else {
      onChange(inputValue);
    }
  };

  return (
    <S.sendBox className={label === '내용' ? 'contentInputBox' : ''}>
      {label === '내용' ? null : <S.Label>{label}</S.Label>}

      {label === '내용' ? (
        <S.contentInputBox>
          <S.contentInput
            type="text"
            onChange={onChangeText}
            maxLength={maxLength}
            value={value}
            placeholder="쪽지 내용을 입력해주세요!"
          />
        </S.contentInputBox>
      ) : (
        <S.Input
          type="text"
          onChange={onChangeText}
          maxLength={maxLength}
          value={value}
        />
      )}

      <br />
      <br />
    </S.sendBox>
  );
};

export default SendNote;
