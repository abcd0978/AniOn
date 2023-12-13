import React, { useState } from 'react';
import SendNote from './SendNote';
import NoteList from './NoteList';
// style
import { S } from './note.Styles';

const Note = () => {
  const [st, setSt] = useState('recv');

  return (
    <S.Container>
      <S.RecvButton onClick={() => setSt('recv')}>받은 메세지</S.RecvButton>
      <S.SentButton onClick={() => setSt('sent')}>보낸 메세지</S.SentButton>
      <S.SendButton onClick={() => setSt('send')}>보내기</S.SendButton>
      {st === 'send' ? <SendNote setSt={setSt} /> : <NoteList st={st} />}
    </S.Container>
  );
};

export default Note;
