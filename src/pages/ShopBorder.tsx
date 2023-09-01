import React from 'react';
import * as itemApi from '../api/items';
import * as S from '../pages/Shop.style';
import BorderCard from '../components/BorderCard';
import { useQuery } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import { useAtomValue } from 'jotai';
const ShopBorder = () => {
  const getBorders = {
    queryKey: ['borders'],
    queryFn: () => {
      const data = itemApi.fetchBorders();
      return data;
    },
    refetchOnWindowFocus: false,
  };

  const { data } = useQuery(getBorders);
  return (
    <S.Outer>
      <S.Bottom>
        <S.ItemBox>
          {data?.map((border, index) => (
            <BorderCard
              border={border}
              // id={border.id}
              // index={index}
              // title={border.name}
              // img_url={border.img_url}
              // price={border.price}
              // key={index}
            />
          ))}
        </S.ItemBox>
      </S.Bottom>
    </S.Outer>
  );
};

export default ShopBorder;
