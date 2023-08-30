import MyBorder from './MyBorder';
import { useState } from 'react';
import MyInvenAward from './MyInvenAward';
import { EditTitle } from './EditProfile';
import LikedAnime from './LikedAnime';
import { Anime } from './LikedAnime.styles';
import { Deco } from './Deco.styles';

const DecoProfile = () => {
  const [selectedDecoMenu, setSelectedDecoMenu] = useState('Border');

  const renderDecoComponent = () => {
    switch (selectedDecoMenu) {
      case 'Award':
        return <MyInvenAward />;
      case 'Border':
        return <MyBorder />;
      default:
        return null;
    }
  };
  return (
    <Anime.Container>
      <EditTitle>프로필 꾸미기</EditTitle>
      <Deco.ButtonContainer>
        <button onClick={() => setSelectedDecoMenu('Border')}>테두리</button>
        <button onClick={() => setSelectedDecoMenu('Award')}>칭호</button>
      </Deco.ButtonContainer>
      <div>{renderDecoComponent()}</div>
    </Anime.Container>
  );
};
export default DecoProfile;
