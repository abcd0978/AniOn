import styled from 'styled-components';

export const S = {
  PageNameDiv: styled.div`
    margin-top: 30px;
  `,

  PageNameSpan: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 400;
  `,
  PageNameBold: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  `,

  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 24px;
    row-gap: 40px;

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

    @media (max-width: 480px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(1, 1fr); /* 2개의 컬럼으로 변경 */
    }
  `,

  Target: styled.div`
    height: 1px;
    position: relative;
    transform: translateY(-100%);
  `,
};
