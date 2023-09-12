import * as S from '../pages/Shop.style';
import * as modalStore from '../store/modalStore';
import { useAtomValue, useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { fetchMyBorders } from '../api/items';
import { useQuery } from '@tanstack/react-query';
type Props = {
  border: {
    id: string;
    index: number;
    name: string;
    price: number;
    img_url: string;
  };
};

const BorderCard = ({ border }: Props) => {
  const user = useAtomValue(userStore.user);
  const setModal = useSetAtom(modalStore.modalContents);
  const isModalOpened = useSetAtom(modalStore.isModalOpened);
  const setBorderModalContent = useSetAtom(modalStore.borderModalContent);

  // 보유중인 테두리 불러오기
  const borderCardQueryOptions = {
    queryKey: ['myBorders'],
    queryFn: () => fetchMyBorders(user!.id),
    refetchOnWindowFocus: false,
    enabled: !!user,
  };

  const { data: myBorders } = useQuery(borderCardQueryOptions);

  const purchasedBorder = myBorders?.map((item) => item.item_id) || [];

  return (
    <S.Item key={border.index}>
      <S.TopArea src={border.img_url} alt={border.name} />
      <S.BottomArea>
        {border.name}
        <br />
        <S.Number>{border.price}포인트</S.Number>
        <S.BuyButton
          onClick={() => {
            setBorderModalContent({
              id: border.id,
              index: border.index,
              name: border.name,
              price: border.price,
              img_url: border.img_url,
            });
            isModalOpened(true);
            setModal('border');
          }}
          disabled={purchasedBorder?.includes(border.id) || !user}
        >
          구매하기
        </S.BuyButton>
      </S.BottomArea>
    </S.Item>
  );
};

export default BorderCard;
