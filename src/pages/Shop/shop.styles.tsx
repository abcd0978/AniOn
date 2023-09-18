import styled from 'styled-components';

export const Outer = styled.div`
  width: 100%;
  margin-top: 30px;
`;
export const Top = styled.div`
  width: 100%;
  height: 85px;
  margin-bottom: 30px;
`;
export const Title = styled.div`
  color: #8200ff;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonBox = styled.div`
  border: none;
  background-color: transparent;
`;
export const Button = styled.button`
  border: none;
  width: 100px;
  height: 36px;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 3px;
  font-size: 13px;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
`;

export const Point = styled.div`
  width: 10%;
  height: 35px;
  border-radius: 10px;
  background-color: #f3e7ff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 768px) {
    width: 25%;
  }
`;
export const Bottom = styled.div`
  width: 100%;
  height: 100%;
`;

export const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  row-gap: 60px;
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
    gap: 8px;
    row-gap: 24px;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImgArea = styled.div`
  box-shadow: 0px 0px 20px 0px #0000001a;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const TopArea = styled.img`
  width: 85%;
  height: 85%;
  object-fit: contain;
  border-radius: 20px;
`;

export const BottomArea = styled.div`
  height: 10%;
  width: 100%;
  background-color: white;
  line-height: 25px;
`;

export const BuyButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: -30px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #c88fff;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: #c88fff;
    color: white;
  }

  &:disabled:hover {
    background-color: white;
    color: #cccccc;
    cursor: not-allowed;
  }
`;
export const Number = styled.div`
  font-weight: 700;
  margin-right: auto;
`;
