import React, { useEffect, useState } from 'react';
import SendNote from './SendNote';
import NoteList from './NoteList';

import * as myPageStore from '../../../store/myPageStore';
import * as headerStore from '../../../store/headerStore';

// style
import { S } from './note.Styles';
import { useSetAtom } from 'jotai';
import useViewport from '../../../hooks/useViewPort';

const Note = () => {
  const [selectedNoteType, setSelectedNoteType] = useState('recv');

  const setSelectedComponent = useSetAtom(myPageStore.selectedComponent);
  const setAlarmNote = useSetAtom(headerStore.alarmNote);

  const { isMobile } = useViewport();

  // useEffect(() => {
  //   setAlarmNote(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <S.Container>
      {/* {!isMobile && (


      )} */}
      <S.Title>
        {isMobile && (
          <div
            style={{
              fontSize: 16,
              color: '#838383',
              cursor: 'pointer',
              marginRight: '6px',
            }}
            onClick={() => setSelectedComponent(null)}
          >
            ←
          </div>
        )}
        {selectedNoteType === 'recv'
          ? '받은 쪽지'
          : selectedNoteType === 'send'
          ? '쪽지 보내기'
          : '보낸 쪽지'}
      </S.Title>
      <S.NoteButton
        onClick={() => setSelectedNoteType('recv')}
        style={{
          backgroundColor: selectedNoteType === 'recv' ? '#8200ff' : '#f3e7ff',
          color: selectedNoteType === 'recv' ? '#ffffff' : 'black',
        }}
      >
        받은 쪽지
      </S.NoteButton>
      <S.NoteButton
        onClick={() => setSelectedNoteType('sent')}
        style={{
          backgroundColor: selectedNoteType === 'sent' ? '#8200ff' : '#f3e7ff',
          color: selectedNoteType === 'sent' ? '#ffffff' : 'black',
        }}
      >
        보낸 쪽지
      </S.NoteButton>
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
