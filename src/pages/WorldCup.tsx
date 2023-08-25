import React from 'react';
import { S } from '../components/worldcup/worldCup.style';
import { useNavigate } from 'react-router';

type Props = {};

function WorldCup({}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <S.WorldCupContainer>
        <S.WorldCupMainTitle>이상형 월드컵</S.WorldCupMainTitle>
        <S.WorldCupTestContainer>
          <S.WorldCupTest>
            <S.WorldCupUp>
              <div>
                <S.WorldCupGender>남자 캐릭터</S.WorldCupGender>
                <S.WorldCupTitle>애니메이션 캐릭터</S.WorldCupTitle>
                <S.WorldCupTitle>이상형 월드컵</S.WorldCupTitle>
              </div>
              <S.WorldCupImg></S.WorldCupImg>
            </S.WorldCupUp>
            <S.WorldCupTestButton
              onClick={() => {
                navigate('/worldcup/0');
              }}
            >
              테스트하러 가기 ▶
            </S.WorldCupTestButton>
          </S.WorldCupTest>
          <S.WorldCupTest>
            <S.WorldCupUp>
              <div>
                <S.WorldCupGender>여자 캐릭터</S.WorldCupGender>
                <S.WorldCupTitle>애니메이션 캐릭터</S.WorldCupTitle>
                <S.WorldCupTitle>이상형 월드컵</S.WorldCupTitle>
              </div>
              <S.WorldCupImg></S.WorldCupImg>
            </S.WorldCupUp>
            <S.WorldCupTestButton
              onClick={() => {
                navigate('/worldcup/1');
              }}
            >
              테스트하러 가기 ▶
            </S.WorldCupTestButton>
          </S.WorldCupTest>
        </S.WorldCupTestContainer>
      </S.WorldCupContainer>
    </>
  );
}

export default WorldCup;
