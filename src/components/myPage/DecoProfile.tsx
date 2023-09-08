import MyBorder from './MyBorder';
import { useState } from 'react';
import MyInvenAward from './MyInvenAward';
import { D } from './Styled.MyPage/Deco.styles';
import * as S from '../../pages/Shop.style';
import { styled } from 'styled-components';

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
    <D.Page>
      <D.Title>프로필 꾸미기</D.Title>

      <D.ButtonContainer>
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
      </D.ButtonContainer>
      <D.Container>{renderDecoComponent()}</D.Container>
    </D.Page>
  );
};
export default DecoProfile;
