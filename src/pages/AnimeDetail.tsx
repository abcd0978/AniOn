import { useQuery } from '@tanstack/react-query';
import { getAnimeById, getAnimePreview } from '../api/laftel';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/anime-detail/VideoPlayer';
import { S } from '../components/anime-detail/anime-detail.style';
import AnimeDetailComments from '../components/anime-detail/AnimeDetailComments';

type Props = {};

function AnimeDetail({}: Props) {
  //parameter 가져오기
  const { ani_id } = useParams() as { ani_id: string };

  // 해당 aniId 상세 내용 가져오기
  // "41558" 좀비100 임의 아이디 값
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    data: animeDetail,
  } = useQuery({
    queryKey: ['animeDetail'],
    queryFn: () => {
      return getAnimeById(ani_id);
    },
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
  });

  // console.log("<<<<<>>>>", animeDetail);

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
          <div>
            <S.AniDetailTagBox>
              {animeDetail.tags.map((tag: string) => {
                return <S.AniDetailTag key={tag}>#{tag}</S.AniDetailTag>;
              })}
            </S.AniDetailTagBox>
            <S.ContentsText>
              <S.AniLabel>{animeDetail.name}</S.AniLabel>
              <S.PreviewBox>▶ 1화 맛보기</S.PreviewBox>
              <S.ContentsText>장르: {animeDetail.genres}</S.ContentsText>
              <S.ContentsText>{animeDetail.content}</S.ContentsText>
            </S.ContentsText>
            <S.StarBox>
              <S.ContentsStar>평점:</S.ContentsStar> {animeDetail.avg_rating}/5
            </S.StarBox>
          </div>
          <div>
            <S.ContentsImg>
              {animeDetail?.images[0].img_url ? (
                <img src={animeDetail?.images[0].img_url} />
              ) : (
                <img src={animeDetail.img} />
              )}
            </S.ContentsImg>
          </div>
        </S.ContentsContainer>
        <S.DetailLabel>1화 맛보기</S.DetailLabel>
        <S.ContentVideoLayout>
          <VideoPlayer
            src={animeVideo.public_streaming_info.hls_preview_url}
            type="m3u8"
          />
        </S.ContentVideoLayout>
      </S.DetailContainer>
      <S.DetailLabel>리뷰</S.DetailLabel>
      <AnimeDetailComments />
    </>
  );
}

export default AnimeDetail;
