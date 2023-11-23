import React, { useState } from 'react';
import SendNote from './SendNote';

const Note = () => {
  const [st, setSt] = useState(0);

  const renderSelectedComponent = () => {
    switch (st) {
      case 1:
        return <div>받은쪽지함</div>;
      case 2:
        return <div>보낸쪽지함</div>;
      case 3:
        return <SendNote setSt={setSt} />;
      default:
        return <div>보낸쪽지함</div>;
    }
  };

  return (
    <div>
      <button onClick={() => setSt(1)}>받은</button>
      <button onClick={() => setSt(2)}>보낸</button>
      <button onClick={() => setSt(3)}>보내기</button>
      {renderSelectedComponent()}
    </div>
  );
};

export default Note;
