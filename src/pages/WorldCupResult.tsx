import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { S } from '../components/worldcup/worldCup.style';
import { R } from '../components/worldcup/worldCupResult.style';
import { useQuery } from '@tanstack/react-query';
import { winnerResult } from '../api/aniCharacters';
import navigate_next from '../assets/navigate_next.svg';
import { useScript } from '../hooks/useScript';

export type ResultCharacterType = {
  ani_title: string;
  character_name: string;
  id: string;
  img_url: string;
  worldcup: [
    {
      num_of_win: number;
    },
  ];
};

declare global {
  interface Window {
    Kakao?: any; // 이 부분을 Kakao 객체의 실제 타입으로 바꿔주세요
  }
}

const WorldCupResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //현재 URL 가져오기
  const currentUrl = window.location.href;
  const { gender } = useParams() as { gender: string };
  const { state: winner } = useLocation();

  const [topRank, setTopRank] = useState<ResultCharacterType[]>();
  const [otherRank, setOtherRank] = useState<ResultCharacterType[]>();
  const [total, setTotal] = useState<number>(0);

  //TODO:카카오톡 공유하기 시도중...
  // kakao SDK import하기
  const status = useScript('https://developers.kakao.com/sdk/js/kakao.js');

  useEffect(() => {
    if (status === 'ready' && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init(`${process.env.REACT_APP_KAKAO_API_KEY}`);
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
      templateId: 98008,
    });
  };

  // 월드컵 전체 결과 가져오기
  const {
    isLoading: isResultLoading,
    isError: isResultError,
    data: totalResult,
  } = useQuery({
    queryKey: ['worldcupResult'],
    queryFn: () => winnerResult(gender),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!totalResult) {
      return;
    }
    if (Array.isArray(totalResult[0])) {
      //요소의 값 / total * 100
      setTotal(totalResult[1] as number);
      const topRanks = totalResult[0]!.slice(0, 3);
      const otherRanks = totalResult[0]!.slice(3, 10);
      setTopRank(topRanks);
      setOtherRank(otherRanks);
    }
  }, [totalResult]);

  if (isResultLoading) {
    return <div>데이터를 가져오는 중입니다..!</div>;
  }

  if (isResultError) {
    return <div>데이터를 가져오지 못했습니다..😥</div>;
  }
  return (
    <S.WorldCupContainer>
      <div>
        <S.WorldCupMainTitle>
          {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵
          결과
        </S.WorldCupMainTitle>
        <R.WorldCupWinnerCard>
          <S.WorldCupResultTest key={winner.id} height={666}>
            <S.WorldCupUp>
              <R.WorldCupWinnerImg>
                <img src={winner.img_url} />
              </R.WorldCupWinnerImg>
              <R.WorldCupResultText>
                <S.WorldCupTitle>{winner.ani_title}</S.WorldCupTitle>
                <S.WorldCupName>{winner.character_name}</S.WorldCupName>
              </R.WorldCupResultText>
            </S.WorldCupUp>
          </S.WorldCupResultTest>
        </R.WorldCupWinnerCard>
        <R.WorldCupResultButtonBox>
          <R.WorldCupResultButton
            background="#EFEFEF"
            onClick={() => {
              navigate('/worldcup');
            }}
          >
            다시하기
          </R.WorldCupResultButton>
          <R.WorldCupResultButton
            onClick={handleKakaoButton}
            background="#8200FF"
            color="#FFFFFF"
          >
            <img src={navigate_next} />
            결과 공유 하기
          </R.WorldCupResultButton>
        </R.WorldCupResultButtonBox>
        {/* -------------------------------- 결과*/}
      </div>
      <R.ResultBox>
        <R.ResultCardBox>
          <R.ResultRankTitle>순위</R.ResultRankTitle>
          {/* 카드1위부터 3위 */}
          <R.ResultRankTop>
            {topRank?.map((character: ResultCharacterType, index: number) => {
              return (
                <R.ResultTopCard key={character.id}>
                  <R.TopImgRankBox>
                    <R.ResultRankNum>{index + 1}</R.ResultRankNum>
                    <R.ResultTopCardImg
                      src={character.img_url}
                    ></R.ResultTopCardImg>
                  </R.TopImgRankBox>
                  <R.ResultTopTextBox>
                    <R.ResultAniText>
                      <R.ResultTopTextAni>
                        {character.ani_title}
                      </R.ResultTopTextAni>
                      <R.ResultTopTextCha>
                        {character.character_name}
                      </R.ResultTopTextCha>
                    </R.ResultAniText>
                    <div>
                      {Math.round(
                        (character.worldcup[0].num_of_win / total) * 100,
                      )}
                      %
                    </div>
                  </R.ResultTopTextBox>
                </R.ResultTopCard>
              );
            })}
          </R.ResultRankTop>
        </R.ResultCardBox>
        {/* 이외 등수 */}
        <R.OtherRankContainer>
          {otherRank?.map((character: ResultCharacterType) => {
            return (
              <R.OtherRankBox key={character.id}>
                <R.otherRankImg src={character.img_url}></R.otherRankImg>
                <R.otherRankTextBox>
                  <R.otherRankText>
                    <R.otherRankName>
                      {character.character_name}
                    </R.otherRankName>
                    <R.otherRankAni>{character.ani_title}</R.otherRankAni>
                  </R.otherRankText>
                  <div>
                    {Math.round(
                      (character.worldcup[0].num_of_win / total) * 100,
                    )}
                    %
                  </div>
                </R.otherRankTextBox>
              </R.OtherRankBox>
            );
          })}
        </R.OtherRankContainer>
      </R.ResultBox>
    </S.WorldCupContainer>
  );
};

export default WorldCupResult;
