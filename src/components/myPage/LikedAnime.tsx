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
import useViewport from '../../hooks/useViewPort';
import LikeSvg from '../anime-recommend/LikeSvg';
import LikedSkeleton from './LikedSkeleton';

const itemsPerPage = 9;
const LikedAnime = () => {
  const [page, setPage] = useState<number>(1);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);
  const [likedAnimeIds, setLikedAnimeIds] = useState<string[]>([]);
  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const { width: mediaWidth } = useViewport();

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
  const skeletonWidth = width > 1200 ? 100 : width > 800 ? 50 : 25;
  if (isLoading) {
    return (
      <div>
        <LikedSkeleton width={skeletonWidth} />
      </div>
    );
  }

  if (isError) {
    return <div>좋아요 목록을 불러오지 못했어요</div>;
  }
  const totalPages = Math.ceil(liked.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = liked.slice(startIndex, endIndex);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };

  // 현재 페이지와 총 페이지 수를 계산합니다.
  const isPreviousDisabled = page === 1;
  const isNextDisabled = page >= totalPages;
  const likedList = Array.isArray(liked) ? (
    <S.CardInfo>
      <EditTitle>찜한 목록</EditTitle>
      <GridContainer>
        {displayedAnime.map((like, index) => (
          <OnePoster
            key={index}
            onClick={() => navigate(`/recommend/${like.anime_id}`)}
          >
            <CardThumbnail
              src={
                displayedAnime[like.anime_id]?.images?.length > 1
                  ? displayedAnime[like.anime_id]?.images[1].img_url
                  : displayedAnime[like.anime_id]?.images?.length > 0
                  ? displayedAnime[like.anime_id]?.images[0].img_url
                  : displayedAnime[like.anime_id]?.img
              }
            />
            <S.CardTitle>{animeTitles[like.anime_id]?.name}</S.CardTitle>
            <LikedInfo>
              {/* <S.HoverGenre key={like.id}>
                  {/* <S.GenreText>{like.genres!}</S.GenreText> */}
              {/* </S.HoverGenre> */}
              <LikedTitleAndDetail>
                <S.HoverTitle>{like.name}</S.HoverTitle>
                <S.HoverViewDetail>
                  <p>자세히 보기</p>
                  <img
                    className="viewDetail"
                    src={viewDetail}
                    alt="viewdetail"
                  />
                </S.HoverViewDetail>
              </LikedTitleAndDetail>

              <S.HoverLikeBox>{/* <LikeSvg /> */}</S.HoverLikeBox>
            </LikedInfo>
          </OnePoster>
        ))}
      </GridContainer>
    </S.CardInfo>
  ) : (
    '좋아요를 누른 애니메이션이 없어요'
  );

  return (
    <div>
      <PosterContainer>{likedList}</PosterContainer>
      <Page mediaWidth={width}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </Page>
    </div>
  );
};
export default LikedAnime;
export const Page = styled.div<{ mediaWidth: number }>`
  height: 10vh;
  ${(props) => `width:${250 * (props.mediaWidth / 1920)}px;`}
  margin-bottom: -100px;
  margin-left: 500px;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 10px 30px;
  grid-template-columns: repeat(3, 1fr);
`;

export const HoverViewDetail = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  cursor: pointer;
  display: none;
  p {
    margin-left: 12px;
  }
`;

const CardThumbnail = styled.img`
  width: 140%;
  aspect-ratio: 100 / 66;
  background-color: #d9d9d9;
  border-radius: 10px;
  object-fit: cover;
`;
export const LikedInfo = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  z-index: 2;
  line-height: 25px;
  color: #ffffff;
  width: 140%;
  padding: 16px;
`;
export const LikedTitleAndDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;
export const OnePoster = styled.div`
  margin-bottom: 10px;
  position: relative;
  margin-right: 80px;
  &:hover ${LikedInfo} {
    display: block;
  }

  ${LikedInfo} {
    display: flex;
    flex-direction: column;
    gap: 5px;

    line-height: 25px;
    color: #ffffff;
    padding: 16px;
  }
`;
export const PosterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 40px;
  margin-left: 0px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  top: -370px;
  margin-left: 160px;
  margin-bottom: 130px;
  :hover ${LikedInfo} {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  @media (max-width: 1600px) {
    /* 화면 크기가 1600px 이하인 경우 */
    grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
  }

  @media (max-width: 1280px) {
    /* 화면 크기가 1280px 이하인 경우 */
    grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
  }

  @media (max-width: 1024px) {
    /* 화면 크기가 1024px 이하인 경우 */
    grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
  }

  @media (max-width: 800px) {
    /* 화면 크기가 800px 이하인 경우 */
    grid-template-columns: repeat(3, 1fr); /* 2개의 컬럼으로 변경 */
  }

  @media (max-width: 480px) {
    /* 화면 크기가 800px 이하인 경우 */
    grid-template-columns: repeat(1, 1fr); /* 2개의 컬럼으로 변경 */
  }
`;
