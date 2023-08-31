import MyBorder from './MyBorder';
import { useState } from 'react';
import MyInvenAward from './MyInvenAward';
import { Container, EditTitle } from './EditProfile';
import LikedAnime from './LikedAnime';
import { Anime } from './LikedAnime.styles';
import { Deco } from './Deco.styles';
import * as S from '../../pages/Shop.style';

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
    <Container>
      <EditTitle>프로필 꾸미기</EditTitle>
      <Deco.ButtonContainer>
        <S.Button
          onClick={() => setSelectedDecoMenu('Border')}
          style={{
            backgroundColor:
              selectedDecoMenu === 'Border' ? '#FF96DB' : '#FFEBF7',
            color: selectedDecoMenu === 'Border' ? '#ffffff' : 'black',
          }}
        >
          테두리
        </S.Button>
        <S.Button
          onClick={() => setSelectedDecoMenu('Award')}
          style={{
            backgroundColor:
              selectedDecoMenu === 'Award' ? '#FF96DB' : '#FFEBF7',
            color: selectedDecoMenu === 'Award' ? '#ffffff' : 'black',
          }}
        >
          칭호
        </S.Button>
      </Deco.ButtonContainer>
      <div>{renderDecoComponent()}</div>
    </Container>
  );
};
export default DecoProfile;
