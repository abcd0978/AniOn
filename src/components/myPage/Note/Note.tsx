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
      {/* //모바일 뒤로가기 */}
      {/* <div onClick={() => setSelectedComponent(null)}>←</div> */}
      <div
        style={{
          fontSize: 24,
          margin: 3,
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        {selectedNoteType === 'recv'
          ? '받은 쪽지'
          : selectedNoteType === 'send'
          ? '쪽지 보내기'
          : '보낸 쪽지'}
      </div>
      <S.RecvButton
        onClick={() => setSelectedNoteType('recv')}
        style={{
          backgroundColor: selectedNoteType === 'recv' ? '#8200ff' : '#f3e7ff',
          color: selectedNoteType === 'recv' ? '#ffffff' : 'black',
        }}
      >
        받은 쪽지
      </S.RecvButton>
      <S.SentButton
        onClick={() => setSelectedNoteType('sent')}
        style={{
          backgroundColor: selectedNoteType === 'sent' ? '#8200ff' : '#f3e7ff',
          color: selectedNoteType === 'sent' ? '#ffffff' : 'black',
        }}
      >
        보낸 쪽지
      </S.SentButton>
      <S.SendButton
        onClick={() => setSelectedNoteType('send')}
        style={{
          backgroundColor:
            selectedNoteType === 'send'
              ? ' rgb(255, 180, 239)'
              : 'rgb(255, 235, 247)',
          color: selectedNoteType === 'send' ? '#ffffff' : 'initial',
        }}
      >
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
