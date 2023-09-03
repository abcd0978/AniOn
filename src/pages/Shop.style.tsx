import styled from 'styled-components';

export const Outer = styled.div`
  width: 1430px;
  height: 999px;
  margin-top: 30px;
`;
export const Top = styled.div`
  width: 1430px;
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
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
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
  width: 132px;
  height: 35px;
  border-radius: 10px;
  background-color: #f3e7ff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const Bottom = styled.div`
  width: 1430px;
  height: 100%;
`;

export const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const Item = styled.div`
  width: 268px;
  height: 300px;
  margin-bottom: 5px;
`;

export const TopArea = styled.div<{ img_url: string }>`
  width: 100%;
  height: 80%;
  background-size: cover;
  background-image: url(${(props) => props.img_url});
`;

export const BottomArea = styled.div`
  width: 100%;
  height: 20%;
  background-color: white;
  margin-top: 5px;
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
