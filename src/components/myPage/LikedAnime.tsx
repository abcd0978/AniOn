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
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = liked.slice(startIndex, endIndex);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setPage(selected);
    }
  };
  const likedList = Array.isArray(liked) ? (
    <Anime.Container>
      찜한 목록
      <GridContainer>
        {displayedAnime.map((like, index) => (
          <Anime.OnePoster
            key={index}
            onClick={() => navigate(`/recommend/${like.anime_id}`)}
          >
            <Anime.Poster src={animeTitles[like.anime_id]?.img} />
            {animeTitles[like.anime_id]?.name}
          </Anime.OnePoster>
        ))}
      </GridContainer>
    </Anime.Container>
  ) : null;

  return (
    <div>
      {likedList}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(liked.length / itemsPerPage)}
        onClick={handlePageChange}
      />
    </div>
  );
};

export default LikedAnime;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
