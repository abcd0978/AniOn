import React from 'react';
import * as S from './Shop.style';
import { useState } from 'react';
import ShopAwardList from '../components/ShopAwards';
import ShopBorder from './ShopBorder';
import { useQuery } from '@tanstack/react-query';
import { fetchMyPoint } from '../api/items';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';

const Shop = () => {
  const user = useAtomValue(userStore.user);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Border',
  );

  //현재 포인트 불러오기
  const { data: userPoint } = useQuery({
    queryKey: ['userPoint'],
    queryFn: () => fetchMyPoint(user?.id!),
    enabled: !!user,
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  const renderSelectedCategory = () => {
    switch (selectedCategory) {
      case 'Border':
        return <ShopBorder />;
      case 'Awards':
        return <ShopAwardList />;
      default:
        return null;
    }
  };
  return (
    <S.Outer>
      <S.Top>
        <S.Title>상점</S.Title>
        <S.ButtonContainer>
          <S.ButtonBox>
            <S.Button
              onClick={() => handleCategoryClick('Border')}
              style={{
                backgroundColor:
                  selectedCategory === 'Border' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === 'Border' ? '#ffffff' : 'black',
              }}
            >
              테두리
            </S.Button>
            <S.Button
              onClick={() => handleCategoryClick('Awards')}
              style={{
                backgroundColor:
                  selectedCategory === 'Awards' ? '#FF96DB' : '#FFEBF7',
                color: selectedCategory === 'Awards' ? '#ffffff' : 'black',
              }}
            >
              칭호
            </S.Button>
          </S.ButtonBox>
          <S.Point>
            {!user ? '로그인 해주세요!' : `보유 P:${userPoint}`}
          </S.Point>
        </S.ButtonContainer>
      </S.Top>
      {renderSelectedCategory()}
    </S.Outer>
  );
};

export default Shop;
