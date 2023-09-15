import styled from 'styled-components';

export const S = {
  NotFoundContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 70vh;
  `,
  NotFoundImg: styled.img`
    width: 35%;
    min-width: 540px;
    @media (max-width: 768px) {
      width: 70%;
      min-width: 0px;
    }
  `,
  NotFoundContents: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,
  NotFoundTitle: styled.p`
    color: #8200ff;
    font-size: 32px;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,
  NotFoundBodys: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  `,
  NotFoundBody: styled.p`
    font-size: 20px;
    font-weight: 400;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  NotFoundButtons: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    @media (max-width: 768px) {
      gap: 20px;
    }
  `,
  NotFoundButton: styled.button`
    width: 136px;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #8200ff;
    border-radius: 999px;
    min-height: 40px;
    padding: 12px;
    font-size: 20px;
    font-weight: 400;
    @media (max-width: 768px) {
      width: 96px;
      font-size: 12px;
    }
  `,
};
