import MyBorder from './MyBorder';
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import MyInvenAward from './MyInvenAward';
import { D } from './Styled.MyPage/Deco.styles';
import { styled } from 'styled-components';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';
import * as myPageStore from '../../store/myPageStore';
const DecoProfile = () => {
  const [selectedDecoMenu, setSelectedDecoMenu] = useState('Border');
  const setSelectedComponent = useSetAtom(myPageStore.selectedComponent);
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InfoMenu.BackButton onClick={() => setSelectedComponent(null)}>
          ←
        </InfoMenu.BackButton>
        <D.Title>프로필 꾸미기</D.Title>
      </div>

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
