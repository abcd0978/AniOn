import { styled } from 'styled-components';
export const Anime = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    position: relative;
    top: -290px;
    margin-left: 150px;
  `,
  OnePoster: styled.div`
    margin-bottom: -10px;
  `,
  Poster: styled.img`
    width: 220px;
    height: 320px;
    border-radius: 10px;
    flex-direction: column;
    gap: 12px;
    margin-top: 0px;
  `,
  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    margin-left: 150px;
  `,
  PosterContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    row-gap: 40px;
    margin-left: 0px;
    margin-top: 10px;
    margin-bottom: 0px;

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
