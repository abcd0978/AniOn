import React, { useEffect, useState } from 'react';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimePreview, getAnimeById } from '../../api/laftel';
import { atom, useAtomValue } from 'jotai'; // Removed unused import
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { Anime } from './LikedAnime.styles';
import { EditTitle } from './EditProfile';
import { S } from '../anime-recommend/styled.AnimeCard';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { Database } from '../../types/supabase';
import { HoverInfo } from '../anime-recommend/styled.AnimeCard';
import viewDetail from '../../assets/viewdetail.svg';
import LikeSvg from '../anime-recommend/LikeSvg';
import { AnimeG } from '../../types/anime';
import { styled } from 'styled-components';
import { Container } from './EditProfile';
type ReadMyLike = Database['public']['Tables']['anime_likes']['Row'];
interface Props {
  anime: AnimeG;
  likesCount: (anime_id: string) => number;
  isLike: (anime_id: string) => boolean;
  handleLike: (anime_id: string) => void;
}
const itemsPerPage = 8;
const LikedAnime = () => {
  const [likedAnime, setLikedAnime] = useState<
    {
      images: any;
      img: string | undefined;
      name: string | undefined;
      animeId: string;
      preview: any;
      anime: any;
    }[]
  >([]);

  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const {
    data: postsAndTotalPages,
    isLoading,
    isFetching,
  } = useQuery<{ data: ReadMyLike[]; totalPages: number }>(
    ['posts', selectedCategory, searchKeyword, page],
    () => getAnimeById(selectedCategory || ''),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );

  useEffect(() => {
    const fetchLikedAnime = async () => {
      try {
        if (!user) {
          return;
        }

        const likes = await fetchAllAnimeMyLikes({
          user_id: user.id,
          id: '',
          anime_id: '',
        });

        const animeDataPromises = likes.map(async (like) => {
          const animeId = like.anime_id;
          const preview = await getAnimePreview(animeId);
          const anime = await getAnimeById(animeId);
          const images = anime.images || [];
          const img = images.length !== 0 ? images[0].img_url : undefined;
          const name = anime.name;

          return { animeId, preview, anime, images, img, name };
        });

        const animeData = await Promise.all(animeDataPromises);
        setLikedAnime(animeData);
      } catch (error) {
        console.error('Error fetching liked anime:', error);
      }
    };

    fetchLikedAnime();
  }, [user]);

  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setPage(selected);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = likedAnime.slice(startIndex, endIndex);

  return (
    <Container className="liked-anime-container">
      <EditTitle>찜한 목록</EditTitle>
      <Anime.PosterContainer className="anime-list">
        {displayedAnime.map((anime) => (
          <Anime.OnePoster
            key={anime.animeId}
            onClick={() => navigate(`/recommend/${anime.animeId}`)}
            className="anime-card"
          >
            <Anime.Poster
              src={
                anime.images?.length !== 0
                  ? anime.images![0].img_url
                  : anime.img
              }
              alt={anime.name}
            />
            <S.CardTitle>{anime.anime.name}</S.CardTitle>
          </Anime.OnePoster>
        ))}
      </Anime.PosterContainer>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(likedAnime.length / itemsPerPage)}
        onClick={handlePageChange}
      />
    </Container>
  );
};

export default LikedAnime;
