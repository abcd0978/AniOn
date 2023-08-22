import React from 'react';
import { S } from './styled.AnimeCard';
interface Props {
  title: string;
  genre: string;
}

const AnimeCard = ({ title, genre }: Props) => {
  return <S.CardDiv>AnimeCard</S.CardDiv>;
};

export default AnimeCard;
