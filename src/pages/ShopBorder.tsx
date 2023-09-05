import React, { useState, useEffect } from 'react';
import * as itemApi from '../api/items';
import * as S from '../pages/Shop.style';
import BorderCard from '../components/BorderCard';
import { useQuery } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import { useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';

const ShopBorder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[] | undefined>(undefined);

  const itemsPerPage = 10;

  const getBorders = {
    queryKey: ['borders'],
    queryFn: () => {
      const data = itemApi.fetchBorders();
      return data;
    },
    refetchOnWindowFocus: false,
  };

  const { data: fetchedData } = useQuery(getBorders);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const currentItems = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = Math.ceil((data?.length || 1) / itemsPerPage);

  const handlePageChange = async (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <S.Outer>
      <S.Bottom>
        <S.ItemBox>
          {currentItems.map((border, index) => (
            <BorderCard border={border} key={index} />
          ))}
        </S.ItemBox>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
            isPreviousDisabled={currentPage === 1}
            isNextDisabled={currentPage === totalPages}
          />
        </div>
      </S.Bottom>
    </S.Outer>
  );
};

export default ShopBorder;
