import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { A } from './Deco.styles';
import { B } from './Deco.styles';
import goShop from '../../assets/goShop.png';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
import { equipItem, fetchMyAwards } from '../../api/items';
import { styled } from 'styled-components';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { AwardName, BuyButton } from '../ShopAwards';
import { MyAward } from './MyPage.styles';
import Pagination from '../Pagenation';
const itemsPerPage = 18;

const MyInvenAward = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const { width, height, isMobile, isLoaded } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);

  const myAwardsQueryOptions = {
    queryKey: ['myAwards'],
    queryFn: () => fetchMyAwards(user!.id),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { isLoading, isError, data: awards } = useQuery(myAwardsQueryOptions);

  const applyAwardMutation = useMutation(equipItem, {
    onSuccess: (data) => {
      console.log('장착 myInvenAward', data);
      queryClient.invalidateQueries(['equippedAward']);
    },
    onError: (error) => {
      console.log('장착 myInvenAward', error);
    },
  });

  const handleApplyButtonClick = (item_id: string) => {
    if (!user) {
      return;
    }

    applyAwardMutation.mutate({ user_id: user.id, item_id, category: 1 });
    toast.success('장착 되었습니다❣️', {
      autoClose: 1000,
    });
  };
  const totalPages = awards ? Math.ceil(awards.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };
  const awardsList = Array.isArray(awards) ? (
    <GridContainer>
      {awards?.map((award, index) => (
        <div key={index}>
          <img
            src={award.items.img_url}
            alt={award.items.name}
            style={{ width: '240px' }}
          />
          <A.Equip onClick={() => handleApplyButtonClick(award.item_id)}>
            적용
          </A.Equip>
        </div>
      ))}
    </GridContainer>
  ) : (
    <B.NoneContainer mediaWidth={width}>
      <B.NoneMessage>구매한 칭호가 없습니다.</B.NoneMessage>
      <B.NoneButton
        onClick={() => {
          navigate('/shop/:category');
        }}
      >
        칭호 구매하러 가기
        <img src={goShop} alt="고샾" />
      </B.NoneButton>
    </B.NoneContainer>
  );
  console.log('내 칭호:', awards);

  return (
    <div>
      <GridContainer>{awardsList}</GridContainer>
      <Page>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </Page>
    </div>
  );
};

export default MyInvenAward;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
`;
export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
