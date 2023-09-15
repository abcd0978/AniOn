import { useAtomValue } from 'jotai';
import { fetchAllAnimeMyLikes } from '../../api/aniLike';
import { getAnimeById } from '../../api/laftel';
import * as userStore from '../../store/userStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { AnimeG } from '../../types/anime';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import viewDetail from '../../assets/viewdetail.svg';
import useViewport from '../../hooks/useViewPort';
import LikeSvg from '../anime-recommend/LikeSvg';
import LikedSkeleton from './Skeleton.MyPage/LikedSkeleton';
import goShop from '../../assets/goShop.png';
import { PaginationTwo } from '../PagenationTwo';

const LikedAnime = () => {
  const [page, setPage] = useState<number>(1);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);
  const [likedAnimeIds, setLikedAnimeIds] = useState<string[]>([]);
  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const [topTags, setTopTags] = useState<string[]>([]);
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
    if (animeTitles) {
      const tags: string[] = [];
      Object.values(animeTitles).forEach((anime) => {
        if (anime.tags) {
          tags.push(...anime.tags);
        }
      });

      const tagCounts: Record<string, number> = {};
      for (const tag of tags) {
        if (!tagCounts[tag]) tagCounts[tag] = 0;
        tagCounts[tag]++;
      }

      const sortedTags = Object.entries(tagCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([tag]) => tag)
        .slice(0, 4);

      setTopTags(sortedTags);
    }
  }, [animeTitles]);
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
  const itemsPerPage = 9;

  const filteredLiked = liked?.filter((liked) => liked.length !== 0);

  const totalPages = Math.ceil(filteredLiked.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = filteredLiked.slice(startIndex, endIndex);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };
  const likedList =
    Array.isArray(filteredLiked) && filteredLiked.length > 0 ? (
      <L.GridContainer>
        {displayedAnime.map((filteredLiked, index) => (
          <div key={index}>
            <L.Container
              onClick={() => navigate(`/recommend/${filteredLiked.anime_id}`)}
            >
              <PosterImage
                src={
                  animeTitles[filteredLiked.anime_id] &&
                  animeTitles[filteredLiked.anime_id].images!
                    ? animeTitles[filteredLiked.anime_id].images!.length > 1
                      ? animeTitles[filteredLiked.anime_id].images![1].img_url
                      : animeTitles[filteredLiked.anime_id].images!.length > 0
                      ? animeTitles[filteredLiked.anime_id].images![0].img_url
                      : animeTitles[filteredLiked.anime_id]?.img
                    : undefined
                }
              />
              <L.AnimeTitle>
                {animeTitles[filteredLiked.anime_id] &&
                  animeTitles[filteredLiked.anime_id].name}
              </L.AnimeTitle>
              <L.HoverContent>
                <HoverViewDetail>
                  <p>자세히 보기</p>
                  <img
                    className="viewDetail"
                    src={viewDetail}
                    alt="viewdetail"
                  />
                </HoverViewDetail>
                <LikedInfoTitle>
                  {animeTitles[filteredLiked.anime_id] &&
                    animeTitles[filteredLiked.anime_id].name}
                </LikedInfoTitle>
                <HoveredAnimeGenre>
                  {animeTitles[filteredLiked.anime_id] &&
                    animeTitles[filteredLiked.anime_id]?.genres
                      ?.slice(0, 1)
                      .map((genre, index) => (
                        <HoveredAnimeGenreTag key={index}>
                          {genre}
                        </HoveredAnimeGenreTag>
                      ))}
                </HoveredAnimeGenre>
                <L.LikedAnimeGenre>
                  {animeTitles[filteredLiked.anime_id] &&
                    animeTitles[filteredLiked.anime_id]?.genres
                      ?.slice(0, 2)
                      .map((genre, index) => (
                        <L.GenreTag key={index}>#{genre}</L.GenreTag>
                      ))}
                </L.LikedAnimeGenre>
              </L.HoverContent>
            </L.Container>
          </div>
        ))}
      </L.GridContainer>
    ) : (
      <L.NoContainer>
        <L.NoMessage>좋아요를 누른 애니메이션이 없어요!</L.NoMessage>
        <L.GoRecommend
          onClick={() => {
            navigate('/recommend');
          }}
        >
          애니메이션 찾으러 가기
          <img src={goShop} alt="고샾" />
        </L.GoRecommend>
      </L.NoContainer>
    );
  return (
    <L.LikedContainer>
      {user && topTags.length > 0 && (
        <L.TopTags>
          {user?.nickname}님은 <L.Tags>#{topTags.join('#')}</L.Tags>을 좋아해요!
        </L.TopTags>
      )}
      <L.Title>찜한 목록</L.Title>

      <L.FullPage>
        {Array.isArray(displayedAnime) && displayedAnime.length > 0 && (
          <L.Page>
            <PaginationTwo
              currentPage={currentPage}
              totalPages={totalPages}
              onClick={handlePageChange}
              isPreviousDisabled={currentPage === 1}
              isNextDisabled={currentPage >= totalPages}
            />
          </L.Page>
        )}
        <L.List>{likedList}</L.List>
      </L.FullPage>
    </L.LikedContainer>
  );
};
export default LikedAnime;

export const HoverViewDetail = styled.div`
  visibility: hidden;
  display: flex;
  margin-top: -250px;
  margin-left: -30px;
  align-items: center;
  position: absolute;
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background-color: #8200ff;
  color: white;

  cursor: pointer;
  @media (max-width: 768px) {
    visibility: hidden;
    display: flex;
    align-items: center;
    position: absolute;
    border-radius: 999px;
    border: none;
    background-color: #8200ff;
    color: white;
    width: 100px;
    height: 20px;
    padding: 6px 8px;
    top: 300px;
    justify-content: flex-start;
    left: 30px;
  }
  p {
    margin-left: 12px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
export const PosterImage = styled.img`
  width: 280px;
  height: 175px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 160px;
    height: 100px;
  }
`;
export const LikedInfoTitle = styled.div`
  visibility: hidden;
  width: 100%;
  color: white;
  height: 100px;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  position: absolute;
  margin-left: 20px;
  margin-top: -140px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(40% - (50px + (70px / 2)));
  white-space: nowrap;
  transform: translate(-45%, -90%);
  overflow: hidden;
`;
export const HoveredAnimeGenreTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 16px;
  background: #f3e7ff;
  padding: 7px 14px;
  border-radius: 3px;
  position: absolute;
  margin-top: -220px;
  margin-left: -100px;
  border-radius: 50px;
  text-align: center;
`;
export const HoveredAnimeGenre = styled.div`
  visibility: hidden;
  display: flex;
  align-items: flex-start;
  padding: 5px;
`;

const L = {
  LikedContainer: styled.div`
    margin-top: -220%;
    margin-left: 110%;
    @media (max-width: 1500px) {
      margin-top: -240%;
      margin-left: 110%;
    }
    @media (max-width: 1400px) {
      margin-top: -260%;
      margin-left: 110%;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-left: 10px;
      margin-top: -10px;
      padding-bottom: 10%;
    }
    @media (max-width: 480px) {
      margin-bottom: 200%;
      margin-top: -10px;
    }
    @media (max-width: 400px) {
    }
  `,
  GridContainer: styled.div`
    display: grid;
    gap: 0px 20px;

    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1300px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0px;
      margin-left: 10%;
    }
    @media (max-width: 480px) {
      margin-left: 2%;
      margin-top: 10%;
    }
    @media (max-width: 400px) {
      margin-left: -5%;
      margin-top: 10%;
    }
  `,
  Title: styled.div`
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,
  TopTags: styled.div`
    border-radius: 999px;
    position: absolute;
    background: var(--main-light-2, #f3e7ff);
    width: auto;
    display: flex;
    height: 32px;
    padding: 8px 20px;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-top: -60px;
    @media (max-width: 768px) {
      font-size: 12px;
      height: 10px;
      max-width: 100%;
      margin-top: -30px;
      margin-left: -10%;
    }
    @media (max-width: 480px) {
      margin-left: 0%;
    }
    @media (max-width: 400px) {
      margin-left: -5%;
    }
  `,

  NoContainer: styled.div`
    display: grid;
    align-items: center;
    transform: translate(300px, 300px);

    justify-content: center;
    @media (max-width: 768px) {
      align-items: center;
      transform: translate(40px, 80px);
    }
  `,
  GoRecommend: styled.button`
    background-color: #8200ff;
    color: #fff;
    width: 226.5px;
    height: 48px;
    border-radius: 30px;
    border-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  `,
  NoMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,

  Page: styled.div`
    position: absolute;
    justify-content: center;
    display: block;
    top: -40px;
    right: 200px;
    @media (max-width: 768px) {
      position: absolute;
      justify-content: center;
      display: block;
      top: -35px;
      right: 120px;
    }
    @media (max-width: 480px) {
      right: 40%;
      top: -5px;
    }

    @media (max-width: 400px) {
      right: 40%;
      top: -5px;
    }
    @media (max-width: 380px) {
      right: 45%;
      top: -5px;
    }
    @media (max-width: 360px) {
      right: 40%;
      top: -5px;
    }
  `,

  FullPage: styled.div`
    position: absolute;
    padding-bottom: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @media (max-width: 768px) {
    }
  `,
  Tags: styled.div`
    font-weight: 600;
  `,
  List: styled.div`
    @media (max-width: 768px) {
      padding-bottom: 10%;
    }
  `,

  AnimeTitle: styled.div`
    width: 220px;
    height: 19px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px;
    @media (max-width: 768px){
      font-size:14px ;
      width:160px ; 
      text-overflow: ellipsis;
      white-space :nowrap ;
      }
    }
  `,
  HoverContent: styled.div`
    align-items: center;
    justify-content: center;
    display: grid;
    margin-left: 110px;
  `,

  LikedAnimeGenre: styled.div`
    height: 16px;
    display: flex;
    justify-content: flex-start;
    margin-left: -110px;
    margin-bottom: 24px;
    margin-top: -12px;
    padding: 5px;
    gap: 4px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  GenreTag: styled.div`
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    height: 16px;
    background: #efefef;
    border-radius: 999px;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 100%;

    cursor: pointer;

    &:hover ${HoverViewDetail} {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
      @media (max-width: 768px) {
        visibility: hidden;
      }
    }
    &:hover ${PosterImage} {
      filter: brightness(0.3);
      transition: 0.3s ease-in-out;
    }
    &:hover ${LikedInfoTitle} {
      visibility: visible;
    }
    &:hover ${HoveredAnimeGenre} {
      visibility: visible;
      @media (max-width: 768px) {
        visibility: hidden;
      }
    }
    @media (max-width: 540px) {
      width: 100%;
      height: 100%;
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
  `,
};
