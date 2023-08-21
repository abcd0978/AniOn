import { useQuery } from "@tanstack/react-query";
import { getAnimeById, getAnimePreview } from "../api/laftel";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/anime-detail/VideoPlayer";

type Props = {};

function AnimeDetail({}: Props) {
  //parameter 가져오기
  const { aniId } = useParams() as { aniId: string };

  // 해당 aniId 상세 내용 가져오기
  // "41496" 주술회전 임의 아이디 값
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    data: animeDetail,
  } = useQuery({
    queryKey: ["animeDetail"],
    queryFn: () => {
      return getAnimeById("41496");
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
      return getAnimePreview("41496");
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
    <div>
      <div>
        <div>
          <div>
            {animeDetail.name}
            <p>{animeDetail.content}</p>
            <p>{animeDetail.genres}</p>
          </div>
          <div>{animeDetail.avg_rating}/5</div>
        </div>
        <div>
          <div>
            <img src={animeDetail.img} />
          </div>
        </div>
      </div>
      <div>
        <VideoPlayer
          src={animeVideo.public_streaming_info.hls_preview_url}
          type="m3u8"
        />
      </div>
    </div>
  );
}

export default AnimeDetail;
