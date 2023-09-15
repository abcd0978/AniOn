import { useState } from 'react';
import * as modalStore from '../../store/modalStore';
import { useAtomValue, useSetAtom } from 'jotai';
import * as userStore from '../../store/userStore';
import { useQuery } from '@tanstack/react-query';
import { fetchAwards, fetchMyAwards } from '../../api/items';
import Loading from '../Loading/Loading';
import { S } from './shopAwards.styles';
import useViewport from '../../hooks/useViewPort';
const ShopAwardList = () => {
  const { width } = useViewport();

  const [page, setPage] = useState<number>(1);
  const user = useAtomValue(userStore.user);
  const isModalOpened = useSetAtom(modalStore.isModalOpened);
  const setModalContents = useSetAtom(modalStore.modalContents);
  const setAwardfModalContents = useSetAtom(modalStore.awardModalContent);
  const itemsPerPage = 16;

  // 상점에 판매중인 칭호 불러오기
  const awardsQueryOptions = {
    queryKey: ['awards'],
    queryFn: () => fetchAwards(),
    refetchOnWindowFocus: false,
  };
  const { data: awards, isLoading, isFetching } = useQuery(awardsQueryOptions);

  // 보유중인 칭호 불러오기
  const myAwardsQueryOptions = {
    queryKey: ['myAwards'],
    queryFn: () => fetchMyAwards(user!.id),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    enabled: !!user,
  };

  const { data: myAwards } = useQuery(myAwardsQueryOptions);

  // 구매 여부 판단을 위한 배열
  const purchasedItemIds = myAwards?.map((item) => item.item_id) || [];

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <S.GridContainer>
      {isLoading && !awards
        ? [
            ...Array(16).map((_, index) => (
              <S.AwardItem>
                <S.AwardName></S.AwardName>
                <S.ShopMenu>
                  <S.AwardPrice>포인트</S.AwardPrice>
                  <S.BuyButton>구매하기</S.BuyButton>
                </S.ShopMenu>
              </S.AwardItem>
            )),
          ]
        : awards
            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item, index) => {
              return (
                <S.ItemBox key={item.id}>
                  <S.AwardImg
                    src={item.img_url}
                    alt={item.name}
                    $mediaWidth={width}
                  />
                  <S.ShopMenu>
                    <S.AwardPrice>{item.price}포인트</S.AwardPrice>
                    <S.BuyButton
                      onClick={() => {
                        setModalContents('award');
                        setAwardfModalContents({
                          id: item.id,
                          index: index,
                          name: item.name,
                          img_url: item.img_url,
                          price: item.price,
                        });
                        isModalOpened(true);
                      }}
                      disabled={purchasedItemIds?.includes(item.id) || !user}
                    >
                      구매하기
                    </S.BuyButton>
                  </S.ShopMenu>
                </S.ItemBox>
              );
            })}
    </S.GridContainer>
  );
};

export default ShopAwardList;
