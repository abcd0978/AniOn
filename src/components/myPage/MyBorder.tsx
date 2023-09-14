import { equipItem, fetchMyBorders, unEquipItem } from '../../api/items';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import goShop from '../../assets/goShop.png';
import { B } from './Styled.MyPage/Deco.styles';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import { PaginationTwo } from '../PagenationTwo';
import Loading from '../Loading/Loading';
const itemsPerPage = 8;

const MyBorder = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  // const { width, height, isMobile, isLoaded } = useViewport();
  const navigate = useNavigate();

  const inventoryQueryOptions = {
    queryKey: ['myBorders'],
    queryFn: () => fetchMyBorders(user!.id),
    refetchOnWindowFocus: false,
    enabled: !!user,
  };

  const { isLoading, isError, data: borders } = useQuery(inventoryQueryOptions);

  const applyBorderMutation = useMutation(equipItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['equippedBorder']);
      queryClient.invalidateQueries(['myBorders']);
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
      queryClient.invalidateQueries(['equippedBorder']);
      queryClient.invalidateQueries(['myBorders']);
      toast.success('해제 되었습니다👋', {
        autoClose: 800,
      });
    },
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

    applyBorderMutation.mutate({
      user_id: user.id,
      item_id: params.itemId,
      category: 0,
    });
  };

  if (isLoading) {
    return (
      <B.BorderLoading>
        <Loading />
      </B.BorderLoading>
    );
  }
  if (isError) {
    return <div>테두리를 불러오지 못했어요.</div>;
  }

  const filteredBorders = borders.filter((borders) => borders.items !== null);

  const totalPages = Math.ceil(filteredBorders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedBorder = filteredBorders.slice(startIndex, endIndex);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };

  const borderList =
    Array.isArray(filteredBorders) && filteredBorders.length > 0 ? (
      <B.Container>
        <B.BorderPage>
          {Array.isArray(filteredBorders) &&
            filteredBorders.length >= itemsPerPage && (
              <PaginationTwo
                currentPage={currentPage}
                totalPages={totalPages}
                onClick={handlePageChange}
                isPreviousDisabled={currentPage === 1}
                isNextDisabled={currentPage >= totalPages}
              />
            )}
        </B.BorderPage>
        {displayedBorder.map((filteredBorders, index) => (
          <div key={index}>
            <B.BorderContainer>
              <B.BorderImg
                src={filteredBorders.items?.img_url}
                alt={filteredBorders.items?.name}
              />
              <B.ButtonContainer>
                <B.BorderName>{filteredBorders.items?.name}</B.BorderName>

                <B.Equip
                  is_equipped={filteredBorders.is_equipped}
                  onClick={() =>
                    handleApplyButtonClick({
                      itemId: filteredBorders.items?.id,
                      isEquipped: filteredBorders.is_equipped,
                    })
                  }
                >
                  {filteredBorders.is_equipped ? '해제' : '적용'}
                </B.Equip>
              </B.ButtonContainer>
            </B.BorderContainer>
          </div>
        ))}
      </B.Container>
    ) : (
      <B.NoneContainer>
        <B.NoneMessage>구매한 테두리가 없습니다.</B.NoneMessage>
        <B.NoneButton
          onClick={() => {
            navigate('/shop/:category');
          }}
        >
          테두리 구매하러 가기
          <img src={goShop} alt="상점으로" />
        </B.NoneButton>
      </B.NoneContainer>
    );

  return (
    <B.BorderContainer>
      <B.Container>{borderList}</B.Container>
    </B.BorderContainer>
  );
};

export default MyBorder;
