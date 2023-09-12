import React, { useState, useEffect } from 'react';
import * as itemApi from '../api/items';
import * as S from '../pages/Shop.style';
import BorderCard from '../components/BorderCard';
import { useQuery } from '@tanstack/react-query';
// import * as userStore from '../store/userStore';
// import { useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
import Loading from '../components/Loading/Loading';

const ShopBorder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<{ data: any[]; totalPages: number }>({
    data: [],
    totalPages: 0,
  });

  // const itemsPerPage = 10;

  const getBorders = {
    queryKey: ['borders', currentPage],
    queryFn: () => {
      const data = itemApi.fetchBorders(currentPage);

      return data;
    },
    refetchOnWindowFocus: false,
  };

  const { data: fetchedData, isLoading } = useQuery(getBorders);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  if (isLoading) {
    return <Loading />;
  }

  // const currentItems = data
  //   ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  //   : [];

  // const totalPages = Math.ceil((data?.length || 1) / itemsPerPage);

  const handlePageChange = (selected: number | string) => {
    if (currentPage === selected) return;
    if (typeof selected === 'number') {
      setCurrentPage(selected);
      return;
    }
    if (selected === 'prev' && currentPage > 1) {
      setCurrentPage((prev: number) => prev - 1);
      return;
    }
    if (selected === 'next' && currentPage < data.totalPages!) {
      setCurrentPage((prev: number) => prev + 1);
      return;
    }
  };

  return (
    <S.Outer>
      <S.Bottom>
        <S.ItemBox>
          {data.data.map((border, index) => (
            <BorderCard border={border} key={index} />
          ))}
        </S.ItemBox>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onClick={handlePageChange}
            isPreviousDisabled={currentPage === 1}
            isNextDisabled={currentPage === data.totalPages}
          />
        </div>
      </S.Bottom>
    </S.Outer>
  );
};

export default ShopBorder;
