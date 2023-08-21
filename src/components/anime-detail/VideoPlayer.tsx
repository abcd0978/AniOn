import { useEffect, useRef } from "react";
import Hls from "hls.js";

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
    <video ref={videoRef} controls />
  ) : (
    <video ref={videoRef} src={src} controls />
  );
}

export default VideoPlayer;
