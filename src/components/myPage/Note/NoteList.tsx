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
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: number) => prev - 1);
      return;
    }
    if (selected === 'next' && notesAndTotalPages?.totalPages) {
      setPage((prev: number) => prev + 1);
      return;
    }
  };

  console.log(notesAndTotalPages?.data);

  return (
    <S.Container>
      {/* <S.Outer> */}
      <div style={{ fontSize: 20, margin: 20 }}>
        {st === 'recv' ? '받은 쪽지' : '보낸 쪽지'}
      </div>
      {isFetching ? (
        <Loading />
      ) : notesAndTotalPages?.data.length !== 0 ? (
        notesAndTotalPages?.data?.map((note: any, index: number) => (
          <div key={note.id}>
            <div>제목 : {note.title}</div>
            <div>내용 : {note.content}</div>
            {/* send : 누구에게 보냈는지, recv : 누가 보냈는지.  */}
            <div>닉네임 : {note.users.nickname}</div>
            <hr />
          </div>
        ))
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
      {/* </S.Outer> */}
    </S.Container>
  );
};

export default NoteList;
