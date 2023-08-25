import { styled } from 'styled-components';

export const S = {
  // 전체 container
  FilterContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px 24px 0px;
  `,

  FilterOptions: styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 870px) {
      flex-direction: column;
    }
  `,

  CountDiv: styled.div`
    margin: 40px 0px 20px 0px;
    font-weight: 600;
  `,
};
