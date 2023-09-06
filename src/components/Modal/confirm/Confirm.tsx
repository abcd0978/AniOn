import { useConfirm } from '../../../hooks/useConfirm';
import * as S from './styled.Confirm';
export const Confirm = () => {
  const { confirmDataState, closeConfirm } = useConfirm();

  return (
    <>
      {confirmDataState.isOpen && (
        <S.ModalBackGround>
          <S.ModalContainer>
            <S.ModalContents>
              <p>{confirmDataState.title}</p>
              <p>{confirmDataState.content}</p>
              <S.ButtonContainer>
                <S.CancelButton onClick={closeConfirm}>Cancel</S.CancelButton>
                <S.ConfirmButton onClick={confirmDataState.callBack}>
                  Ok
                </S.ConfirmButton>
              </S.ButtonContainer>
            </S.ModalContents>
          </S.ModalContainer>
        </S.ModalBackGround>
      )}
    </>
  );
};
