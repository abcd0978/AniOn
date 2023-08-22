import React from 'react';
// import { genres } from '../../../consts';
import { useAtomValue } from 'jotai';
import { selectedCategoryAtom } from './AnimeCategory';
const AnimeTag = () => {
  const category = useAtomValue(selectedCategoryAtom);
  return <div>{category}</div>;
};

export default AnimeTag;
