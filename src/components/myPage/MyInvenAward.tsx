import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { A } from './Deco.styles';
import goShop from '../../assets/goShop.png';
// import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
import { equipItem, fetchMyAwards, unEquipItem } from '../../api/items';
import { styled } from 'styled-components';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PaginationTwo } from '../PagenationTwo';
const itemsPerPage = 15;

const MyInvenAward = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  // const { width, height, isMobile, isLoaded } = useViewport();
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
    onSuccess: () => {
      queryClient.invalidateQueries(['equippedAward']);
      queryClient.invalidateQueries(['myAwards']);
      toast.success('장착 되었습니다❣️', {
        autoClose: 800,
      });
    },
    // onError: (error) => {
    //   console.log('장착 myInvenAward', error);
    // },
  });

  const unEquipItemMutation = useMutation(unEquipItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['equippedAward']);
      queryClient.invalidateQueries(['myAwards']);
      toast.success('해제 되었습니다👋', {
        autoClose: 800,
      });
    },
    // onError: (error) => {
    //   console.log('장착 myInvenAward', error);
    // },
  });

  const handleApplyButtonClick = (params: {
    itemId: string;
    isEquipped: boolean;
  }) => {
    if (!user) {
      return;
    }

    // 장착중이면
    if (params.isEquipped) {
      unEquipItemMutation.mutate({ user_id: user.id, item_id: params.itemId });
      return;
    }

    applyAwardMutation.mutate({
      user_id: user.id,
      item_id: params.itemId,
      category: 1,
    });
  };

  const filteredAwards = awards?.filter((award) => awards.length !== 0);

  const totalPages = filteredAwards
    ? Math.ceil(filteredAwards.length / itemsPerPage)
    : 0;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const displayedAwards = filteredAwards?.slice(startIndex, endIndex);

  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };

  const awardsList =
    Array.isArray(filteredAwards) && filteredAwards.length > 0 ? (
      <GridContainer>
        {displayedAwards?.map((filteredAwards, index) => (
          <div key={index}>
            <img
              src={filteredAwards.items.img_url}
              alt={filteredAwards.items.name}
              style={{ width: '240px' }}
            />

            <A.Equip
              is_equipped={filteredAwards.is_equipped}
              onClick={() =>
                handleApplyButtonClick({
                  itemId: filteredAwards.item_id,
                  isEquipped: filteredAwards.is_equipped,
                })
              }
            >
              {filteredAwards.is_equipped ? '해제' : '적용'}
            </A.Equip>
          </div>
        ))}
      </GridContainer>
    ) : (
      <A.NoneContainer>
        <A.NoneMessage>구매한 칭호가 없습니다.</A.NoneMessage>
        <A.NoneButton
          onClick={() => {
            navigate('/shop/:category');
          }}
        >
          칭호 구매하러 가기
          <img src={goShop} alt="고샾" />
        </A.NoneButton>
      </A.NoneContainer>
    );

  return (
    <A.Container>
      <GridContainer>{awardsList}</GridContainer>
      <div>
        <Page>
          {Array.isArray(filteredAwards) && filteredAwards.length > 0 && (
            <PaginationTwo
              currentPage={currentPage}
              totalPages={totalPages}
              onClick={handlePageChange}
              isPreviousDisabled={currentPage === 1}
              isNextDisabled={currentPage >= totalPages}
            />
          )}
        </Page>
      </div>
    </A.Container>
  );
};

export default MyInvenAward;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  padding: 10px;
`;

export const Page = styled.div`
  position: absolute;
  justify-content: center;
  margin-top: -30%;
  margin-left: 66%;
`;
