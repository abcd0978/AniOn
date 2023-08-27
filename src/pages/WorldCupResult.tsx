import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { S } from '../components/worldcup/worldCup.style';
import { useQuery } from '@tanstack/react-query';
import { countNumOfWin, fetchWinnerResult } from '../api/aniCharacters';

const WorldCupResult = () => {
  const navigate = useNavigate();
  const { gender } = useParams() as { gender: string };
  const { state: winner } = useLocation();

  const {
    isLoading: isWinnerLoading,
    isError: isWinnerError,
    data: winnerCount,
  } = useQuery({
    queryKey: ['winner'],
    queryFn: () => {
      return fetchWinnerResult(winner.id);
    },
  });

  useEffect(() => {
    if (!isWinnerLoading && !isWinnerError) {
      countNumOfWin(winner.id);
    }
  }, [isWinnerLoading, isWinnerError, winner.id]);

  // console.log('😑😐', winnerCount[0]?.num_of_win);
  // console.log('?????????', winner);
  return (
    <S.WorldCupContainer>
      <S.WorldCupMainTitle>
        {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵
        결과
      </S.WorldCupMainTitle>
      <S.WorldCupWinnerCard>
        <S.WorldCupTest key={winner.id}>
          <S.WorldCupUp>
            <S.WorldCupWinnerImg>
              <img src={winner.img_url} />
            </S.WorldCupWinnerImg>
            <S.WorldCupResultText>
              <S.WorldCupTitle>{winner.ani_title}</S.WorldCupTitle>
              <S.WorldCupName>{winner.character_name}</S.WorldCupName>
            </S.WorldCupResultText>
          </S.WorldCupUp>
        </S.WorldCupTest>
      </S.WorldCupWinnerCard>
      <S.WorldCupResultButtonBox>
        <S.WorldCupResultButton
          background="#EFEFEF"
          onClick={() => {
            navigate('/worldcup');
          }}
        >
          다시하기
        </S.WorldCupResultButton>
        <S.WorldCupResultButton background="">
          결과 공유 하기
        </S.WorldCupResultButton>
      </S.WorldCupResultButtonBox>
    </S.WorldCupContainer>
  );
};

export default WorldCupResult;
