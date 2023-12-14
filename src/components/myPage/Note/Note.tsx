import React, { useState } from 'react';
import SendNote from './SendNote';
import NoteList from './NoteList';
// style
import { S } from './note.Styles';

const Note = () => {
  const [st, setSt] = useState('recv');

  return (
    <S.Container>
      <div
        style={{
          fontSize: 24,
          margin: 3,
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        {st === 'recv' ? '받은 쪽지' : '보낸 쪽지'}
      </div>
      <S.RecvButton
        onClick={() => setSt('recv')}
        style={{
          backgroundColor: st === 'recv' ? '#8200ff' : '#f3e7ff',
          color: st === 'recv' ? '#ffffff' : 'black',
        }}
      >
        받은 메세지
      </S.RecvButton>
      <S.SentButton
        onClick={() => setSt('sent')}
        style={{
          backgroundColor: st === 'sent' ? '#8200ff' : '#f3e7ff',
          color: st === 'sent' ? '#ffffff' : 'black',
        }}
      >
        보낸 메세지
      </S.SentButton>
      <S.SendButton
        onClick={() => setSt('send')}
        style={{
          backgroundColor:
            st === 'send' ? ' rgb(255, 180, 239)' : 'rgb(255, 235, 247)',
          color: st === 'send' ? '#ffffff' : 'initial',
        }}
      >
        보내기
      </S.SendButton>
      {st === 'send' ? <SendNote setSt={setSt} /> : <NoteList st={st} />}
    </S.Container>
  );
};

export default Note;
