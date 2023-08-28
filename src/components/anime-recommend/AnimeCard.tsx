import React from 'react';
import { S } from './styled.AnimeCard';
import { HoverInfo } from './styled.AnimeCard';
import { AnimeG } from '../../types/anime';
import { useNavigate } from 'react-router-dom';

import LikeSvg from './LikeSvg';
import viewDetail from '../../assets/viewdetail.svg';

interface Props {
  anime: AnimeG;
  likesCount: (anime_id: string) => number;
  isLike: (anime_id: string) => boolean;
  handleLike: (anime_id: string) => void;
}

const AnimeCard = ({ anime, likesCount, isLike, handleLike }: Props) => {
  const navigate = useNavigate();

  return (
    <S.CardDiv key={anime.id}>
      <S.CardInfo onClick={() => navigate(`/recommend/${anime.id}`)}>
        <S.HoverDiv>
          <S.CardThumbnail
            src={
              anime.images?.length !== 0 ? anime.images![0].img_url : anime.img
            }
            alt={anime.name}
          />
          <HoverInfo>
            <S.HoverGenre key={anime.id}>
              <S.GenreText>{anime.genres![0]}</S.GenreText>
            </S.HoverGenre>
            <S.HoverTitleAndDetail>
              <S.HoverTitle>{anime.name}</S.HoverTitle>
              <S.HoverViewDetail>
                <p>자세히 보기</p>
                <img className="viewDetail" src={viewDetail} alt="viewdetail" />
              </S.HoverViewDetail>
            </S.HoverTitleAndDetail>

            <S.HoverLikeBox>
              <LikeSvg
                onClick={() => handleLike(String(anime.id))}
                is_like={isLike(String(anime.id))}
              />
              <div>{likesCount(String(anime.id))}</div>
            </S.HoverLikeBox>
          </HoverInfo>
        </S.HoverDiv>
        <S.CardTitle>{anime.name}</S.CardTitle>
      </S.CardInfo>
      <S.CardGenres>
        {anime.genres?.slice(0, 2).map((genre, index) => {
          return (
            <S.Genre key={index}>
              <S.GenreText># {genre}</S.GenreText>
            </S.Genre>
          );
        })}
      </S.CardGenres>
    </S.CardDiv>
  );
};

export default AnimeCard;
