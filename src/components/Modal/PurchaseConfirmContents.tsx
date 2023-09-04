import React from 'react';
import styled from 'styled-components';
import { useAtomValue, useSetAtom } from 'jotai';
import * as itemApi from '../../api/items';
import * as userStore from '../../store/userStore';
import * as modalStore from '../../store/modalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileWithBorder from '../ProfileWithBorder';
import { toast } from 'react-toastify';

const PurchaseConfirmContents = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const isModalOpened = useSetAtom(modalStore.isModalOpened);
  const borderContents = useAtomValue(modalStore.borderModalContent);
  const setModalContents = useSetAtom(modalStore.modalContents);

  const purchaseMutation = useMutation(itemApi.purchase, {
    onSuccess: (data) => {
      if (!data.success) {
        toast.success(data.msg, { autoClose: 1200 });
        return;
      }
      queryClient.invalidateQueries(['purchasedBorders']);
      queryClient.invalidateQueries(['userPoint']);
      setModalContents('afterPurchase');
    },
    onError: (error) => {
      toast.warning(`구매에 실패하였습니다. : ${error}`, { autoClose: 1200 });
    },
  });

  const handlerPurchaseButtonClick = async (item_id: string) => {
    if (!user) {
      return;
    }
    await purchaseMutation.mutateAsync({
      item_id,
      user_id: user.id,
    });
  };

  return (
    <StPurchaseConfirmModalContainer>
      <div>
        <StTitleAndCloseButtonContainer>
          <MiriBogi>미리보기</MiriBogi>
        </StTitleAndCloseButtonContainer>
        <StPreviewAndWords>
          <ProfileWithBorder
            mediaWidth={1920}
            width={160}
            border_img_url={borderContents?.img_url}
            profile_img_url={user?.profile_img_url!}
          />
          <StPurchaseTitle>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                placeSelf: 'center',
              }}
            >
              <StBorderNameTypo>{borderContents?.name}</StBorderNameTypo>
              <p
                style={{
                  color: '#000',
                  fontFamily: 'Pretendard-Regular',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  letterSpacing: '-0.225px',
                  whiteSpace: 'nowrap',
                }}
              >
                을
              </p>
            </div>
            <div>
              <p
                style={{
                  color: '#000',
                  fontFamily: 'Pretendard-Regular',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  letterSpacing: '-0.225px',
                  placeSelf: 'center',
                }}
              >
                구매하시겠습니까?
              </p>
              <StPrice>{borderContents?.price}포인트</StPrice>
            </div>
          </StPurchaseTitle>
        </StPreviewAndWords>
      </div>

      <StButtonContainer>
        <StCancelButton
          onClick={() => {
            isModalOpened(false);
          }}
        >
          취소
        </StCancelButton>
        <StConfirmButton
          onClick={() => handlerPurchaseButtonClick(borderContents?.id!)}
        >
          구매
        </StConfirmButton>
      </StButtonContainer>
    </StPurchaseConfirmModalContainer>
  );
};

const StPurchaseConfirmModalContainer = styled.div`
  width: 400px;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;
const StTitleAndCloseButtonContainer = styled.div`
  width: 100%;
  justify-content: space-between;
`;
const MiriBogi = styled.p`
  color: #000;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.225px;
`;
const StPreviewAndWords = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px;
`;
const StPreview = styled.div<{ background: string }>`
  z-index: 3;
  position: relative;
  background-image: url(${(props) => props.background});
  background-size: cover;
  display: flex;
  width: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;
const StPurchaseTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px 4px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;
const StBorderNameTypo = styled.p`
  color: #9b00e4;

  /* 본문/3 */
  font-family: Pretendard-Regular;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StPrice = styled.p`
  text-align: -webkit-center;
  color: #000;
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
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
  width: 72px;
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
export default PurchaseConfirmContents;
