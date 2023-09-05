import { styled } from 'styled-components';
import { LikedInfo } from './LikedAnime';
export const Liked = {
  CardInfo: styled.div``,
  Title: styled.div`
    width: 220px;
    height: 19px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

export const HoverLiked = {
  Info: styled.div`
    display: none;
    position: absolute;
    top: 0px;
    z-index: 20;
    line-height: 25px;
    color: #ffffff;
    height: 90%;
    width: 86%;
    padding: 16px;
  `,
  TitleAndDetail: styled.div``,
  Title: styled.div`
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
  Detail: styled.div``,
  Like: styled.img``,
};
