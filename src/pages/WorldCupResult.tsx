import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { S } from '../components/worldcup/worldCup.style';

type Props = {};

const WorldCupResult = () => {
  const { gender } = useParams() as { gender: string };
  const navigate = useNavigate();

  const { state: winner } = useLocation();

  console.log('?????????', winner);
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
        <button
          onClick={() => {
            navigate('/worldcup');
          }}
        >
          다시하기
        </button>
        <button>결과 공유 하기</button>
      </S.WorldCupResultButtonBox>
    </S.WorldCupContainer>
  );
};

export default WorldCupResult;
