import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { S } from '../components/worldcup/worldCup.style';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  updateNumOfWin,
  fetchWinnerResult,
  winnerResult,
} from '../api/aniCharacters';

const WorldCupResult = () => {
  const navigate = useNavigate();
  const { gender } = useParams() as { gender: string };
  const { state: winner } = useLocation();
  const queryClient = useQueryClient();

  // 이게 필요한가...?...
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

  // 월드컵 전체 결과 가져오기
  const {
    isLoading: isResultLoading,
    isError: isResultError,
    data: totalResult,
  } = useQuery({
    queryKey: ['worldcupResult'],
    queryFn: () => {
      return winnerResult(gender, winner.id);
    },
    // onSuccess: () => {
    //   console.log('Result!!!!!');
    // },
  });

  if (isWinnerLoading || isResultLoading) {
    return <div>데이터를 가져오는 중입니다..!</div>;
  }

  if (isResultError || isWinnerError) {
    return <div>데이터를 가져오지 못했습니다..😥</div>;
  }

  console.log('🙉🙉', totalResult);
  // console.log('😑😐', winnerCount[0]);
  // console.log('?????????', winner);
  return (
    <S.WorldCupContainer>
      <S.WorldCupMainTitle>
        {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵
        결과
      </S.WorldCupMainTitle>
      <div>
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
        {/* -------------------------------- 결과*/}
        <div>
          <div>
            <div>순위</div>
            <div>카드</div>
          </div>
          <div></div>
        </div>
      </div>
    </S.WorldCupContainer>
  );
};

export default WorldCupResult;
