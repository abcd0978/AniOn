import MyBorder from './MyBorder';
import { useState } from 'react';
import MyInvenAward from './MyInvenAward';
import { D } from './Styled.MyPage/Deco.styles';
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
        <D.Button
          onClick={() => setSelectedDecoMenu('Border')}
          style={{
            backgroundColor:
              selectedDecoMenu === 'Border' ? '#FF96DB' : '#FFEBF7',
            color: selectedDecoMenu === 'Border' ? '#ffffff' : 'black',
          }}
        >
          테두리
        </D.Button>
        <D.Button
          onClick={() => setSelectedDecoMenu('Award')}
          style={{
            backgroundColor:
              selectedDecoMenu === 'Award' ? '#FF96DB' : '#FFEBF7',
            color: selectedDecoMenu === 'Award' ? '#ffffff' : 'black',
          }}
        >
          칭호
        </D.Button>
      </D.ButtonContainer>

      <D.Container>{renderDecoComponent()}</D.Container>
    </D.Page>
  );
};
export default DecoProfile;
