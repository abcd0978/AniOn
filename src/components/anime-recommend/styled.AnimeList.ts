import styled from 'styled-components';

export const S = {
  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    row-gap: 15px;

    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(5, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1280px) {
      /* 화면 크기가 1280px 이하인 경우 */
      grid-template-columns: repeat(4, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1024px) {
      /* 화면 크기가 1024px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 800px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 변경 */
    }
  `,

  // 이 아래로 카드
  CardDiv: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 220px;
    height: 400px;
  `,

  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 220px;
    height: 347px;
  `,

  CardThumbnail: styled.img`
    width: 220px;
    height: 320px;
    border-radius: 10px;
  `,

  CardTitle: styled.div`
    width: 220px;
    height: 19px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  `,

  CardGenres: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 152px;
    height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
  `,

  Genre: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2px;
    width: 72px;
    height: 24px;
    background: #efefef;
    border-radius: 999px;
    flex: none;
    order: 0;
    flex-grow: 0;
  `,

  GenreText: styled.div`
    width: 56px;
    height: 16px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.015em;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  `,

  Target: styled.div`
    height: 1px;
  `,
};
