// import { MyProfilePoint } from './MyPage.styles';
import { Database } from '../types/supabase';
import { styled } from 'styled-components';
import { atom, useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import * as userStore from '../store/userStore';
import supabase from '../supabaseClient';

type ReadAwards = Database['public']['Tables']['items']['Row'];
const awardsAtom = atom<ReadAwards[]>([]);

const ShopAwardList = () => {
  const [awards, setAwards] = useAtom(awardsAtom);
  const [page, setPage] = useState<number>(1);
  const user = useAtomValue(userStore.user);

  const itemsPerPage = 16;
  const fetchAwards = async () => {
    try {
      if (!user) {
        return;
      }
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('category', 1);

      if (error) {
        console.error('fetchAwards에서 에러', error);
      } else {
        console.log('Awards fetched:', data);
        setAwards(data);
      }
    } catch (error) {
      console.error('fetchAwards 에러', error);
    }
  };
  useEffect(() => {
    fetchAwards();
  }, [setAwards, user]);

  return (
    <GridContainer>
      <GridContainer>
        {awards
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((items) => {
            return (
              <div key={items.id}>
                <AwardName>{items.name}</AwardName>
                <ShopMenu>
                  <AwardPrice>{items.price}포인트</AwardPrice>
                  <BuyButton>구매하기</BuyButton>
                </ShopMenu>
              </div>
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
  gap: 10px;
  padding: 10px;
}
`;
const Container = styled.div`
  width: 280px;

  margin-top: 40px;
`;
const AwardName = styled.div`
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
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;
const AwardPrice = styled.div`
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
const BuyButton = styled.button`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  background-color: white;
  width: 70px;
  height: 26px;
  font-size: 13px;
`;
const ShopMenu = styled.div`
  display: flex;
  width: 220px;
  height: 32px;
  padding: 0px 8px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
