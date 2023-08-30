import React from 'react';
import * as S from './Shop.style';
import { useState } from 'react';
import ShopAwards from '../components/ShopAwards';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div>
      <ShopAwards />
    </div>
  );
};

export default Shop;
