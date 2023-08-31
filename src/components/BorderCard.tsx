import React from 'react';
import * as S from '../pages/Shop.style';
import * as modalStore from '../store/modalStore';
import { useSetAtom } from 'jotai';
type Props = {
  id: string;
  index: number;
  title: string;
  price: number;
  img_url: string;
};

const BorderCard = (props: Props) => {
  const setModal = useSetAtom(modalStore.modalContents);
  const isModalOpened = useSetAtom(modalStore.isModalOpened);
  const setBorderModalContent = useSetAtom(modalStore.borderModalContent);
  return (
    <S.Item key={props.index}>
      <S.TopArea img_url={props.img_url} />
      <S.BottomArea>
        {props.title}
        <br />
        <S.Number>{props.price}포인트</S.Number>
        <S.BuyButton
          onClick={() => {
            setBorderModalContent({
              id: props.id,
              index: props.index,
              title: props.title,
              price: props.price,
              img_url: props.img_url,
            });
            isModalOpened(true);
            setModal('border');
          }}
        >
          구매하기
        </S.BuyButton>
      </S.BottomArea>
    </S.Item>
  );
};

export default BorderCard;
