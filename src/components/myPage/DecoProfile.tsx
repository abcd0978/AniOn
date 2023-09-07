import MyBorder from './MyBorder';
import { useState } from 'react';
import MyInvenAward from './MyInvenAward';
import { Deco } from './Deco.styles';
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
    <DecoContainer>
      <DecoTitle>프로필 꾸미기</DecoTitle>

      <Container>
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
    </DecoContainer>
  );
};
export default DecoProfile;
const DecoContainer = styled.div`
  position: absolute;
  top: 170px;
`;
const DecoTitle = styled.div`
  position: absolute;
  top: -25px;
  left: 150px;
  width: 200px;
  height: 32px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
`;
const Container = styled.div`
  display: grid;
  position: absolute;
  flex-direction: column;
  margin-top: -18%;
  margin-left: 150px;
`;
