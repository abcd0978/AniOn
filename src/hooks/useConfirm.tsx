import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { confirmState } from '../store/modalStore';

type OpenModalType = {
  title: string;
  content: string | JSX.Element;
  callback?: () => any;
};

export const useConfirm = () => {
  const [confirmDataState, setConfirmDataState] = useAtom(confirmState);

  const closeConfirm = useCallback(
    () =>
      setConfirmDataState((prev) => {
        return { ...prev, isOpen: false };
      }),
    [setConfirmDataState],
  );

  const openConfirm = useCallback(
    ({ title, content, callback }: OpenModalType) =>
      setConfirmDataState({
        isOpen: true,
        title: title,
        content: content,
        callBack: callback,
      }),
    [setConfirmDataState],
  );

  return { confirmDataState, closeConfirm, openConfirm };
};
