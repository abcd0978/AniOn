import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '../../../api/note';

import * as userStore from '../../../store/userStore';

import Pagination from '../../Pagenation';
import Loading from '../../Loading/Loading';

interface Props {
  selectedNoteType: string;
}

const NoteList = ({ selectedNoteType }: Props) => {
  const user = useAtomValue(userStore.user);
  const [page, setPage] = useState<number>(1);

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

  return (
    <div>
      <p style={{ fontSize: 20, margin: 20 }}>
        {selectedNoteType === 'recv' ? '받은' : '보낸'}
      </p>
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
    </div>
  );
};

export default NoteList;
