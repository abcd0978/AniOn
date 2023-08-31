import React, { useEffect, useState } from 'react';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimeById } from '../../api/laftel';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { Anime } from './LikedAnime.styles';
import { EditTitle } from './EditProfile';
import { S } from '../anime-recommend/styled.AnimeCard';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { HoverInfo } from '../anime-recommend/styled.AnimeCard';
import viewDetail from '../../assets/viewdetail.svg';
import { Container } from './EditProfile';
// type ReadMyLike = Database['public']['Tables']['anime_likes']['Row'];

const itemsPerPage = 8;
const LikedAnime = () => {
  const [likedAnime, setLikedAnime] = useState<
    {
      images: any;
      img: string | undefined;
      name: string | undefined;
      anime_id: string;
      genres: [];
    }[]
  >([]);

  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const likedAnimeQueryOptions = {
    queryKey: ['myPageLikedAnime'],
    queryFn: () => fetchAllAnimeMyLikes(user!.id),
    refetchOnWindowFocus: false,
    enabled: !!user,
  };
  const { data: likedList } = useQuery(likedAnimeQueryOptions);

  useEffect(() => {
    const fetchLikedAnime = async () => {
      try {
        if (!likedList) {
          return;
        }

        const animeIds = likedList.map((like) => like.anime_id);

        const animeDataPromises = animeIds.map(async (like) => {
          const anime = await getAnimeById(like);
          const anime_id = like.anime_id;
          const images = anime.images || [];
          const img = images.length !== 0 ? images[0].img_url : undefined;
          const name = anime.name;
          const genres = anime.genres;

          return { anime_id, genres, images, img, name };
        });

        const animeData = await Promise.all(animeDataPromises);
        setLikedAnime(animeData);
      } catch (error) {
        console.error('Error fetching liked anime:', error);
      }
    };

    fetchLikedAnime();
  }, []);

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
            key={anime.anime_id}
            onClick={() => navigate(`/recommend/${anime.anime_id}`)}
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
            <S.CardTitle>{anime.name}</S.CardTitle>
            <HoverInfo>
              <S.HoverGenre key={anime.anime_id}>
                <S.GenreText>{anime.genres!}</S.GenreText>
              </S.HoverGenre>
              <S.HoverTitleAndDetail>
                <S.HoverTitle>{anime.name}</S.HoverTitle>
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
// const StyledPagination = styled(Pagination)`
//   color: pink;
//   font-size: 100px;
//   margin: 10px;

//   .pagination-item {
//     color: blue;
//   }
// `;
