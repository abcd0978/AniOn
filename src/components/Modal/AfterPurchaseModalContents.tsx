import React from 'react';
import styled from 'styled-components';
import negetive_next from '../../assets/navigate_next.svg';
import { useSetAtom } from 'jotai';
import * as modalStore from '../../store/modalStore';
import { useNavigate } from 'react-router-dom';
import * as userStore from '../../store/userStore';
import { useAtomValue } from 'jotai';
type Props = {};

function AfterPurchaseModalContents({}: Props) {
  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);
  const setIsModalOpened = useSetAtom(modalStore.isModalOpened);
  const handleProfileEditClick = () => {
    setIsModalOpened(false);
    if (user?.id) {
      navigate(`/mypage/${user.id}`, {
        state: {
          selected: 'DecoProfile',
        },
      });
    }
  };
  return (
    <StContainer>
      <StTypoContainer>
        <StBoldTextWithPurple>구매가 완료되었습니다!</StBoldTextWithPurple>
        <StText>구매 내역 확인 및 테두리 꾸미기는</StText>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StBoldText>마이페이지 &gt; 프로필 꾸미기</StBoldText>
          <StText>에서 할 수 있습니다. </StText>
        </div>
      </StTypoContainer>
      <StButtonContainer>
        <StCancelButton
          onClick={() => {
            setIsModalOpened(false);
          }}
        >
          닫기
        </StCancelButton>
        <StConfirmButton onClick={handleProfileEditClick}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <StgotoProfileEditTypo>프로필 꾸미기로 이동</StgotoProfileEditTypo>
            <img
              style={{ width: '20px', height: '20px' }}
              src={negetive_next}
              alt="arrow"
            />
          </div>
        </StConfirmButton>
      </StButtonContainer>
    </StContainer>
  );
}
const StContainer = styled.div`
  width: 466px;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 40px;
  align-self: stretch;
`;
const StTypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 8px 4px;
  flex: 1 0 0;
  flex-wrap: wrap;
`;
const StText = styled.p`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StBoldText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const StCancelButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 72px;
  height: 32px;
  padding: 4px 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 10px;
  background: var(--achromatic-colors-midgray-2, #dbdbdb);
`;
const StConfirmButton = styled.button`
  cursor: pointer;
  height: 32px;
  padding: 4px 14px;
  justify-content: center;
  border: none;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--main-default, #8200ff);
`;
const StgotoProfileEditTypo = styled.p`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.225px;
`;

const StBoldTextWithPurple = styled.p`
  color: #9b00e4;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export default AfterPurchaseModalContents;
