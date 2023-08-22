import { useQuery } from "@tanstack/react-query";
import { getAnimeById, getAnimePreview } from "../api/laftel";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/anime-detail/VideoPlayer";
import { S } from "../components/anime-detail/anime-detail.style";

type Props = {};

function AnimeDetail({}: Props) {
  //parameter 가져오기
  const { aniId } = useParams() as { aniId: string };

  // 해당 aniId 상세 내용 가져오기
  // "41558" 좀비100 임의 아이디 값
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    data: animeDetail,
  } = useQuery({
    queryKey: ["animeDetail"],
    queryFn: () => {
      return getAnimeById("41558");
    },
  });
  // 해당 aniId 영상 가져오기
  const {
    isLoading: isVideoLoading,
    isError: isVideoError,
    data: animeVideo,
  } = useQuery({
    queryKey: ["animeVideo"],
    queryFn: () => {
      return getAnimePreview("41558");
    },
  });

  if (isDetailLoading || isVideoLoading) {
    return <h3>데이터를 가져오는 중입니다.</h3>;
  }
  if (isDetailError || isVideoError) {
    console.log("데이터를 가져올 수 없습니다.");
  }

  console.log(
    "data💫💫",
    animeDetail,
    animeVideo.public_streaming_info.hls_preview_url
  );

  return (
    <S.DetailContainer>
      <S.ContentsContainer>
        <div>
          <S.ContentsImg>
            <img src={animeDetail.img} />
          </S.ContentsImg>
        </div>
        <div>
          <S.ContentsText>
            <p>{animeDetail.name}</p>
            <S.ContentsText>{animeDetail.content}</S.ContentsText>
            <S.ContentsText>{animeDetail.genres}</S.ContentsText>
          </S.ContentsText>
          <S.ContentsText>평점: {animeDetail.avg_rating}/5</S.ContentsText>
        </div>
      </S.ContentsContainer>
      <div>
        <VideoPlayer
          src={animeVideo.public_streaming_info.hls_preview_url}
          type="m3u8"
        />
      </div>
    </S.DetailContainer>
  );
}

export default AnimeDetail;
