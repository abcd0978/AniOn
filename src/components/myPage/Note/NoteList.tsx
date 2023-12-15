import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { fetchNotes, readRecvNote } from '../../../api/note';

import * as userStore from '../../../store/userStore';
import { S } from './notelist.Styles';
import Pagination from '../../Pagenation';
import Loading from '../../Loading/Loading';
import { useConfirm } from '../../../hooks/useConfirm';
import { deleteNote } from '../../../api/note';
interface Props {
  selectedNoteType: string;
}

const NoteList = ({ selectedNoteType }: Props) => {
  const user = useAtomValue(userStore.user);
  const [page, setPage] = useState<number>(1);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null); //note
  const { openConfirm } = useConfirm();
  const queryClient = useQueryClient();

  const noteQueryOptions = {
    queryKey: ['notes', selectedNoteType, page],
    queryFn: () =>
      fetchNotes({
        user_id: user!.id,
        type: selectedNoteType,
        page,
        itemsPerPage: 10,
      }),
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    enabled: !!user && selectedNoteType !== 'send',
  };

  const { data: notesAndTotalPages, isFetching } = useQuery(noteQueryOptions);
  //페이지네이션
  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      setExpandedNoteId(null);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: number) => prev - 1);
      setExpandedNoteId(null);
      return;
    }
    if (selected === 'next' && notesAndTotalPages?.totalPages) {
      setPage((prev: number) => prev + 1);
      setExpandedNoteId(null);
      return;
    }
  };

  // 날짜 변환 함수
  function formatDate(dateString: string) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    const day = ('0' + originalDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // 읽음 표시
  const readRecvNoteMutation = useMutation(readRecvNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recvNote']);
    },
  });

  //내용 펼치기
  const handleNoteClick = (noteId: string) => {
    readRecvNoteMutation.mutate(noteId);
    setExpandedNoteId((prev) => (prev === noteId ? null : noteId));
  };

  // 리뷰 삭제
  const handleRemoveNote = async (noteId: string) => {
    try {
      const deleteConfirmData = {
        title: '쪽지 삭제',
        content: '정말 삭제하실 건가요??!',
        callback: async () => {
          await deleteNote(noteId);
          queryClient.invalidateQueries(['notes', selectedNoteType, page]);
        },
      };
      openConfirm(deleteConfirmData);
    } catch (error) {
      console.error('리뷰 삭제 중 에러', error);
    }
  };

  return (
    <div>
      {isFetching ? (
        <Loading />
      ) : notesAndTotalPages?.data.length !== 0 ? (
        <>
          {/* 노트 헤더 */}
          <S.noteTopBox>
            <S.nickname>닉네임</S.nickname>
            <S.title>제목</S.title>
            <S.date>날짜</S.date>
          </S.noteTopBox>
          {/* 각 노트 데이터 */}
          {notesAndTotalPages?.data?.map((note: any, index: number) => (
            <div key={note.id}>
              <S.noteBox onClick={() => handleNoteClick(note.id)}>
                <S.nickname>{note.users.nickname}</S.nickname>
                <S.title>
                  {/* 글 제목 35자 넘어가면 ...으로 */}
                  {note.title.length > 35
                    ? `${note.title.slice(0, 35)}...`
                    : note.title}
                </S.title>
                <S.date>{formatDate(note.sent_at)}</S.date>
              </S.noteBox>
              {expandedNoteId === note.id && (
                // 내용 300자 제한
                <S.Content expanded={expandedNoteId === note.id}>
                  {index === 0} <br />
                  <S.ContentInner>
                    {note.content.slice(0, 300)}
                    {note.content.length > 300 && '...'}
                  </S.ContentInner>
                  <S.deleteButton onClick={() => handleRemoveNote(note.id)}>
                    삭제
                  </S.deleteButton>
                </S.Content>
              )}
            </div>
          ))}
        </>
      ) : (
        <div>결과 없음</div>
      )}
      <S.Page>
        <Pagination
          currentPage={page}
          totalPages={notesAndTotalPages?.totalPages || 1}
          onClick={onClickPage}
          isPreviousDisabled={page === 1}
          isNextDisabled={page >= (notesAndTotalPages?.totalPages || 1)}
        />
      </S.Page>
    </div>
  );
};

export default NoteList;
