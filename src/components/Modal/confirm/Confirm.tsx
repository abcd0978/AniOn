import { useConfirm } from '../../../hooks/useConfirm';
import * as S from './styled.Confirm';
export const Confirm = () => {
  const { confirmDataState, closeConfirm } = useConfirm();

  const handleConfirmClick = () => {
    if (!confirmDataState.callBack) {
      closeConfirm();
    }
    confirmDataState?.callBack?.();
    closeConfirm();
  };

  return (
    <>
      {confirmDataState.isOpen && (
        <S.ModalBackGround>
          <S.ModalContainer>
            <S.ModalContents>
              <p>{confirmDataState.title}</p>
              <p>{confirmDataState.content}</p>
              <S.ButtonContainer>
                <S.CancelButton onClick={closeConfirm}>취소</S.CancelButton>
                <S.ConfirmButton onClick={handleConfirmClick}>
                  확인
                </S.ConfirmButton>
              </S.ButtonContainer>
            </S.ModalContents>
          </S.ModalContainer>
        </S.ModalBackGround>
      )}
    </>
  );
};
