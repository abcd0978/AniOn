import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnimeById, getAnimePreview, getAnimeStars } from '../api/laftel';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/anime-detail/VideoPlayer';
import { S } from '../components/anime-detail/anime-detail.style';
import AnimeDetailComments from '../components/anime-detail/AnimeDetailComments';
import { useRef } from 'react';
import filled from '../assets/filledLike.svg';
import unfilled from '../assets/unfilledLike.svg';
import share from '../assets/share.svg';
import { fetchAnimeLikes, toggleAnimeLike } from '../api/likeApi';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import { ReadAnimeLikeG } from '../types/likes';
import play_arrow from '../assets/play_arrow.svg';
import StarRating from '../components/anime-detail/StarRating';
import detaillike from '../assets/detaillike.svg';

function AnimeDetail() {
  const previewRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const currentUrl = window.location.href;

  const user = useAtomValue(userStore.user);

  const scrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //parameter 가져오기
  const { ani_id } = useParams() as { ani_id: string };

  // 해당 aniId 상세 내용 가져오기
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    data: animeDetail,
  } = useQuery({
    queryKey: ['animeDetail'],
    queryFn: () => {
      return getAnimeById(ani_id);
    },
    refetchOnWindowFocus: false,
  });
  // 해당 aniId 영상 가져오기
  const {
    isLoading: isVideoLoading,
    isError: isVideoError,
    data: animeVideo,
  } = useQuery({
    queryKey: ['animeVideo'],
    queryFn: () => {
      return getAnimePreview(ani_id);
    },
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isStarLoading,
    isError: isStarError,
    data: animeStar,
  } = useQuery({
    queryKey: ['animeStar'],
    queryFn: () => {
      return getAnimeStars(ani_id);
    },
  });

  console.log('star🌟🌟', animeStar);

  const likesQueryOptions = {
    queryKey: ['animeDetailLikes'],
    queryFn: () => fetchAnimeLikes(ani_id),
    refetchOnWindowFocus: false,
  };

  const { data: likesData } = useQuery(likesQueryOptions);

  const toggleLikeMutation = useMutation(toggleAnimeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['animeDetailLikes']);
    },
    onError: (error) => {
      alert(`toggleAnimeLike 오류가 발생했습니다. : ${error}`);
    },
  });

  const handleLike = () => {
    if (!user) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    const data = {
      user_id: user.id,
      anime_id: ani_id,
      isDetailPage: true,
    };
    toggleLikeMutation.mutate(data);
  };

  const isLike = () => {
    const likedAnime = likesData?.find(
      (like: ReadAnimeLikeG) =>
        like.anime_id === ani_id && like.user_id === user?.id,
    );
    return !!likedAnime;
  };

  //URL 복사 공유
  const isShare = () => {
    window.navigator.clipboard.writeText(currentUrl).then(() => {
      alert('복사 완료!');
    });
  };

  if (isDetailLoading || isVideoLoading) {
    return <h3>데이터를 가져오는 중입니다.</h3>;
  }
  if (isDetailError || isVideoError) {
    console.log('데이터를 가져올 수 없습니다.');
  }

  return (
    <>
      <S.DetailContainer>
        <S.ContentsContainer>
          <S.ContentsBox>
            <S.AniTextLayoutTop>
              <S.AniTextLayoutToptoTop>
                <S.AniDetailTagBox>
                  {animeDetail.tags.map((tag: string) => {
                    return <S.AniDetailTag key={tag}>#{tag}</S.AniDetailTag>;
                  })}
                </S.AniDetailTagBox>
                <S.AniLabel>{animeDetail.name}</S.AniLabel>
              </S.AniTextLayoutToptoTop>
              <S.ContentsOptions>
                <S.PreviewBox onClick={scrollToPreview}>
                  <img src={play_arrow} />
                  1화 맛보기
                </S.PreviewBox>
                <S.LikeShareBox>
                  <S.LikeBox>
                    {isLike() ? (
                      <img src={detaillike} alt="like" onClick={handleLike} />
                    ) : (
                      <img src={unfilled} alt="like" onClick={handleLike} />
                    )}
                    <p>찜</p>
                  </S.LikeBox>
                  <S.ShareBox>
                    <img src={share} alt="share" onClick={isShare}></img>
                    <p>공유하기</p>
                  </S.ShareBox>
                </S.LikeShareBox>
              </S.ContentsOptions>
            </S.AniTextLayoutTop>
            <S.ContentsText>
              <S.ContentsTextUp>
                <S.ContentsGenrePro>
                  <S.ContentsEtc>제작 </S.ContentsEtc>
                  {animeDetail.production
                    ? animeDetail.production
                    : '제작사 정보가 없습니다.'}
                </S.ContentsGenrePro>
                <S.ContentsGenrePro>
                  <S.ContentsEtc>장르</S.ContentsEtc> {animeDetail.genres}
                </S.ContentsGenrePro>
              </S.ContentsTextUp>
              <S.ContentsEx>
                {animeDetail.content
                  ? animeDetail.content
                  : '애니메이션 설명 정보가 없습니다.'}
              </S.ContentsEx>
            </S.ContentsText>
            <S.StarBox>
              <S.ContentsStarTitleBox>
                <S.ContentsStarLabel>별점</S.ContentsStarLabel>
                <S.ContentsStarCount>
                  (
                  {animeStar?.count_score
                    ? animeStar?.count_score.toLocaleString()
                    : '별점 정보가 없습니다.'}
                  개의 별점)
                </S.ContentsStarCount>
              </S.ContentsStarTitleBox>
              <S.TotlaStarBox>
                <S.StarNumBox>
                  {animeStar?.average_score && (
                    <>
                      <p>{animeStar?.average_score}</p>
                      <StarRating
                        rating={animeStar?.average_score}
                        maxRating={5}
                      />
                    </>
                  )}
                </S.StarNumBox>
              </S.TotlaStarBox>
            </S.StarBox>
          </S.ContentsBox>
        </S.ContentsContainer>
        <S.ContentsImg>
          {animeDetail?.images[0].img_url ? (
            <img src={animeDetail?.images[0].img_url} alt="포스터" />
          ) : (
            <img src={animeDetail.img} alt="포스터" />
          )}
        </S.ContentsImg>
      </S.DetailContainer>
      <div>
        <S.DetailLabel ref={previewRef}>1화 맛보기</S.DetailLabel>
        <S.ContentVideoLayout>
          {animeVideo.public_streaming_info &&
          animeVideo.public_streaming_info.hls_preview_url ? (
            <VideoPlayer
              src={animeVideo.public_streaming_info.hls_preview_url}
              type="m3u8"
            />
          ) : (
            <S.NonPreview>맛보기 영상이 없습니다😭</S.NonPreview>
          )}
        </S.ContentVideoLayout>
      </div>
      <S.DetailLabel>리뷰</S.DetailLabel>
      <AnimeDetailComments />
    </>
  );
}

export default AnimeDetail;
