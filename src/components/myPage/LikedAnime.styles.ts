import { styled } from 'styled-components';
import { LikedInfo } from './LikedAnime';
export const Anime = {
  Poster: styled.img`
    width: 220px;
    height: 320px;
    border-radius: 10px;
    flex-direction: column;
    gap: 12px;
    margin: 10px;
    margin-top: 10px;
  `,
  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    margin-left: 150px;
  `,

  AnimeTitle: styled.div`
    width: 100%;
    height: 100px;
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
};
