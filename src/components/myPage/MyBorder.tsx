import { equipItem, fetchMyBorders } from '../../api/items';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import * as userStore from '../../store/userStore';
import goShop from '../../assets/goShop.png';
import { B } from './Deco.styles';
import * as S from '../../pages/Shop.style';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Pagination from '../Pagenation';

import { toast } from 'react-toastify';

import { Page } from './MyInvenAward';
import { styled } from 'styled-components';

const itemsPerPage = 12;

const MyBorder = () => {
  const [page, setPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const { width, height, isMobile, isLoaded } = useViewport();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: borders,
  } = useQuery(
    ['myBorders', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchMyBorders(user.id);
      return result;
    },
    {
      enabled: !!user?.id,
    },
  );

  const applyBorderMutation = useMutation(equipItem, {
    onSuccess: (data) => {
      console.log('장착 myInvenAward', data);
      queryClient.invalidateQueries(['equippedBorder']);
      queryClient.invalidateQueries(['myBorders']);
      toast.success('장착 되었습니다❣️', {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.log('장착 myInvenAward', error);
    },
  });

  const handleApplyButtonClick = (item_id: string) => {
    if (!user) {
      return;
    }

    applyBorderMutation.mutate({ user_id: user.id, item_id, category: 0 });
  };

  if (isLoading) {
    return <div>테두리를 불러오는 중</div>;
  }
  if (isError) {
    return <div>테두리를 불러오지 못했어요.</div>;
  }
  const totalPages = Math.ceil(borders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBorder = borders.slice(startIndex, endIndex);
  const filteredBorders = borders.filter((borders) => borders.items !== null);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };
  console.log(filteredBorders);
  const borderList =
    Array.isArray(filteredBorders) && filteredBorders.length > 0 ? (
      <B.Container>
        {filteredBorders.map((filteredBorders, index) => (
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
                    handleApplyButtonClick(filteredBorders.items?.id)
                  }
                  disabled={filteredBorders.is_equipped}
                >
                  {filteredBorders.is_equipped ? '적용됨' : '적용'}
                </B.Equip>
              </B.ButtonContainer>
            </B.BorderContainer>
          </div>
        ))}
      </B.Container>
    ) : (
      <B.NoneContainer $mediawidth={width}>
        <B.NoneMessage>구매한 테두리가 없습니다.</B.NoneMessage>
        <B.NoneButton
          onClick={() => {
            navigate('/shop/:category');
          }}
        >
          테두리 구매하러 가기
          <img src={goShop} />
        </B.NoneButton>
      </B.NoneContainer>
    );
  return (
    <div>
      {borderList}
      <BorderPage>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </BorderPage>
    </div>
  );
};

export default MyBorder;
export const BorderPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 300px;
`;
export const BorderItem = styled.div`
  margin: 5px;
  gap: 0px;
  width: 400px;
`;
export const Outer = styled.div`
  width: 1430px;
  height: 999px;
  margin-top: -100px;
  margin-left: 20px;
`;
