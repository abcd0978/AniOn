import styled from 'styled-components';

type Props = {
  $isMobileFilterOpen: boolean;
};

export const S = {
  AnimeListSection: styled.section<Props>`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  `,

  PageNameDiv: styled.div`
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
      grid-template-columns: repeat(6, 15.3%); /* 6개의 컬럼으로 변경 */
    }

    @media (max-width: 1910px) {
      grid-template-columns: repeat(5, 18.4%); /* 5개의 컬럼으로 변경 */
    }

    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(4, 23.5%); /* 4개의 컬럼으로 변경 */
    }

    @media (max-width: 1280px) {
      /* 화면 크기가 1280px 이하인 경우 */
      grid-template-columns: repeat(3, 31.7%); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 768px) {
      /* 화면 크기가 768px 이하인 경우 */
      grid-template-columns: repeat(2, 49.6%); /* 2개의 컬럼으로 변경 */
      gap: 6px;
      row-gap: 24px;
    }
  `,

  Target: styled.div`
    height: 100px;
    position: relative;
    transform: translateY(-100%);
  `,
};
