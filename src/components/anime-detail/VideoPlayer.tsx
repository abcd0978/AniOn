import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { styled } from "styled-components";

interface VideoPlayerType {
  src: string;
  type: string;
}

function VideoPlayer({ src, type }: VideoPlayerType) {
  const videoRef = useRef<any>();

  useEffect(() => {
    if (type === "m3u8" && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current!);
    }
  }, [src, type]);

  return type === "m3u8" ? (
    <ContentVideo ref={videoRef} controls />
  ) : (
    <video ref={videoRef} src={src} controls />
  );
}

export default VideoPlayer;

const ContentVideo = styled.video`
  width: 1139.4px;
  // height: 542.36px;
  margin-top: 20px;

  //   @media screen and (max-width: 600px) {
  //   flex-direction: column;
  //   align-items: flex-end;
  // }
`;
