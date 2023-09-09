import { styled } from 'styled-components';

export const S = {
  // 전체 container
  FilterContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px 0px 24px 0px;
  `,

  FilterOptions: styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  FilterBottomContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 0px 20px 0px;
    @media (max-width: 768px) {
      margin: 20px 0px;
    }
  `,
  CountText: styled.p`
    font-weight: 600;
    font-size: 18px;
    @media (max-width: 768px) {
      font-size: 14px;
      font-weight: 400;
    }
  `,
  MobileFilterButton: styled.div`
    display: flex;
    font-size: 14px;
  `,
  MobileFilterImg: styled.img``,
};
