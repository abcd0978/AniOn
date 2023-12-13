import React, { useEffect, useState } from 'react';
import SendNote from './SendNote';
import NoteList from './NoteList';

import * as myPageStore from '../../../store/myPageStore';
import * as headerStore from '../../../store/headerStore';

// style
import { S } from './note.Styles';
import { useSetAtom } from 'jotai';

const Note = () => {
  const [selectedNoteType, setSelectedNoteType] = useState('recv');

  const setSelectedComponent = useSetAtom(myPageStore.selectedComponent);
  const setAlarmNote = useSetAtom(headerStore.alarmNote);

  // useEffect(() => {
  //   setAlarmNote(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <S.Container>
      {/* 백버튼 모바일 환경에서만 보이도록 수정 */}
      <div onClick={() => setSelectedComponent(null)}>←</div>

      <S.RecvButton onClick={() => setSelectedNoteType('recv')}>
        받은
      </S.RecvButton>
      <S.SentButton onClick={() => setSelectedNoteType('sent')}>
        보낸
      </S.SentButton>
      <S.SendButton onClick={() => setSelectedNoteType('send')}>
        보내기
      </S.SendButton>
      {selectedNoteType === 'send' ? (
        <SendNote setSelectedNoteType={setSelectedNoteType} />
      ) : (
        <NoteList selectedNoteType={selectedNoteType} />
      )}
    </S.Container>
  );
};

export default Note;
