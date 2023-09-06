import styled from 'styled-components';

export const S = {
  PageNameDiv: styled.div`
    /* width: 100%; */
    margin-top: 30px;
    letter-spacing: -2px;
  `,

  PageNameFisrt: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 400;
  `,
  PageNameSecond: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  `,

  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 24px;
    row-gap: 40px;

    @media (max-width: 2160px) {
      grid-template-columns: repeat(6, 1fr); /* 6개의 컬럼으로 변경 */
    }

    @media (max-width: 1910px) {
      grid-template-columns: repeat(5, 1fr); /* 5개의 컬럼으로 변경 */
    }

    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(4, 1fr); /* 4개의 컬럼으로 변경 */
    }

    @media (max-width: 1280px) {
      /* 화면 크기가 1280px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1024px) {
      /* 화면 크기가 1024px 이하인 경우 */
      grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 변경 */
    }

    @media (max-width: 540px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(1, 1fr); /* 1개의 컬럼으로 변경 */
    }
  `,

  Target: styled.div`
    height: 1px;
    position: relative;
    transform: translateY(-100%);
  `,
};
