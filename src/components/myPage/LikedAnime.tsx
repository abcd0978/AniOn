import { useAtomValue } from 'jotai';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimeById } from '../../api/laftel';
import * as userStore from '../../store/userStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { AnimeG } from '../../types/anime';
import { useNavigate } from 'react-router-dom';
import { Anime } from './LikedAnime.styles';
import { styled } from 'styled-components';
import Pagination from '../Pagenation';
import viewDetail from '../../assets/viewdetail.svg';
import { S } from '../anime-recommend/styled.AnimeCard';
import { HoverInfo } from '../anime-recommend/styled.AnimeCard';
import { Container, EditTitle } from './EditProfile';
const itemsPerPage = 8;
const LikedAnime = () => {
  const [page, setPage] = useState<number>(1);

  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: liked,
  } = useQuery(
    ['likedAnime', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchAllAnimeMyLikes(user.id);
      return result;
    },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    if (liked && liked.length > 0) {
      const fetchAnimeDetails = async () => {
        const animePromises = liked.map((like) => getAnimeById(like.anime_id));

        try {
          const animeDataList = await Promise.all(animePromises);

          const newAnimeTitles: Record<string, AnimeG> = {};
          for (let i = 0; i < liked.length; i++) {
            newAnimeTitles[liked[i].anime_id] = animeDataList[i];
          }

          setAnimeTitles(newAnimeTitles);
        } catch (error) {
          console.error('Error fetching anime details:', error);
        }
      };

      fetchAnimeDetails();
    }
  }, [liked]);

  if (isLoading) {
    return <div>좋아요한 애니를 불러오는 중</div>;
  }

  if (isError) {
    return <div>좋아요 목록을 불러오지 못했어요</div>;
  }
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = liked.slice(startIndex, endIndex);
  const totalAnimeCount = liked.length;
  const totalPages = Math.ceil(totalAnimeCount / itemsPerPage);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setPage(selected);
    }
  };
  // 현재 페이지와 총 페이지 수를 계산합니다.
  const isPreviousDisabled = page === 1;
  const isNextDisabled = page >= totalPages;
  const likedList = Array.isArray(liked) ? (
    <Container>
      <EditTitle>찜한 목록</EditTitle>
      <GridContainer>
        {displayedAnime.map((like, index) => (
          <Anime.OnePoster
            key={index}
            onClick={() => navigate(`/recommend/${like.anime_id}`)}
          >
            <Anime.Poster src={animeTitles[like.anime_id]?.img} />
            <S.CardTitle>{animeTitles[like.anime_id]?.name}</S.CardTitle>
            <HoverInfo>
              <S.HoverGenre key={like.id}></S.HoverGenre>
              <S.HoverTitleAndDetail>
                <S.HoverTitle>{like.name}</S.HoverTitle>

                <S.HoverViewDetail>
                  <p>자세히 보기</p>
                  <img
                    className="viewDetail"
                    src={viewDetail}
                    alt="viewdetail"
                  />
                </S.HoverViewDetail>
              </S.HoverTitleAndDetail>
            </HoverInfo>
          </Anime.OnePoster>
        ))}
      </GridContainer>
    </Container>
  ) : null;

  return (
    <div>
      {likedList}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(liked.length / itemsPerPage)}
        onClick={handlePageChange}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default LikedAnime;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  :hover {
    filter: brightness(0.5);
  }
`;
const HoverViewDetail = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  cursor: pointer;
  p {
    margin-left: 12px;
  }
`;
