import React from 'react';
import { S } from './styled.animeCategory';
const AnimeCategory = () => {
  return (
    <S.CategoryContainer>
      <S.CategoryButton $isSelected={true}>전체</S.CategoryButton>
      <S.CategoryButton>장르별</S.CategoryButton>
      <S.CategoryButton>분기별</S.CategoryButton>
      <S.CategoryButton>방영중</S.CategoryButton>
    </S.CategoryContainer>
  );
};

export default AnimeCategory;
