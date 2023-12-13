import React, { useState } from 'react';
import { fetchNotes } from '../../../api/note';
import { useQuery } from '@tanstack/react-query';
import * as userStore from '../../../store/userStore';
import { useAtomValue } from 'jotai';
import Loading from '../../Loading/Loading';
import { noteType } from '../../../types/note';
import Pagination from '../../Pagenation';

// style
import { S } from './notelist.Styles';

interface Props {
  st: string;
}

const NoteList = ({ st }: Props) => {
  const user = useAtomValue(userStore.user);
  const [page, setPage] = useState<number>(1);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null); //note

  const noteQueryOptions = {
    queryKey: ['notes', st, page],
    queryFn: () =>
      fetchNotes({ user_id: user!.id, type: st, page, itemsPerPage: 10 }),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 6000,
    enabled: !!user && st !== 'send',
  };

  const { data: notesAndTotalPages, isFetching } = useQuery(noteQueryOptions);

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

  const handleNoteClick = (noteId: string) => {
    setExpandedNoteId((prev) => (prev === noteId ? null : noteId));
  };

  console.log(notesAndTotalPages?.data);

  return (
    <S.Container>
      <div style={{ fontSize: 20, margin: 20 }}>
        {st === 'recv' ? '받은 쪽지' : '보낸 쪽지'}
      </div>
      {isFetching ? (
        <Loading />
      ) : notesAndTotalPages?.data.length !== 0 ? (
        <>
          {/* 노트 헤더 */}
          <S.noteBox>
            <div>닉네임</div>
            <S.title>제목</S.title>
            <S.date>날짜</S.date>
          </S.noteBox>

          {/* 각 노트 데이터 */}
          {notesAndTotalPages?.data?.map((note: any, index: number) => (
            <div key={note.id}>
              <S.noteBox onClick={() => handleNoteClick(note.id)}>
                <div>{note.users.nickname}</div>
                <S.title>{note.title}</S.title>
                <S.date>{formatDate(note.sent_at)}</S.date>
              </S.noteBox>
              {expandedNoteId === note.id && (
                <div>
                  <p>내용: {note.content}</p>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <div>결과 없음</div>
      )}
      <Pagination
        currentPage={page}
        totalPages={notesAndTotalPages?.totalPages || 1}
        onClick={onClickPage}
        isPreviousDisabled={page === 1}
        isNextDisabled={page >= (notesAndTotalPages?.totalPages || 1)}
      />
    </S.Container>
  );
};

export default NoteList;
