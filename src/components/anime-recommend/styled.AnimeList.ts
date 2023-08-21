import styled from 'styled-components';

export const S = {
  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    @media (max-width: 1024px) {
      /* 화면 크기가 768px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 500px) {
      /* 화면 크기가 480px 이하인 경우 */
      grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 변경 */
    }
  `,
  CardDiv: styled.div`
    border: 1px solid black;
  `,
};
