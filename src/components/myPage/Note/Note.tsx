import React, { useState } from 'react';
import SendNote from './SendNote';
import NoteList from './NoteList';

const Note = () => {
  const [st, setSt] = useState('recv');

  return (
    <div>
      <button onClick={() => setSt('recv')}>받은</button>
      <button onClick={() => setSt('sent')}>보낸</button>
      <button onClick={() => setSt('send')}>보내기</button>
      {st === 'send' ? <SendNote setSt={setSt} /> : <NoteList st={st} />}
    </div>
  );
};

export default Note;
