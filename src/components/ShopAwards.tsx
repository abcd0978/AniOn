import { useState } from 'react';
import { styled } from 'styled-components';
import * as modalStore from '../store/modalStore';
import { useAtomValue, useSetAtom } from 'jotai';
import * as userStore from '../store/userStore';
import { useQuery } from '@tanstack/react-query';
import { fetchAwards, fetchMyAwards } from '../api/items';
import Loading from './Loading/Loading';

const ShopAwardList = () => {
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
  const { data: awards, isLoading } = useQuery(awardsQueryOptions);

  // 보유중인 칭호 불러오기
  const myAwardsQueryOptions = {
    queryKey: ['myAwards'],
    queryFn: () => fetchMyAwards(user!.id),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { data: myAwards } = useQuery(myAwardsQueryOptions);

  // 구매 여부 판단을 위한 배열
  const purchasedItemIds = myAwards?.map((item) => item.item_id) || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GridContainer>
      <GridContainer>
        {isLoading && !awards
          ? [
              ...Array(16).map((_, index) => (
                <AwardItem>
                  <AwardName></AwardName>
                  <ShopMenu>
                    <AwardPrice>포인트</AwardPrice>
                    <BuyButton>구매하기</BuyButton>
                  </ShopMenu>
                </AwardItem>
              )),
            ]
          : awards
              ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item, index) => {
                return (
                  <ItemBox key={item.id}>
                    <img
                      src={item.img_url}
                      alt={item.name}
                      style={{ width: '342px' }}
                    ></img>
                    <ShopMenu>
                      <AwardPrice>{item.price}포인트</AwardPrice>
                      <BuyButton
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
                      </BuyButton>
                    </ShopMenu>
                  </ItemBox>
                );
              })}
      </GridContainer>
    </GridContainer>
  );
};

export default ShopAwardList;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 20px;
  margin-top: 30px;
`;

// const Container = styled.div`
//   width: 280px;

//   margin-top: 40px;
// `;

export const ItemBox = styled.div`
  margin-bottom: 50px;
`;
export const AwardItem = styled.div`
  gap: 10px;
`;
export const AwardName = styled.div`
  background-color: #efefef;
  padding: 8px;
  border-radius: 999px;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
  display: flex;
  height: 48px;
  width: 210px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin: 10px;
`;

export const AwardPrice = styled.div`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
  margin-top: 20px;
  width: 100px;
  height: 32px;
`;

export const BuyButton = styled.button`
  border-radius: 6px;
  border: 1px solid #c88fff;
  background-color: white;
  width: 70px;
  height: 26px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background-color: #c88fff;
    color: white;
  }

  &:disabled:hover {
    background-color: white;
    color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ShopMenu = styled.div`
  display: flex;
  width: 330px;
  height: 32px;
  padding: 0px 8px;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
`;
