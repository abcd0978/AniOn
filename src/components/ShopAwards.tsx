// import { MyProfilePoint } from './MyPage.styles';

import { styled } from 'styled-components';

const ShopAwards = () => {
  return (
    <div>
      <Container>
        <AwardName>칭호명</AwardName>
        <ShopMenu>
          <AwardPrice>포인트</AwardPrice>
          <BuyButton>구매하기</BuyButton>
        </ShopMenu>
      </Container>
    </div>
  );
};

export default ShopAwards;
const Container = styled.div`
  width: 350px;
  margin-top: 40px;
`;
const AwardName = styled.div`
  background-color: #efefef;
  padding: 8px;
  border-radius: 999px;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
  display: flex;
  height: 64px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;
const AwardPrice = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
  margin-top: 20px;
  width: 100px;
  height: 32px;
`;
const BuyButton = styled.button`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  background-color: white;
  width: 100px;
  height: 32px;
  font-size: 13px;
`;
const ShopMenu = styled.div`
  display: flex;
  width: auto;
  height: 32px;
  padding: 0px 8px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
